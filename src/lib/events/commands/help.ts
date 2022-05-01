import {ColorResolvable, Message, MessageEmbed} from "discord.js";
import Command from "../../classes/Command";
import {COMMAND_PREFIX, FAMILIES_COLORS, PERMISSIONS} from "../../../config";

export default new Command({
    name: 'help',
    title: 'Help',
    desc: 'Permet de connaître la liste des commandes ou les informations liées à une commande passée en argument.',
    aliases: ['h', 'aide'],
    permissions: ['everyone'],
    template: "help [command]",

    exec: async (message: Message, ...args: any[]) => {
        /* Save the command name if exists */
        const commandName = args[0]?.toLowerCase()

        /* The possible families colors */
        const colors = Object.values(FAMILIES_COLORS) as ColorResolvable[]

        /* Create the reply message embed */
        const reply = new MessageEmbed()
            /* Set a random color chosen from the colors list */
            .setColor(colors[Math.floor(Math.random() * colors.length)])

        /* Retrieve the command object using the first argument */
        const command = global.commands[commandName] || Command.findCommandFromAliases(commandName)

        /* If there is no command, try to display the command list */
        if (!command) {
            const helpPage: Command[] = []

            /* Push all commands that the user has permissions to use */
            for (const command of Object.values(global.commands) as Command[])
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
            commandsDisplayed.forEach((command) => reply.addField(`• ${command.name} / ${command.title}`, command.desc))

            /* Set the footer and the title of the reply */
            reply.setTitle("📄 Voici la liste des commandes :")
            reply.setFooter({
                text: `Page ${pageAsked}/${lastPageNumber} | ${COMMAND_PREFIX}help <page> pour afficher les autres pages.`,
                iconURL: global.client.user.avatarURL()
            })
        } else {
            /* Retrieve all roles from the command permissions (need to use promises due to fetch method) */
            const permissionsRoles = await Promise.all(
                command.permissions.map(async (permissionName) => {
                    const permissionID = PERMISSIONS[permissionName]
                    return await message.guild.roles.fetch(permissionID)
                })
            )

            /* Fulfill the embed reply with all the information */
            reply
                .setTitle(`❗ ${command.name} | ${command.title}`)
                .setDescription(
                    command.desc + '\n\n'
                    + `**Utilisation :**: ${COMMAND_PREFIX}${command.template}\n`
                    + `**Alias :**: ${command.aliases.join(' / ')}\n`
                    + `**Permissions :** ${permissionsRoles.join(' / ')}`
                )
                .setFooter({
                    text: `Informations sur la commande ${command.name}.`,
                    iconURL: global.client.user.avatarURL()
                })
        }

        /* Send the reply message */
        message.reply({embeds: [reply]})
    }
})
