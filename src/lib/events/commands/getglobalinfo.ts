import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'getglobalinfo',
  title: 'Obtenir une information globale',
  desc: "Permet d'obtenir une information de l'objet global du serveur.",
  aliases: ['ggi'],
  permissions: ['administrator', 'moderator'],
  template: "!getglobalinfo PATH",

  exec: (message: Message, ...args: any[]) => {
    const path = args[0]
    if (!path) throw new Error("Arguments invalides, !help pour plus d'informations.")

    const params = { path }

    const request = new global.assets.ServerRequest({ name: 'getGlobalInfo', params, maxDelay: 10000 })

    const response = request.sendRequest()
    response
      .then((responseData) => {
        const stringData = JSON.stringify(responseData, null, 2)
        message.reply("Les informations demandées sont les suivantes :")
        let iterator = 0
        const iteratorMax = stringData.length / 1000
        let lastLineJump = 0
        while (iterator < iteratorMax) {
          const gap = (iterator + 1) * 1000
          const lineJump = stringData.substr(gap, gap + 60).indexOf("\n") + gap
          message.reply("```json\n" + stringData.substr(lastLineJump, lineJump) + "\n```")
          lastLineJump = lineJump
          iterator++
        }
      })
      .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
  }
})
