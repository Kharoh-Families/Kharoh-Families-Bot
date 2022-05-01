import {GuildMember, TextChannel} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";
import {CHANNELS, FAMILIES, PERMISSIONS} from "../../../config";

export default async function testing(member: GuildMember) {
    /* Add the player to the right family */
    const request = new ServerRequest('getPlayerInfo', {id: member.id, info: 'family'}, 10000)

    const familyName = await request.sendRequest() as string
    if (!familyName) return

    /* Add the current family role */
    await member.roles.add(FAMILIES[familyName])

    /* Add the player role */
    await member.roles.add(PERMISSIONS['player'])

    /* Send the welcoming message to the right channel */
    const guild = await global.app.getGuild()
    const familyChannel = guild.channels.cache.get(CHANNELS["discussion_" + familyName]) as TextChannel
    familyChannel.send(`Bienvenue à ${member.user} qui vient de rejoindre la famille !`)
}