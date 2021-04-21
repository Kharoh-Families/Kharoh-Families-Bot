import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Lancer une saison',
  desc: "Permet de lancer une saison de jeu.",
  aliases: [],
  permissions: ['administrator'],
  template: "!startseason [CUSTOM_SEASON_END_TIMESTAMP]",

  exec: (message: Message, ...args: any[]) => {
    const customSeasonendTimestamp = args[0]

    const request = new global.assets.ServerRequest({ name: 'startSeason', params: { customSeasonendTimestamp }, maxDelay: 60000 })
    const response = request.sendRequest()

    response
      .then((responseData) => message.reply('Le serveur a répondu à la requête : ' + responseData))
      .catch(() => message.reply('Le serveur n\'a pas répondu...'))
  }
})
