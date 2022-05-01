import {RESET_COLOR, SERVER_COLOR} from "../../../config";

export default function listenToServerEvents() {
    for (const eventName in this.serverEvents) {
        const event = this.serverEvents[eventName]
        global.server.on(eventName, event.run.bind(event))
    }
    console.info(SERVER_COLOR + "[INFO] Now listening for server events" + RESET_COLOR)
}