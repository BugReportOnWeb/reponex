import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import MessageForm from "../components/MessageForm";
import { MessageData } from "../types/message";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import socket from "../socket/socket";

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messageDataLogs, setMessageDataLogs] = useState<MessageData[]>([]);
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
                <div className='overflow-y-auto h-[calc(100vh-14rem)] pt-5 px-5'>
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
            )}
        </>
    )
}

export default Chat;
