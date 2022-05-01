import loadGlobals from "./methods/loadGlobals";
import connectToServer from "./methods/connectToServer";
import createDiscordClient from "./methods/createDiscordClient";
import loginDiscordClient from "./methods/loginDiscordClient";
import loadDiscordCommands from "./methods/loadDiscordCommands";
import loadDiscordEvents from "./methods/loadDiscordEvents";
import loadServerEvents from "./methods/loadServerEvents";
import listenToDiscordEvents from "./methods/listenToDiscordEvents";
import listenToServerEvents from "./methods/listenToServerEvents";
import refreshInformation from "./methods/refreshInformation";
import runRefreshInformationCycle from "./methods/runRefreshInformationCycle";
import {Guild} from "discord.js";
import {GUILD} from "../../config";
import connectToMySQL from "./methods/connectToMySQL";

export default class App {
    /**
     * Events the server can send through the global.server socket
     */
    public serverEvents: any = {}

    /**
     * Events that the discord client will receive from discord while connected
     */
    public discordEvents: any = {}

    /**
     * Load the global variables in the global node object
     */
    public loadGlobals: typeof loadGlobals = loadGlobals.bind(this)

    /**
     * Create the discord client and store it in global.client
     */
    public createDiscordClient: typeof createDiscordClient = createDiscordClient.bind(this)

    /**
     * Log the discord client in using the token
     */
    public loginDiscordClient: typeof loginDiscordClient = loginDiscordClient.bind(this)

    /**
     * Connect the discord client socket to the server and add the socket in global.server
     */
    public connectToServer: typeof connectToServer = connectToServer.bind(this)

    /**
     * Connect to MySQL server and save the connection in the global node object
     */
    public connectToMySQL: typeof connectToMySQL = connectToMySQL.bind(this)

    /**
     * Load the commands that the discord client can respond while connected
     */
    public loadDiscordCommands: typeof loadDiscordCommands = loadDiscordCommands.bind(this)

    /**
     * Load the events that the discord client can trigger while connected
     */
    public loadDiscordEvents: typeof loadDiscordEvents = loadDiscordEvents.bind(this)

    /**
     * Load the events that the server can trigger through the socket
     */
    public loadServerEvents: typeof loadServerEvents = loadServerEvents.bind(this)

    /**
     * Listen to discord client events
     */
    public listenToDiscordEvents: typeof listenToDiscordEvents = listenToDiscordEvents.bind(this)

    /**
     * Listen to server events
     */
    public listenToServerEvents: typeof listenToServerEvents = listenToServerEvents.bind(this)

    /**
     * Show ping to moderators and number of players connected regularly
     */
    public runRefreshInformationCycle: typeof runRefreshInformationCycle = runRefreshInformationCycle.bind(this)

    /**
     * Show ping to moderators and number of players connected
     */
    private refreshInformation: typeof refreshInformation = refreshInformation.bind(this)

    /**
     * Get the main guild of the bot
     */
    async getGuild(): Promise<Guild> {
        return await global.client.guilds.fetch(GUILD)
    }

}