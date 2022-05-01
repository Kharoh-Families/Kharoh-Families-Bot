import Command from "../../classes/Command";
import {Message} from "discord.js";
import ServerRequest from "../../classes/ServerRequest";

export default new Command({
    name: 'pingserver',
    title: 'Ping Serveur',
    desc: "Permet de vérifier la latence du serveur de jeu.",
    aliases: ['ps'],
    permissions: ['administrator', 'moderator'],
    template: "pingserver",

    exec: (message: Message, ...args: any[]) => {
        /* Create a ping request */
        const request = new ServerRequest('ping', {}, 10000)
        /* Get the current timestamp in millis */
        const timestamp = Date.now()
        /* Send the request */
        request.sendRequest()
            /* The game server successfully answered */
            .then(() => message.reply(`⚡ Le serveur a répondu en **${Date.now() - timestamp}ms** !`))
            /* The game server didn't answer */
            .catch(() => message.reply("🤐 Oops... Le serveur n'a pas répondu dans le temps imparti. Il est peut-être muet ?"))
    }
})