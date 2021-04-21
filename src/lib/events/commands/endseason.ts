import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Terminer une saison',
  desc: "Permet d'arrêter une saison du jeu prématurément.",
  aliases: [],
  permissions: ['administrator'],
  template: "!endseason /",

  exec: (message: Message, ...args: any[]) => {
    const request = new global.assets.ServerRequest({ name: 'endSeason', params: undefined, maxDelay: 60000 })
    const response = request.sendRequest()

    response
      .then((responseData) => message.reply('Le serveur a répondu à la requête : ' + responseData))
      .catch(() => message.reply('Le serveur n\'a pas répondu...'))
  }
})
