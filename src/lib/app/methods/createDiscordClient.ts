import {DISCORD_COLOR, RESET_COLOR} from "../../../config";
import {Client, Intents} from "discord.js";

export default function createDiscordClient() {
    console.info(DISCORD_COLOR + "[INFO] Creating the client" + RESET_COLOR)
    /* Load the discord client */
    global.client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]})
    /* When the client is enabled */
    global.client.on('ready', () => {
        console.info(DISCORD_COLOR + `[INFO] Client ${global.client.user.tag} created` + RESET_COLOR)
    })
}