import {Message} from "discord.js";
import Command from "../../classes/Command";
import ServerRequest from "../../classes/ServerRequest";

export default new Command({
    name: 'connected',
    title: 'Connectés',
    desc: "Permet de connaître le nombre de joueurs connectés sur le jeu.",
    aliases: ['players', 'gcp'],
    permissions: ['everyone'],
    template: "connected",

    exec: (message: Message, ...args: any[]) => {
        /* Create a request */
        const request = new ServerRequest('getConnectedPlayers', {}, 10000)
        /* Send the request to the game server */
        request.sendRequest()
            /* The server successfully answered */
            .then(([{playersList}]: any) => {
                /* The player list isn't empty */
                if (playersList.length > 0) {
                    /* Send the list of the connected players */
                    message.reply(`📄 **${playersList.length}** joueurs connectés : ${playersList.join(', ')}`)
                    /* The player list is empty */
                } else {
                    /* Ask the user if he wants to join :D */
                    message.reply("😶‍🌫️ **Personne** n'est connecté... Tu n'as qu'à venir jouer !")
                }

            })
            /* The server didn't answer */
            .catch(() => message.reply("🔍 Pas de réponse... Le serveur à sûrement dû oublier la liste pendant le trajet... Sûrement..."))
    }
})
