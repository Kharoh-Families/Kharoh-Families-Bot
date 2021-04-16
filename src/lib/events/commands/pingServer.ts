import { Message } from "discord.js";

export default

  {
    name: 'ping serveur',
    desc: "Permet de vérifier la latence du serveur du jeu.",
    template: "!pingServer /",

    exec: (message: Message, ...args: any[]) => {
      const request = new global.assets.ServerRequest({ name: 'ping', params: null, maxDelay: 10000 })

      const currentTimestamp = Date.now()

      global.server.emit('ping')
      // console.log(global.server)

      const response = request.sendRequest()
      response.then(() => message.reply(`Voilà ! (${Date.now() - currentTimestamp}ms)`))
      response.catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
    }
  }
