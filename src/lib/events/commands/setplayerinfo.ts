import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'setplayerinfo',
  title: 'Changer l\'information d\'un joueur',
  desc: "Permet d'accéder aux méthodes des classes d'un joueur et de le modifier.",
  aliases: ['spi'],
  permissions: ['administrator'],
  template: "!setplayerinfo PLAYER_ID PATH ...ARGS",

  exec: (message: Message, ...args: string[]) => {
    const playerID = args[0]
    const path = args[1]
    const serverArgs = global.assets.Formatter.formatArgs(args.slice(2)) // need to formatArgs
    if (!playerID || !path) throw new Error("Arguments invalides, !help pour plus d'informations.")

    const params = { playerID, path, args: serverArgs }

    const request = new global.assets.ServerRequest({ name: 'setPlayerInfo', params, maxDelay: 10000 })

    const response = request.sendRequest()
    response
      .then((responseData) => message.reply(JSON.stringify(responseData)))
      .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
  }
})
