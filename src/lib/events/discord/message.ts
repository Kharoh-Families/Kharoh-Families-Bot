import { Message } from "discord.js";

export default function messageDiscordEvent(message: Message) {
  if (message.content.startsWith('!')) {
    let [commandName, ...args] = message.content.slice(1).split(' ')
    commandName = commandName.toLowerCase()

    const command = global.commands[commandName] || global.assets.Command.findCommandFromAliases(commandName)
    if (!command) return message.reply('Cette commande ne semble pas exister. Vous pouvez voir la liste des commandes qui existent avec la commande !help .')

    command.run(message, ...args)
  }
}
