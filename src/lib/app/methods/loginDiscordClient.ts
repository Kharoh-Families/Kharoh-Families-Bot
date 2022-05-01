import {DISCORD_COLOR, RESET_COLOR} from "../../../config";

export default async function loginDiscordClient() {
    console.info(DISCORD_COLOR + "[INFO] Logging in the client" + RESET_COLOR)

    const token = process.env.TOKEN
    return await global.client.login(token)
}