import { Message } from "discord.js"

class Command {
  public name: string
  public desc: string
  public template: string
  private exec: (...args: any[]) => void

  constructor({ name, desc, template, exec }: CommandParams) {
    this.name = name
    this.desc = desc
    this.template = template
    this.exec = exec
  }

  run(message: Message, ...args: any[]): void {
    try {
      this.exec(message, ...args)
      message.react('🧼')
    } catch (e) {
      message.react('🤦‍♂️')
      if (e.message) {
        message.reply(e.message)
        return
      }
      message.reply("Il y a eu un problème lors de l'exécution de cette commande, assurez-vous d'avoir bien ordonné les arguments. Pour plus d'informations : !help " + this.name + " .")
    }
  }
}

export interface CommandParams {
  name: string
  desc: string
  template: string
  exec: (...args: any[]) => void
}

export default Command
