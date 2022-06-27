import Command from "../../classes/Command";
import {Message, MessageAttachment} from "discord.js";
import {MYSQL_AUTHORIZED} from "../../../config";
import mysqldump from 'mysqldump';
import * as path from "path";
import * as fs from "fs";

export default new Command({
    name: 'savemysql',
    title: 'Save MySQL',
    desc: "Permet de télécharger les bases de données.",
    aliases: ['savedatabase', 'sms', 'sdb'],
    permissions: ['administrator'],
    template: "savemysql <database>",

    exec: async (message: Message, ...args: any[]) => {
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

        const savePath = path.join(__dirname, "../../../../data", `${args[0]}-${Math.round(Math.random()*1000)}.sql`)

        await mysqldump({
            connection: {
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: args[0]
            },
            dumpToFile: savePath
        })

        await message.reply({content: `Voici le fichier de sauvegarde de la base de données **${args[0]}**.`, files: [savePath]})

        fs.unlink(savePath, () => {})

    }
})