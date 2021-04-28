import Discord from 'discord.js'
import socketIOClient from 'socket.io-client'
import fs from 'fs'
import assets from '../../assets/assets'

/**
 * The App class used to run the discord bot
 */
export default class App {

  /* Events the server can send through the global.server socket */
  public serverEvents: any = {}

  /* Events that the discord client will receive from discord while connected */
  public discordEvents: any = {}

  /**
   * Load the global variables in the global node object
   */
  public loadGlobals() {
    console.log('\x1b[36m' + `discord: loading global variables` + '\x1b[0m')

    global.client = undefined
    global.server = undefined
    global.assets = assets
    global.commands = {}

    console.log('\x1b[36m' + `discord: loaded global variables` + '\x1b[0m')
  }

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
    global.server = socketIOClient('http://localhost:3001', {
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
    console.log('\x1b[35m' + `server: loading server events` + '\x1b[0m')

    fs.readdirSync('./src/lib/events/server')
      .forEach(file => {
        const eventName = file.split('.')[0].split('_').reverse()[0]
        const event = new global.assets.Event(eventName, require(`../events/server/${file}`).default)
        this.serverEvents[eventName] = event

        console.log(`Loaded server ${file}`)
        delete require.cache[require.resolve(`../events/server/${file}`)]
      })

    console.log('\x1b[35m' + `server: loaded server events` + '\x1b[0m')
  }

  /**
   * Load the events that the discord client can trigger while connected
   */
  public loadDiscordEvents() {
    console.log('\x1b[36m' + `discord: loading discord events` + '\x1b[0m')

    fs.readdirSync('./src/lib/events/discord')
      .forEach(file => {
        const eventName = file.split('.')[0].split('_').reverse()[0]
        const event = new global.assets.Event(eventName, require(`../events/discord/${file}`).default)
        this.discordEvents[eventName] = event

        console.log(`Loaded discord ${file}`)
        delete require.cache[require.resolve(`../events/discord/${file}`)]
      })

    console.log('\x1b[36m' + `discord: loaded discord events` + '\x1b[0m')
  }

  public loadCommands() {
    console.log('\x1b[36m' + `discord: loading commands` + '\x1b[0m')

    fs.readdirSync('./src/lib/events/commands')
      .forEach(file => {
        const commandName = file.split('.')[0].split('_').reverse()[0]
        const command = require(`../events/commands/${file}`).default
        global.commands[commandName] = command

        console.log(`Loaded command ${file}`)
        delete require.cache[require.resolve(`../events/commands/${file}`)]
      })

    console.log('\x1b[36m' + `discord: loaded commands` + '\x1b[0m')
  }

  /**
   * Listen to server events
   */
  public listenToServerEvents() {
    /* Bind the server events to the socket */
    for (const eventName in this.serverEvents) {
      const event = this.serverEvents[eventName]
      global.server.on(eventName, event.run.bind(event))
    }
  }

  /**
   * Listen to discord client events
   */
  public listenToDiscordEvents() {
    /* Bind the discord events to the socket */
    for (const eventName in this.discordEvents) {
      const event = this.discordEvents[eventName]
      global.client.on(eventName, event.run.bind(event))
    }
  }

  public runRefreshInformationsCycle() {
    setInterval(this.refreshInformations, 120000)
  }

  private refreshInformations() {
    const params = { logIDs: false }
    const logPingsChannel = global.assets.config.mainGuild.channels.cache.get(global.assets.config.textChannelID['logsPings']) as Discord.TextChannel

    const pingRequest = new global.assets.ServerRequest({ name: 'pingServer', params: null, maxDelay: 10000 })
    const pingResponse = pingRequest.sendRequest()
    const currentTimestamp = Date.now()

    let ping = null

    pingResponse
      .then(() => {
        ping = (Date.now() - currentTimestamp) + 'ms'
        global.client.user.setStatus('online')
      })
      .catch(() => {
        ping = 'ERROR'
        global.client.user.setStatus('idle')
      })

    const playersRequest = new global.assets.ServerRequest({ name: 'getConnectedPlayers', params, maxDelay: 10000 })
    const playersResponse = playersRequest.sendRequest()

    let players = null

    playersResponse
      .then((responseData: any) => {
        const [{ playersList }] = responseData
        players = playersList.length
      })
      .catch(() => {
        players = 'ERROR'
      })

      logPingsChannel.send('[INFO] Un ping serveur a été effectué → ' + ping + 'ms | ' + players + ' joueurs.')

      if (ping != 'ERROR' && players != 'ERROR') global.client.user.setActivity('les ' + players + ' joueurs connectés !', { type: 'WATCHING' });
      else if (players == 'ERROR') global.client.user.setActivity('l\'impossibilité d\'actualiser les joueurs...', { type: 'WATCHING' });
  }

}
