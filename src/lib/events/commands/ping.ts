import { Message } from "discord.js";

export default

  {
    name: 'Ping',
    desc: "La fameuse commande originelle du ping pong (normalement c'est pour connaître la latence et la vitesse de réponse du bot) (le bot répondra n'importe quoi).",
    aliases: ['p'],
    permissions: ['everyone'],
    template: "!ping /",

    exec: (message: Message, ...args: any[]) => {
      const possibleReplies = [
        'Hello World !',
        'Bidulman notre roi !',
        'Pong.',
        'Ultracrépidarianisme.',
        'Anneau commutatif.',
        'Quaternions.',
        'Facile.'
      ]

      const randomReply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)]

      message.reply(randomReply)
    }
  }
