import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Obtenir l\'information d\'un joueur',
  desc: "Permet d'obtenir une information spécifique sur un joueur dans les bases de données du serveur.",
  aliases: ['gpi'],
  permissions: ['administrator', 'moderator'],
  template: "!getplayerinfo PLAYER_ID PATH",

  exec: (message: Message, ...args: any[]) => {
    const playerID = args[0]
    const path = args[1]
    if (!playerID || !path) throw new Error("Arguments invalides, !help pour plus d'informations.")

    const params = { playerID, path }

    const request = new global.assets.ServerRequest({ name: 'getPlayerInfo', params, maxDelay: 10000 })

    const response = request.sendRequest()
    response
      .then((responseData) => {
        const stringData = JSON.stringify(responseData, null, 2)
        message.reply("Les informations demandées sont les suivantes :")
        let iterator = 0
        const iteratorMax = stringData.length/1000
        let lastLineJump = 0
        while (iterator < iteratorMax) {
          const gap = (iterator+1)*1000
          const lineJump = stringData.substr(gap, gap+60).indexOf("\n") + gap
          message.reply("```json\n" + stringData.substr(lastLineJump, lineJump) + "\n```")
          lastLineJump = lineJump
          iterator++
        }
      })
      .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
  }
})
