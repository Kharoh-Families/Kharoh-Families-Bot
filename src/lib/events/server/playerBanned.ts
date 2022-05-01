export default async function playerBanned(params: PlayerBannedParams) {
    const guild = await global.app.getGuild()
    const member = await guild.members.fetch(params.id)
    const timestamp = params.expiration.toString().substring(0, 10)
    member.send(`🛑 Bonjour,\n\nVous venez de **tenter de vous connecter** à **Kharoh Families**, mais malheureusement vous êtes banni du jeu pour la raison suivante :\n\`\`\`\n${params.reason || '...'}\`\`\`\nCette sanction est effective jusqu'au <t:${timestamp}:D> à <t:${timestamp}:t>.\nNous espérons que vous reviendrez en pleine forme et plus respectueux que jamais des règles.\n\nEn espérant vous recroiser sur **Kharoh Families**,\nL'équipe du jeu.`)
}

export interface PlayerBannedParams {
    id: string
    reason: string
    expiration: number
}