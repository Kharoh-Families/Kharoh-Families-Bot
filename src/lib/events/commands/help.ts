import { Message, MessageEmbed } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'help',
  title: 'Help',
  desc: 'Permet de connaître la liste des commandes OU les informations liées à une commande passée en argument.',
  aliases: ['h', 'aide'],
  permissions: ['everyone'],
  template: "!help [COMMAND_NAME]",

  exec: async (message: Message, ...args: any[]) => {
    const commandName = args[0]?.toLowerCase()

    /* Create the reply message embed */
    const reply = new MessageEmbed()
      .setColor(global.assets.Utils.getRandomFamilyColor())

    /* Retrieve the command object using the first argument */
    const command = global.commands[commandName] || global.assets.Command.findCommandFromAliases(commandName)

    /* Some useful variables */
    const { permissionsID } = global.assets.config

    /* If there is no command, try to display the command list */
    if (!command) {
      const helpPage: Command[] = []

      /* Push all commands that the user has permissions to use */
      for (const command of Object.values(global.commands))
        if (command.userHasPerms(message.member)) helpPage.push(command)

      /* Set commands per page and work out the last page number */
      const commandsPerPage = 4
      const lastPageNumber = Math.ceil(helpPage.length / commandsPerPage)

      /* Retrieve and normalize page asked */
      let pageAsked = Math.floor(args[0])
      if (!pageAsked || isNaN(pageAsked) || pageAsked < 1 || pageAsked > lastPageNumber) pageAsked = 1

      /* Create the array comporting all the displayed command on this page */
      const firstCommandDisplayedIndex = (pageAsked - 1) * commandsPerPage
      const commandsDisplayed = helpPage.slice(firstCommandDisplayedIndex, firstCommandDisplayedIndex + 4)

      /* Fulfill the message embed reply with commands */
      commandsDisplayed.forEach((command) => reply.addField("• " + command.name + " | " + command.title, command.desc))

      /* Set the footer and the title of the reply */
      reply.setTitle("Voici la liste des commandes :")
      reply.setFooter("page " + pageAsked + " / " + lastPageNumber + " | !help [PAGE] pour afficher les autres pages | " + global.assets.Utils.getDoneRandomMessage(), global.client.user.avatarURL())
    }

    else {
      /* Retrieve all roles from the command permissions (need to use promises due to fetch method) */
      const permissionsRoles = await Promise.all(
        command.permissions.map(async (permissionName) => {
          const permissionID = permissionsID[permissionName]
          return await message.guild.roles.fetch(permissionID)
        })
      )

      /* Fulfill the embed reply with all the information */
      reply
        .setTitle(command.name + " | " + command.title)
        .setDescription(
          command.desc + '\n\n'
          + "**template**: " + command.template + '\n'
          + "**aliases**: " + command.aliases.join(' / ') + '\n'
          + "**permissions**: " + permissionsRoles.join(' | ')
        )
        .setFooter(global.assets.Utils.getDoneRandomMessage(), global.client.user.avatarURL())
    }

    /* Send the reply message */
    message.reply(reply)
  }
})
