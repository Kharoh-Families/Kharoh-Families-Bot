import {CHANNELS, FAMILIES_COLORS} from "../../../config";
import ServerRequest from "../../classes/ServerRequest";
import {MessageEmbed, TextChannel} from "discord.js";

export default async function refreshInformation() {
    /* Retrieve the pings channel in the server discord */
    const pingsChannel = await global.client.channels.fetch(CHANNELS['pings']) as TextChannel

    /* Create a ping request to send to the game server */
    const pingRequest = new ServerRequest('ping', null, 10000)

    /* Get the current timestamp in millis */
    const currentTimestamp = Date.now()

    /* Send the request to the server */
    pingRequest.sendRequest()

        /* The server successfully answered */
        .then(() => {
            /* Calculate the time the server took to answer */
            let ping = (Date.now() - currentTimestamp)

            /* Create a request to get the list of the connected players */
            const playersRequest = new ServerRequest('getConnectedPlayers', {logIDs: false}, 10000)

            /* Send the request to the server */
            playersRequest.sendRequest()

                /* The server successfully answered, we get the list */
                .then(([{playersList}]) => {
                    /* Send a message to the ping channel with the connected players */
                    pingsChannel.send('Un ping serveur a été effectué en **' + ping + 'ms**. **' + playersList.length + '** joueurs sont connectés.\n' + playersList.join(', '))
                    /* Set the activity to show a message like 'Watching {} players !' */
                    global.client.user.setActivity(`${playersList.length} joueurs !`, {type: 'WATCHING'});
                    /* Set the status to online */
                    global.client.user.setStatus('online')
                })

                /* The server didn't answer, so, we have the ping but not the players list */
                .catch(() => {
                    /* Send a message to the ping channel with the ping but not the connected players */
                    pingsChannel.send('Un ping serveur a été effectué en **' + ping + 'ms**.\n **Il est impossible de savoir combien de joueurs sont présents.**')
                    /* Set the activity with a message which say that the server didn't answer */
                    global.client.user.setActivity('les admins râler...', {type: 'WATCHING'});
                    /* Set the status 'do not disturb' */
                    global.client.user.setStatus('dnd')
                })

            /* Create a server request to get information about families to send them into the stats channels */
            const familiesRequest = new ServerRequest('getFamilyInfo', {names: ['pink', 'blue', 'yellow', 'green']}, 10000)

            /* Send the request */
            familiesRequest.sendRequest()

                /* The server successfully answered, we get the info */
                .then(async (data) => {
                    /* Browse data (data[0] because the data list is in another list, and I don't know why) */
                    for (const family of data[0]) {
                        /* Get the family stats channel */
                        const statsChannel = await global.client.channels.fetch(CHANNELS["stats_" + family['name']]) as TextChannel
                        /* Create the player list to show it in the embed */
                        const players = []
                        for (const player of family['players']) {
                            if (!player) continue
                            players.push(`${player['name']}#${player['discriminator']} (<@${player['id']}>)`)
                        }
                        /* Create the embed with info */
                        const message = new MessageEmbed()
                            .setColor(FAMILIES_COLORS[family['name']])
                            .setTitle("Statistiques de la famille")
                            .setDescription("Statistiques mises à jour régulièrement.")
                            .addFields(
                                {name: 'Points :', value: family['points'] + " pts"},
                                {
                                    name: 'Mairie :',
                                    value: `${family['townhall'] ? family['townhall']['x'] : '?'} ; ${family['townhall'] ? family['townhall']['y'] : '?'}`
                                },
                                {name: 'Joueurs : ', value: players.length > 0 ? players.join('\n') : 'Aucun joueur...'}
                            )
                        /* Get the last message sent in the stats channel */
                        statsChannel.messages.fetch({limit: 1}).then((messages) => {
                            /* If the message was sent by the bot */
                            if (messages.first()?.author.id == global.client.user.id) {
                                /* Edit the message (to avoid spam) */
                                messages.first().edit({
                                    content: `Données mises à jour le ${new Date(Date.now()).toLocaleString('fr-FR')}.`,
                                    embeds: [message]
                                })
                            } else {
                                /* Send the new message */
                                statsChannel.send({
                                    content: `Données mises à jour le ${new Date(Date.now()).toLocaleString('fr-FR')}.`,
                                    embeds: [message]
                                })
                            }
                        })
                    }
                })
                .catch(() => {
                })
        })

        /* The server didn't answer */
        .catch(() => {
            /* Send an error message in the pings channel */
            pingsChannel.send('**Erreur lors de la tentative de ping du serveur.**')
            /* Set the activity with a message which say that the server didn't answer */
            global.client.user.setActivity('les admins râler...', {type: 'WATCHING'})
            /* Set the status 'do not disturb' */
            global.client.user.setStatus('dnd')
        })
}