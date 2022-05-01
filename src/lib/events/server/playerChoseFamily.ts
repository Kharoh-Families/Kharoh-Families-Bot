import {CHANNELS, FAMILIES, PERMISSIONS} from "../../../config";
import {TextChannel} from "discord.js";

export default async function playerChoseFamily(params: PlayerChoseFamilyParams) {
    const guild = await global.app.getGuild()
    const member = await guild.members.fetch(params.id)

    if (!member) return

    /* Remove all the other families roles */
    await member.roles.remove(Object.values(FAMILIES))

    /* Add the current family role */
    await member.roles.add(FAMILIES[params.family])

    /* Add the player role */
    await member.roles.add(PERMISSIONS['player'])

    /* Send the welcoming message to the right channel */
    const familyChannel = guild.channels.cache.get(CHANNELS["discussion_" + params.family]) as TextChannel
    familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
}

export interface PlayerChoseFamilyParams {
    id: string
    family: string
}