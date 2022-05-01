import {DISCORD_COLOR, RESET_COLOR} from "../../../config";

export default function listenToDiscordEvents() {
    for (const eventName in this.discordEvents) {
        const event = this.discordEvents[eventName]
        global.client.on(eventName, event.run.bind(event))
    }
    console.info(DISCORD_COLOR + "[INFO] Now listening for Discord events" + RESET_COLOR)
}