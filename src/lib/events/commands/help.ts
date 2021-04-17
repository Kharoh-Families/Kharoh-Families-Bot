import { Message, MessageEmbed } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Help',
  desc: 'Permet de connaître la liste des commandes OU les informations liées à une commande passée en argument.',
  aliases: ['h', 'aide'],
  permissions: ['everyone'],
  template: "!help [COMMAND_NAME]",

  exec: (message: Message, ...args: any[]) => {
    const commandName = args[0]?.toLowerCase()

    const command = global.commands[commandName] || global.assets.Command.findCommandFromAliases(commandName)
    if (!command) throw new Error("La commande que vous avez passée en argument n\'existe pas, vous pouvez retrouver plus d'informations avec !help .")

    const reply = new MessageEmbed()
      .setColor(global.assets.Utils.getRandomFamilyColor())
      .setTitle(command.name)
      .setDescription(
        command.desc + '\n\n**'
        + command.template + '**\n\n'
        + 'aliases: ' + command.aliases.join(' / ') + '\n'
      )
      .setFooter(global.assets.Utils.getDoneRandomMessage(), global.client.user.avatarURL())

    message.reply(reply)
  }
})
