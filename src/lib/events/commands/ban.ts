import Command from "../../classes/Command";
import {Message} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";
import time from "../../utils/time";

export default new Command({
    name: 'ban',
    title: 'Bannissement',
    desc: "Pour bannir un joueur du jeu.",
    aliases: [],
    permissions: ['administrator', 'moderator'],
    template: "ban <user> <expiration> [reason]",

    exec: (message: Message, ...args: any[]) => {
        /* Convert the given time into a timestamp */
        const expiration = time(args[1])
        /* If the time could not be converted */
        if (!expiration) {
            /* Send an error */
            message.reply("⏱ Je n'ai rien compris donc on va reprendre les bases : pour donner une durée, soit on marque `f<timestamp>` pour donner directement un timestamp, soit on donne `r<nombre><unité>`, par exemple `r30d` pour donner un temps relatif de 30 jours.")
            /* Don't continue */
            return
        }
        /* Create a server request */
        const request = new ServerRequest('ban', {
            user: args[0],
            moderator: message.author.id,
            expiration,
            reason: args.slice(2).join(' ')
        }, 10000)
        /* Send the request */
        request.sendRequest()
            /* If the server responded */
            .then(([{user, expiration, reason}]) => {
                /* Convert the expiration timestamp (millis) into a normal timestamp for discord */
                expiration = expiration.toString().substring(0, 10)
                /* Send a confirmation message */
                message.reply(`🔨 L'utilisateur <@${user}> (ID : ${user}) a bien été banni pour la raison \`${reason || '...'}\` jusqu'au jusqu'au <t:${expiration}:D> à <t:${expiration}:t>, c'est-à-dire <t:${expiration}:R>.`)
            })
            /* In case of error */
            .catch(() => {
                /* Send a message */
                message.reply("🤣 Le serveur a l'air de s'opposer au bannissement, parce qu'il n'a pas répondu... Il est sûrement corrompu !")
            })
    }
})