import { GuildMember, Message } from "discord.js"

class Command {
  public name: string
  public title: string
  public desc: string
  public template: string
  public aliases: string[]
  public permissions: string[]
  private exec: (...args: any[]) => void

  constructor({ name, title, desc, template, aliases, permissions, exec }: CommandParams) {
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
      /* Check if the message instantiater has perms */
      const member = message.member
      if (!member || !this.userHasPerms(member)) throw new Error("Vous n'avez pas les permissions requises pour accéder à cette commande")

      /* Exec the comand */
      this.exec(message, ...args)

      /* *Clean* */
      message.react('🧼')

    } catch (e) {
      /* ***Not Clean*** */
      message.react('🤦‍♂️')

      /* Send the error in the channel */
      if (e.message) {
        message.reply(e.message)
        return
      }

      /* Send default message */
      message.reply("Il y a eu un problème lors de l'exécution de cette commande, assurez-vous d'avoir bien ordonné les arguments. Pour plus d'informations : !help " + this.name + " .")
    }
  }

  /**
   * Check if a user has the permission to use the command
   * @param user - The member we want to know if he has permissions
   */
  public userHasPerms(user: GuildMember): boolean {
    for (const permission of this.permissions) {
      const permissionID = global.assets.config.permissionsID[permission]
      if (user.roles.cache.find(role => role.id === permissionID)) return true
    }

    return false
  }

  /**
   * Find the command with the given alias
   * @param possibleAlias - The alias of the command to search if there is one
   * @returns - The command that corresponds to the alias
   */
  static findCommandFromAliases(possibleAlias): Command {
    return Object.values(global.commands).find((command: Command) => command.aliases.includes(possibleAlias))
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

export default Command
