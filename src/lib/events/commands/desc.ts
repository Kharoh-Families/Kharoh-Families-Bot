import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Description',
  desc: "Retourne la description de la commande passée en argument.",
  aliases: ['d', 'description'],
  permissions: ['everyone'],
  template: '!desc COMMAND_NAME',

  exec: (message: Message, ...args: any[]) => {
    const commandName = args[0]
    if (!global.commands[commandName]) throw new Error("La commande que vous avez passée en argument n\'existe pas, vous pouvez retrouver plus d'informations avec !help .")
    message.reply(global.commands[commandName].desc)
  }
})
