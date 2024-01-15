import { MessageData } from "../../types/message";

type MessageBubbleProps = {
    messageData: MessageData;
    messageDataLogs: MessageData[];
    username: string;
}

const MessageBubble = ({ messageData, messageDataLogs, username }: MessageBubbleProps) => {
    const isUser = messageData.username === username;
    const currentMessageIndex = messageDataLogs.indexOf(messageData);

    let showUsername: boolean;

    if (currentMessageIndex === 0) {
        isUser ? showUsername = false : showUsername = true;
    } else {
        const previousMessage = messageDataLogs[currentMessageIndex - 1];
        showUsername = !isUser && !(messageData.username === previousMessage.username);
    }

    return (
        <div className={`relative px-3 py-2 rounded-3xl max-w-lg ${showUsername && 'mt-4'} ${isUser ? 'self-end bg-[#0084FF] ml-12' : 'bg-gray-800 mr-12'} w-fit text-sm`}>
            {showUsername && <h1 className='absolute text-[0.7rem] text-gray-500 bottom-[90%] left-[0.5rem] mb-1'>{messageData.username}</h1>}
            {messageData.message}
        </div>
    )
}

export default MessageBubble;
