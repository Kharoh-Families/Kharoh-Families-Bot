import { GuildMember, TextChannel } from "discord.js";

export default function guildMemberAdd(member: GuildMember) {
  /* Add the player to the right family */
  const request = new global.assets.ServerRequest({ name: 'getPlayerInfo', params: { playerID: member.id, path: 'family.name' }, maxDelay: 10000 })

  const response = request.sendRequest()
  response
    .then((familyName: string) => {
      if (!familyName) return

      /* Remove all the other families roles */
      const rolesToRemove = Object.values(global.assets.config.familiesID)
      rolesToRemove.splice(Object.keys(global.assets.config.familiesID).indexOf(familyName), 1)
      member.roles.remove(rolesToRemove)

      /* Add the current family role */
      member.roles.add(global.assets.config.familiesID[familyName])

      /* Send the welcoming message to the right channel */
      const familyChannel = global.assets.config.mainGuild.channels.cache.get(global.assets.config.textChannelID[familyName]) as TextChannel
      familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
    })
    .catch()
}
