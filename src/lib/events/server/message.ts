import loadModules from "../../utils/loadModules";
import * as path from "path";

const messages: { [key: string]: (...args) => string } = {}
for (const module of loadModules(path.join(__dirname, "../../../assets/messages/"))) {
    messages[module.name] = module.content
}

export default async function (params: MessageParams) {
    const guild = await global.app.getGuild()
    const member = await guild.members.fetch(params.user)

    const message: (...args) => string = messages[params.message]
    await member.send(message(params))
}

export interface MessageParams {
    user: string
    message: string
    data: any
}