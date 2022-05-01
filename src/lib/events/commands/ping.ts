import {Message} from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    name: 'ping',
    title: 'Ping',
    desc: "Non, je n'ai pas prévu de répondre.",
    aliases: ['p'],
    permissions: ['everyone'],
    template: "ping",

    exec: (message: Message, ...args: any[]) => {
        const possibleReplies = [
            "Je n'ai pas compris ta demande. Tu peux répéter ?",
            "Il est des nôtres, il a exécuté la commande comme les autres !",
            "Hein ? Mais pourquoi tu veux savoir ça ?",
            "C'est pas tes affaires mon p'tit.",
            "Pong ! Je t'ai bien eu hein ?",
            "Anticonstitutionnellement !",
            "Tu veux ma photo peut-être ?",
            "Laisse-moi dormir un peu s'il te plaît.",
            "Je crois que j'ai une tendinite au bras, désolé.",
            "Non, je suis en congé.",
            "Je ne suis pas disponible pour le moment, veuillez laisser un message après le bip.",
            "Circulez, c'est pas un endroit pour les sensibles !",
            "Chérie ? Je crois que ça va trancher !",
            "Facile."
        ]

        /* Randomly choose a joke */
        const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)]
        /* Send it */
        message.reply(`😜 ${randomReply}`)
    }
})
