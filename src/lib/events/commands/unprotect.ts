import Command from "../../classes/Command";
import {Message} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";

export default new Command({
    name: 'unprotect',
    title: 'Déprotection',
    desc: "Pour arrêter la protection d'un joueur des auto-bannissement.",
    aliases: [],
    permissions: ['administrator'],
    template: "unprotect <user> [reason]",

    exec: (message: Message, ...args: any[]) => {
        /* The user to unprotect */
        const user = args[0]
        /* The user who sent the command */
        const moderator = message.author.id
        /* The optional reason */
        const reason = args.slice(1).join(' ')
        /* Create a server request */
        const request = new ServerRequest('unprotect', {user, moderator, reason}, 10000)
        /* Send it */
        request.sendRequest()
            /* The server responded */
            .then(([{success}]) => {
                /* Send a success message */
                if (success) message.reply(`😈 L'utilisateur <@${args[0]}> (ID : ${args[0]}) n'est maintenant plus protégé.`)
                /* The user wasn't protected */
                else message.reply("❌ Vous êtes réveillé ? Je ne crois pas, parce que le joueur n'est déjà pas protégé...")
            })
            /* It didn't answer */
            .catch(() => {
                /* Send an error message */
                message.reply("🤣 Le serveur a dû prendre la défense de l'utilisateur, car une erreur est survenue...")
            })
    }
})