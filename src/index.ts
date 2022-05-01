import * as dotenv from 'dotenv'
import App from "./lib/app/App";
import {DISCORD_COLOR, RESET_COLOR} from "./config";

/* Enable dotenv */
dotenv.config()
/* Create a new App */
const app = new App()

/* Load everything in global node object*/
app.loadGlobals()
/* Create the bot */
app.createDiscordClient()
/* Load discord commands */
app.loadDiscordCommands()
/* Load discord events */
app.loadDiscordEvents()
/* Load server events */
app.loadServerEvents()
/* Connect to MySQL server */
app.connectToMySQL()
/* Enable the client */
app.loginDiscordClient()
    .then(() => {
        /* Connect to game server */
        app.connectToServer()
        /* Listen to discord events */
        app.listenToDiscordEvents()
        /* Listen to server events */
        app.listenToServerEvents()
        /* Refresh information like stats */
        app.runRefreshInformationCycle()
    })
    .catch(() => {
        console.error(DISCORD_COLOR + "[ERROR] Unable to enable the discord client" + RESET_COLOR)
    })
