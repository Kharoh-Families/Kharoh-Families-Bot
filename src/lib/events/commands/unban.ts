import Command from "../../classes/Command";
import {Message} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";

export default new Command({
    name: 'unban',
    title: 'Débannissement',
    desc: "Pour débannir un joueur du jeu.",
    aliases: [],
    permissions: ['administrator', 'moderator'],
    template: "unban <user> [reason]",

    exec: (message: Message, ...args: any[]) => {
        /* The unbanned user */
        const user = args[0]
        /* The user who sent the command */
        const moderator = message.author.id
        /* The optional reason */
        const reason = args.slice(1).join(' ')
        /* Create a server request */
        const request = new ServerRequest('unban', {user, moderator, reason}, 10000)
        /* Send it */
        request.sendRequest()
            /* The server responded */
            .then(([{success}]) => {
                /* If the user was banned */
                if (success) message.reply(`🔨 L'utilisateur <@${args[0]}> (ID : ${args[0]}) a bien été débanni du jeu.`)
                /* If he wasn't */
                else message.reply("❌ Vous êtes réveillé ? Je ne crois pas, vous essayez de débannir un joueur qui n'est pas banni...")
            })
            /* If it didn't answer */
            .catch(() => {
                /* Send an error message */
                message.reply("🤣 Le serveur ne doit vraiment pas aimer cet utilisateur, car une erreur est survenue...")
            })
    }
})