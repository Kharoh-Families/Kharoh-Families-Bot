import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Faire rentrer les joueurs dans leur famille',
  desc: "Permet de récupérer les informations sur les listes de joueurs dans les familles du côté serveur et de faire rentrer les joueur sur le serveur discord dans leur famille.",
  aliases: ['spf'],
  permissions: ['administrator', 'moderator'],
  template: "!setplayersfamilies /",

  exec: (message: Message, ...args: any[]) => {
    const families = ['pink', 'blue', 'yellow', 'green']

    for (const family of families) {
      const playersFamiliesUpdates: any = {}

      /* Request the players list from the server */
      new global.assets.ServerRequest({ name: 'getFamilyInfo', params: { familyName: family, path: 'players.list' }, maxDelay: 10000 })
        .sendRequest()
        .then(([familyPlayersList]) => {
          for (const playerID of familyPlayersList) {
            /* Retrieve the member object */
            const member = global.assets.config.mainGuild.members.cache.get(playerID)

            /* Add the player to the update list if he wasn't in the family yet */
            if (!member.roles.cache.has(global.assets.config.familiesID[family]))
              playersFamiliesUpdates[member.user.tag] = family

            /* Remove all the other families roles */
            const rolesToRemove = Object.values(global.assets.config.familiesID)
            rolesToRemove.splice(Object.keys(global.assets.config.familiesID).indexOf(family), 1)
            member.roles.remove(rolesToRemove)

            /* Add the current family role */
            member.roles.add(global.assets.config.familiesID[family])

            /* Send as a response a list of all changed players */
            if (Object.values(playersFamiliesUpdates).length)
              message.reply(Object.entries(playersFamiliesUpdates).map(entry => entry.join(' => ')).join('\n'))
          }
        })
        .catch(() => console.log('t'))
    }
  }
})
