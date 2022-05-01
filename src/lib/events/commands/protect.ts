import Command from "../../classes/Command";
import {Message} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";

export default new Command({
    name: 'protect',
    title: 'Protection',
    desc: "Pour protéger un joueur des auto-bannissement.",
    aliases: [],
    permissions: ['administrator'],
    template: "protect <user> [reason]",

    exec: (message: Message, ...args: any[]) => {
        /* The user to protect */
        const user = args[0]
        /* The member who sent the command */
        const moderator = message.author.id
        /* The optional reason */
        const reason = args.slice(1).join(' ')
        /* Create the request */
        const request = new ServerRequest('protect', {user, moderator, reason}, 10000)
        /* Send it */
        request.sendRequest()
            /* The server answered */
            .then(() => {
                /* Send a success message */
                message.reply(`👼 L'utilisateur <@${args[0]}> (ID : ${args[0]}) a été protégé.`)
            })
            /* It didn't */
            .catch(() => {
                /* Send an error message */
                message.reply("🤣 Le serveur ne doit vraiment pas aimer cet utilisateur, car une erreur est survenue...")
            })
    }
})