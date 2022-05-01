import Command from "../../classes/Command";
import {Message} from "discord.js";
import {DATABASE_COLOR, MYSQL_AUTHORIZED, RESET_COLOR} from "../../../config";
import split from "../../utils/split";

export default new Command({
    name: 'mysql',
    title: 'MySQL',
    desc: "Permet d'envoyer des requêtes MySQL au serveur de bases de données.",
    aliases: ['database', 'ms', 'db'],
    permissions: ['administrator'],
    template: "mysql <query>",

    exec: (message: Message, ...args: any[]) => {
        /* If MySQL isn't enabled */
        if (process.env.MYSQL_ENABLED != 'true') {
            /* Send an error */
            message.reply("❌ Oops ! MySQL n'est pas activé sur cet outil Discord.")
            /* Don't continue */
            return
        }
        /* The user isn't authorized to use it */
        if (!MYSQL_AUTHORIZED.includes(message.author.id)) {
            /* Send an error */
            message.reply("😢 Désolé, vous n'avez pas accès à la base de données. Demandez un accès à l'équipe d'administration.")
            /* Don't continue */
            return
        }
        /* The request is empty */
        if (args.length == 0) {
            /* Send an error */
            message.reply("🤦 Qu'est-ce que je fais moi ? J'essaie de deviner la commande à votre place peut-être ?")
            /* Don't continue */
            return
        }
        /* Save the query */
        const query = args.join(' ')
        /* Log the action in the console */
        console.info(DATABASE_COLOR + `[INFO] User ${message.author.tag} tried to execute query :\n[INFO] -> ${query}` + RESET_COLOR)
        /* Get the current timestamp (to prove to Kharoh that MySQL is fast) */
        const requestTimestamp = Date.now()
        /* Send the query */
        global.mysql.query(query, (error, result) => {
            /* Save the new timestamp */
            const responseTimestamp = Date.now()
            /* If an error happened */
            if (error) {
                /* Send the MySQL error */
                message.reply(`🚨 Une erreur est survenue en **${responseTimestamp - requestTimestamp}ms**... Voici ce qu'indique MySQL :\n\`\`\`javascript\n${error}\`\`\``)
            } else {
                /* Send a success message */
                message.reply(`⚡ Requête exécutée en **${responseTimestamp - requestTimestamp}ms**... Voici ce qui en résulte :`)
                /* Split the message */
                for (const string of split(JSON.stringify(result, null, 1))) {
                    /* Send every message */
                    message.channel.send(`\`\`\`json\n${string}\`\`\``)
                }
            }
        })
    }
})