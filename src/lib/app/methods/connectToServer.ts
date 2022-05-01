import socketIOClient from "socket.io-client";
import {RESET_COLOR, SERVER_COLOR} from "../../../config";

export default function connectToServer() {
    /* The password to auth to the server */
    const token = process.env.SERVER_KEY
    /* The server URL */
    const url = process.env.TOKEN_URL || 'http://localhost:3001'
    /* The server socket */
    global.server = socketIOClient(url, {query: {token}})
    /* When the client is disconnected */
    global.server.on('disconnect', () => {
        console.warn(SERVER_COLOR + "[WARN] Disconnected from the server" + RESET_COLOR)
    })
    /* When the client try to reconnect */
    global.server.on('reconnect_attempt', () => {
        console.info(SERVER_COLOR + "[INFO] Trying to reconnect to the server" + RESET_COLOR)
    })
    /* When the client is reconnected */
    global.server.on('reconnect', () => {
        console.info(SERVER_COLOR + "[INFO] Successfully reconnected to the server" + RESET_COLOR)
    })
    /* When the password isn't good */
    global.server.on('auth_fail', () => {
        console.error(SERVER_COLOR + "[ERRO] Failed to authenticate to the server" + RESET_COLOR)
    })
    /* When the bot is authed */
    global.server.on('auth_success', () => {
        console.info(SERVER_COLOR + "[INFO] Authed to the server" + RESET_COLOR)
    })
    /* Send a message */
    console.info(SERVER_COLOR + "[INFO] Connected to the server" + RESET_COLOR)
}