import { io } from "socket.io-client";

const SERVER_ORIGIN = import.meta.env.VITE_SERVER;

const socket = io(SERVER_ORIGIN, {
    autoConnect: false
});

export default socket;
