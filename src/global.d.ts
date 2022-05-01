import App from "./lib/app/App";
import {Client} from "discord.js";
import {Socket} from 'socket.io-client'
import {Connection} from "mysql2";
import Command from "./lib/classes/Command";

declare global {
    var app: App
    var client: Client
    var server: Socket
    var mysql: Connection
    var commands: { [command: string]: Command }
}