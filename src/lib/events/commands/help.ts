import { Guild, Message, MessageEmbed } from "discord.js"
import Command from "../../classes/Command/Command"

export default new Command({
  name: 'help',
  title: 'Help',
  desc: 'Permet de connaître la liste des commandes OU les informations liées à une commande passée en argument.',
  aliases: ['h', 'aide'],
  permissions: ['everyone'],
  template: "!help [COMMAND_NAME]",

  exec: (message: Message, ...args: any[]) => {

    const reply = new MessageEmbed()
    .setColor(global.assets.Utils.getRandomFamilyColor())

    const pageAsked = Math.floor(args[0])
    
    const commandName = args[0]?.toLowerCase()
    const commandsPerm = global.assets.config.permissionsID
    const userRoles = message.guild.members.cache.get(message.author.id).roles.cache

    function commandList() {
      const commandsLength = Object.keys(global.commands).length

      var helpTab = []
      for (let n = 1 ; n <= commandsLength ; n++) {

        const cmd = Object.values(global.commands)
        const cmdPermRole = cmd[n-1].permissions

        if (cmdPermRole.length === 1) {
          if (userRoles.find(role => role.id === commandsPerm[cmdPermRole.toString()])) {
              helpTab.push(cmd[n-1])
          }
        } else {
          for (let m = 1 ; m <= cmdPermRole.length ; m++) {
            if (userRoles.find(role => role.id === commandsPerm[cmdPermRole[m-1].toString()])) {
              helpTab.push(cmd[n-1])
            }
          }
        }
      }

      const cmdPerPage = 4
      const lastPage = Math.ceil(helpTab.length/cmdPerPage)

      if (!pageAsked || isNaN(pageAsked) || pageAsked <= 1 || pageAsked > lastPage) var page = 1
      else page = pageAsked

      const cmdDisplayed = helpTab.slice((page-1)*cmdPerPage, (page-1)*cmdPerPage+4)
      cmdDisplayed.forEach((cmd) => reply.addField("• "+ cmd.name, cmd.desc))

      
      reply.setTitle("Voici la liste des commandes:")
      reply.setFooter(global.assets.Utils.getDoneRandomMessage()  + " | page " + page + "/" + lastPage, global.client.user.avatarURL())
    }


    const command = global.commands[commandName] || global.assets.Command.findCommandFromAliases(commandName)
    if (!command) {

      commandList()

    } else if (userRoles.find(role => role.id == commandsPerm[Object.values(global.commands[commandName])[4]])) {

      const rolePerm = message.guild.roles.cache.get(commandsPerm[global.commands[commandName].permissions.toString()]).toString()

      reply.setTitle(command.name)
      reply.setDescription(command.desc + '\n\n**'+ command.template + '**\n\n'+ 'aliases: ' + command.aliases.join(' / ') + '\n\npermissions: ' + `${rolePerm}` + '\n')
      reply.setFooter(global.assets.Utils.getDoneRandomMessage(), global.client.user.avatarURL())

    } else {

      commandList()

    }

    message.reply(reply)
  }
})
