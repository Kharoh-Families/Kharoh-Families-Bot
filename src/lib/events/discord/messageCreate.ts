import {Message} from "discord.js";
import {COMMAND_PREFIX} from "../../../config";
import Command from "../../classes/Command";

export default function messageDiscordEvent(message: Message) {
    if (message.content.startsWith(COMMAND_PREFIX)) {
        let [commandName, ...args] = message.content.slice(1).split(' ')
        commandName = commandName.toLowerCase()

        const command = global.commands[commandName] || Command.findCommandFromAliases(commandName)
        if (!command) return message.reply(`🧐 Cette commande ne semble pas exister. Vous pouvez voir la liste des commandes qui existent avec la commande ${COMMAND_PREFIX}help.`)

        command.run(message, ...args)
    }
}
