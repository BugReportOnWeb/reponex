import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import MessageBubble from "../components/chat/MessageBubble";
import MessageForm from "../components/chat/MessageForm";
import { MessageData, MessageLogsContextType } from "../types/message";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/auth";
import socket from "../socket/socket";
import { MessageLogsContext } from "../context/MessageLogsContext";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

const Chat = () => {
    const [message, setMessage] = useState('');
    const { messageDataLogs, setMessageDataLogs } = useContext(MessageLogsContext) as MessageLogsContextType;
    const messageLogsRef = useRef<HTMLDivElement | null>(null);
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
    const [isConnected, setIsConnected] = useState(socket.connected);

    const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const messageData: MessageData = {
            username: authUser,
            message
        }

        socket.emit('message', messageData)
        setMessage('');
    }

    useEffect(() => {
        messageLogsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }, [messageDataLogs])

    // CHECK: All this socket shit should be on a root route for all auth pages
    // Having it only on <Chat />, any global broadcast if made when user is not
    // here, isn't reflected in it's local database i.e `messageDataLogs`
    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        }

        const onDisconnect = () => {
            setIsConnected(false);
        }

        const onMessage = (messageData: MessageData) => {
            setMessageDataLogs(prevLogs => {
                return prevLogs
                    ? [...prevLogs, messageData]
                    : [messageData]
            })
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
        }
    })

    return (
        <>
            {isConnected && (
                <div className='p-5'>
                    <h1 className='font-bold text-4xl mb-3 flex gap-2 items-end'>
                        Global Chat
                        <span className='text-sm ml-1 font-light flex items-center gap-1'>
                            <CgDanger />
                            <p>
                                Make sure to read the{' '}
                                <Link to='/rules' className='underline decoration-white/40 underline-offset-4 hover:decoration-white/80'>rules</Link>
                            </p>
                        </span>
                    </h1>
                    <div className='overflow-y-auto h-[calc(100vh-18rem)] pt-5 px-5'>
                        <div className='flex flex-col gap-3' ref={messageLogsRef}>
                            {messageDataLogs.map((messageData, index) => (
                                <MessageBubble
                                    key={index}
                                    messageData={messageData}
                                    messageDataLogs={messageDataLogs}
                                    username={authUser}
                                />
                            ))}
                        </div>
                        <MessageForm
                            message={message}
                            setMessage={setMessage}
                            handleMessageSubmit={handleMessageSubmit}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Chat;
