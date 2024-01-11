import { FormEvent, useEffect, useRef, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import MessageForm from "../components/MessageForm";
import { MessageData } from "../types/message";

// type MessageBubbleProps = {
//     messageData: MessageData;
//     messageDataLogs: MessageData[];
//     username: string;
// }


const Chat = () => {
    // This username will come from 'autUser' context;
    const username = 'Dev';
    const [message, setMessage] = useState('');
    const [messageDataLogs, setMessageDataLogs] = useState<MessageData[]>([]);
    const messageLogsRef = useRef<HTMLDivElement | null>(null);

    const handleMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const messageData: MessageData = {
            type: 'message-bubble',
            username,
            message
        }

        setMessageDataLogs(prevLogs => {
            return prevLogs
                ? [...prevLogs, messageData]
                : [messageData]
        })

        setMessage('');
    }

    useEffect(() => {
        messageLogsRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }, [messageDataLogs])

    return (
        <div className='overflow-y-auto h-[calc(100vh-14rem)] pt-5 px-5'>
            <div className='flex flex-col gap-3' ref={messageLogsRef}>
                {messageDataLogs.map((messageData, index) => (
                    <MessageBubble
                        key={index}
                        messageData={messageData}
                        messageDataLogs={messageDataLogs}
                        username={username}
                    />
                ))}
            </div>
            <MessageForm
                message={message}
                setMessage={setMessage}
                handleMessageSubmit={handleMessageSubmit}
            />
        </div>
    )
}

export default Chat;
