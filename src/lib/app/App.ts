import Discord from 'discord.js'
import socketIOClient from 'socket.io-client'

/**
 * The App class used to run the discord bot
 */
export default class App {

  /* Events the server can send through the global.server socket */
  public serverEvents: any = {}

  /* Events that the discord client will receive from discord while connected */
  public discordEvents: any = {}


  /**
   * Create the discord client and store it in global.client
   */
  public createDiscordClient(callback?: (...args: any) => void) {
    console.log("\x1b[36m" + `discord: creating the client` + '\x1b[0m')

    global.client = new Discord.Client()
    global.client.on('ready', callback)

    console.log("\x1b[36m" + `discord: client created` + '\x1b[0m')
  }

  /**
   * Log the discord client in using the token
   */
  public loginDiscordClient() {
    console.log("\x1b[36m" + `discord: logging in the client` + '\x1b[0m')

    const token = process.env.TOKEN
    global.client.login(token)

    console.log("\x1b[36m" + `discord: client logged in` + '\x1b[0m')
  }

  /**
   * Connect the discord client socket to the server and add the socket in global.server 
   */
  public connectToServer() {
    console.log('\x1b[35m' + `server: connecting to the server` + '\x1b[0m')

    const token = process.env.SERVER_KEY
    global.server = socketIOClient('http://127.0.0.1:4001', {
      query: { token },
    })

    global.server.on('disconnect', () => {
      console.log('\x1b[35m' + `server: disconnected from the server` + '\x1b[0m')
    })

    global.server.on('reconnect_attempt', () => {
      console.log('\x1b[35m' + `server: trying to reconnect to the server` + '\x1b[0m')
    })

    global.server.on('reconnect', () => {
      console.log('\x1b[35m' + `server: successfully reconnected to the server` + '\x1b[0m')
    })

    console.log('\x1b[35m' + `server: connected to the server` + '\x1b[0m')
  }

  /**
   * Load the events that the server can trigger through the socket
   */
  public loadServerEvents() {
    // TODO
  }

  /**
   * Listen to server events
   */
  public listenToServerEvents() {
    // TODO
  }

  /**
   * Load the events that the discord client can trigger while connected
   */
  public loadDiscordEvents() {
    // TODO
  }

  /**
   * Listen to discord client events
   */
  public listenToDiscordEvents() {
    // TODO
  }
}
