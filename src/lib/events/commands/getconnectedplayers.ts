import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Nombre de joueurs connectés',
  desc: "Permet de connaître le nombre de joueurs connectés sur le jeu.",
  aliases: ['players', 'connected', 'gcp'],
  permissions: ['everyone'],
  template: "!getconnectedplayers [LOG_IDS]",

  exec: (message: Message, ...args: any[]) => {
    let logIDs = !!args[0]
    const params = { logIDs }

    const request = new global.assets.ServerRequest({ name: 'getConnectedPlayers', params, maxDelay: 10000 })

    const response = request.sendRequest()
    response
      .then((responseData: any) => {
        const [{ playersList }] = responseData

        let reply = `${playersList.length} joueurs connectés : `
        playersList.forEach((player: string, index: number) => {
          if (index === playersList.length - 1) return reply += `${player}.`
          reply += `${player}, `
        })

        message.reply(reply)
      })
      .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
  }
})
