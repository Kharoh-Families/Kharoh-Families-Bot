export default async function playerUnbanned(params: PlayerUnbannedParams) {
    const guild = await global.app.getGuild()
    const member = await guild.members.fetch(params.id)
    member.send(`🤝 Bonjour,\n\nVous venez de vous connecter **pour la première fois** depuis votre dernière sanction, qui était pour rappel la suivante :\n\`\`\`\n${params.reason}\`\`\`\nNous espérons que vous revenez pour combattre les autres familles dans le respect des règles du jeu.\n\nNous vous souhaitons une excellente expérience sur **Kharoh Families**,\nL'équipe du jeu.`)
}

export interface PlayerUnbannedParams {
    id: string
    reason: string
}