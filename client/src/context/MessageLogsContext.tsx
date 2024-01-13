import { ReactNode, createContext, useState } from "react";
import { MessageData, MessageLogsContextType } from "../types/message";

type MessageLogsContextProps = {
    children: ReactNode;
}

const MessageLogsContext = createContext<MessageLogsContextType | null>(null);

const MessageLogsContextProvider = ({ children }: MessageLogsContextProps) => {
    const [messageDataLogs, setMessageDataLogs] = useState<MessageData[]>([]);

    return (
        <MessageLogsContext.Provider value={{ messageDataLogs, setMessageDataLogs }}>
            {children}
        </MessageLogsContext.Provider>
    )
}

export { MessageLogsContextProvider, MessageLogsContext };
