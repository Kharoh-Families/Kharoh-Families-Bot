import { Message } from "discord.js";

export default

  {
    name: 'ping serveur',
    desc: "Permet de vérifier la latence du serveur du jeu.",
    template: "!pingServer /",

    exec: (message: Message, ...args: any[]) => {
      const request = new global.assets.ServerRequest({ name: 'pingServer', params: null, maxDelay: 10000 })

      const currentTimestamp = Date.now()

      const response = request.sendRequest()

      response
        .then(() => message.reply(`Voilà ! (${Date.now() - currentTimestamp}ms)`))
        .catch(() => message.reply('Quelque chose de mal est arrivé au serveur... (pas de réponse).'))
    }
  }
