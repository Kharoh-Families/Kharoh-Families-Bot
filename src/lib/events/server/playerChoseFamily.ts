import { TextChannel } from "discord.js"

/**
 * When a player joins a family, add to it the role of the given family and welcome it in the family channel
 * @param params - The params of the event
 */
export default async function playerChoseFamily(params: PlayerChoseFamilyParams) {
  /* Retrieve the member object */
  const mainGuild = await global.assets.config.mainGuild()
  const member = await mainGuild.members.fetch(params.playerID)

  if (!member) return

  /* Remove all the other families roles */
  await member.roles.remove(Object.values(global.assets.config.familiesID))

  /* Add the current family role */
  const familyRole = await mainGuild.roles.fetch(global.assets.config.familiesID[params.family])
  await member.roles.add(familyRole)

  /* Add the player role */
  const playerRole = await mainGuild.roles.fetch(global.assets.config.permissionsID['player'])
  await member.roles.add(playerRole)

  /* Send the welcoming message to the right channel */
  const familyChannel = mainGuild.channels.cache.get(global.assets.config.textChannelID[params.family]) as TextChannel
  familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
}

export interface PlayerChoseFamilyParams {
  playerID: string
  family: string
}
