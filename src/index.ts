import * as dotenv from 'dotenv'
import App from './lib/app/App'

dotenv.config()
const app = new App()

/* Create the discord client and add it to the global.client global variable */
app.createDiscordClient(() => console.log(`Client ${global.client.user.tag} created`))

/* Load all the server events */
app.loadServerEvents()

/* Connect the discord client to the game server and listen for events */
app.connectToServer()

/* Listen to the server events */
app.listenToServerEvents()

/* Load all the discord events */
app.loadDiscordEvents()

/* Listen to events the discord client can trigger while connected */
app.listenToDiscordEvents()

/* Login the client into discord and let him listen to events */
app.loginDiscordClient()
