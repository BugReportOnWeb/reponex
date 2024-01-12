import { Dispatch, SetStateAction } from "react";

type MessageData = {
    username: string;
    message: string;
}

type MessageLogsContextType = {
    messageDataLogs: MessageData[];
    setMessageDataLogs: Dispatch<SetStateAction<MessageData[]>>;
}

export type { MessageData, MessageLogsContextType };
