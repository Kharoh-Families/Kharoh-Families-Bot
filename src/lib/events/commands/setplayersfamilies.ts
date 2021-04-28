import { Message, TextChannel } from "discord.js";
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
        .then(async ([familyPlayersList]) => {
          for (const playerID of familyPlayersList) {
            /* Retrieve the member object */
            const mainGuild = await global.assets.config.mainGuild()
            const member = await mainGuild.members.fetch(playerID)

            /* If the member does not exist skip this loop */
            if (!member) continue

            /* Remove all the other families roles */
            const rolesToRemove = Object.values(global.assets.config.familiesID)
            rolesToRemove.splice(Object.keys(global.assets.config.familiesID).indexOf(family), 1)
            member.roles.remove(rolesToRemove)

            /* If the player is already in the family, skip this loop */
            if (member.roles.cache.has(global.assets.config.familiesID[family])) continue

            /* Add the player to the update list if he wasn't in the family yet */
            playersFamiliesUpdates[member.user.tag] = family

            /* Add the current family role */
            member.roles.add(global.assets.config.familiesID[family])

            /* Send the welcoming message to the right channel */
            const familyChannel = mainGuild.channels.cache.get(global.assets.config.textChannelID[family]) as TextChannel
            familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
          }

          /* Send as a response a list of all changed players */
          if (Object.values(playersFamiliesUpdates).length)
            message.reply(Object.entries(playersFamiliesUpdates).map(entry => entry.join(' => ')).join('\n'))
        })
    }
  }
})
