import { Message } from "discord.js";

export default

  {
    name: 'template',
    desc: "Retourne le template de la commande passée en argument.",
    template: "!template COMMAND_NAME",

    exec: (message: Message, ...args: any[]) => {
      const commandName = args[0]
      if (!global.commands[commandName]) return message.reply("La commande que vous avez passé en argument n\'existe pas, vous pouvez retrouver plus d'informations avec !help .")
      message.reply(global.commands[commandName].template)
    }
  }
