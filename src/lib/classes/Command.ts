import {GuildMember, Message} from "discord.js";
import {COMMAND_PREFIX, PERMISSIONS} from "../../config";

export default class Command {
    public name: string
    public title: string
    public desc: string
    public template: string
    public aliases: string[]
    public permissions: string[]
    private readonly exec: (...args: any[]) => void

    constructor({name, title, desc, template, aliases, permissions, exec}: CommandParams) {
        this.name = name
        this.title = title
        this.desc = desc
        this.template = template
        this.aliases = aliases
        this.permissions = permissions
        this.exec = exec
    }

    /**
     * Run the command
     * @param message - The message that instantiated the command
     * @param args - The args passed in the message
     */
    run(message: Message, ...args: any[]): void {
        try {
            /* Check if the message instantiator has perms */
            if (!message.member || !this.userHasPerms(message.member)) {
                message.reply("👮 Vous n'avez pas les permissions requises pour accéder à cette commande !")
            }

            /* Exec the command */
            this.exec(message, ...args)

            /* Cool, it worked */
            message.react('👍')

        } catch (e) {
            /* Oops, it didn't work */
            message.react('👎')

            /* Send the error in the channel */
            if (e.message) {
                message.reply(e.message)
                return
            }

            /* Send default message */
            message.reply(`🤔 Il y a eu un problème lors de l'exécution de cette commande, assurez-vous d'avoir bien ordonné les arguments. Pour plus d'informations : ${COMMAND_PREFIX}help ${this.name}.`)
        }
    }

    /**
     * Check if a user has the permission to use the command
     * @param user - The member we want to know if he has permissions
     */
    public userHasPerms(user: GuildMember): boolean {
        for (const permission of this.permissions) {
            const permissionID = PERMISSIONS[permission]
            if (user.roles.cache.find(role => role.id === permissionID)) return true
        }

        return false
    }

    /**
     * Find the command with the given alias
     * @param alias - The alias of the command to search if there is one
     */
    static findCommandFromAliases(alias): Command {
        for (const command of Object.values(global.commands) as Command[]) {
            if (command.aliases.includes(alias)) return command
        }
    }

}

export interface CommandParams {
    name: string
    title: string
    desc: string
    template: string
    aliases: string[]
    permissions: string[]
    exec: (...args: any[]) => void
}