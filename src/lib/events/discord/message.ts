import { Message } from "discord.js";

export default function messageDiscordEvent(message: Message) {
  if (message.content.startsWith('!')) {
    const [command, ...args] = message.content.slice(1).split(' ')
    if (!global.commands[command]) return message.reply('Cette commande ne semble pas exister. Vous pouvez voir la liste des commandes qui existent avec la commande !help .')
    global.commands[command].run(message, ...args)
  }
}
