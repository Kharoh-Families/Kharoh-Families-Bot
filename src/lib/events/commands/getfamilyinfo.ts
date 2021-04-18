import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Obtenir l\'information d\'une famille',
  desc: "Premet d'obtenir une information spécifique sur une famille dans les bases de données du serveur.",
  aliases: ['gfi'],
  permissions: ['administrator', 'moderator'],
  template: "!getfamilyinfo FAMILY_NAME PATH",

  exec: (message: Message, ...args: any[]) => {
    const familyName = args[0]
    const path = args[1]
    if (!familyName || !path) throw new Error("Arguments invalides, !help pour plus d'informations.")

    const params = { familyName, path }

    const request = new global.assets.ServerRequest({ name: 'getFamilyInfo', params, maxDelay: 10000 })

    const response = request.sendRequest()
    response
      .then((responseData) => message.reply(JSON.stringify(responseData)))
      .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
  }
})
