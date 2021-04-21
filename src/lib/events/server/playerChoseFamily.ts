import { TextChannel } from "discord.js"

/**
 * When a player joins a family, add to it the role of the given family and welcome it in the family channel
 * @param params - The params of the event
 */
export default function playerChoseFamily(params: PlayerChoseFamilyParams) {
  /* Retrieve the member object */
  const member = global.assets.config.mainGuild.members.cache.get(params.playerID)

  if (!member) return

  /* Remove all the other families roles */
  const rolesToRemove = Object.values(global.assets.config.familiesID)
  rolesToRemove.splice(Object.keys(global.assets.config.familiesID).indexOf(params.family), 1)
  member.roles.remove(rolesToRemove)

  /* Add the current family role */
  member.roles.add(global.assets.config.familiesID[params.family])

  /* Send the welcoming message to the right channel */
  const familyChannel = global.assets.config.mainGuild.channels.cache.get(global.assets.config.textChannelID[params.family]) as TextChannel
  familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
}

export interface PlayerChoseFamilyParams {
  playerID: string
  family: string
}
