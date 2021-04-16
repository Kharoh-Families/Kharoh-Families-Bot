import { Message } from "discord.js";

export default

  {
    name: 'description',
    desc: "Retourne la description de la commande passée en argument.",
    template: "!desc COMMAND_NAME",

    exec: (message: Message, ...args: any[]) => {
      const commandName = args[0]
      if (!global.commands[commandName]) throw new Error("La commande que vous avez passé en argument n\'existe pas, vous pouvez retrouver plus d'informations avec !help .")
      message.reply(global.commands[commandName].desc)
    }
  }
