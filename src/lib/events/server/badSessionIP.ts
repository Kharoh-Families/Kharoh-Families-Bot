import {Guild, GuildMember} from "discord.js";

export default async function badSessionIP(params: BadSessionIPParams) {
    const guild: Guild = await global.app.getGuild()
    const member: GuildMember = await guild.members.fetch(params.id)
    member.send(`🚨 Bonjour,\n\nNous avons détecté **à l'instant** qu'un utilisateur a tenté de se connecter au jeu en utilisant **votre jeton** d'authentification sur une **nouvelle IP**.\nPar mesure de sécurité, __nous avons détruit la session__ : nous vous demandons simplement de __vous reconnecter__ lorsque vous voudrez jouer au jeu.\n\nEn vous souhaitant une excellente expérience sur **Kharoh Families**,\nL'équipe du jeu.`)
}

export interface BadSessionIPParams {
    id: string
}