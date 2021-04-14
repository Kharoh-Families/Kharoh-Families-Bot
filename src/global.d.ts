import { Client } from "discord.js";

declare global {
  namespace NodeJS {
    interface Global {
      client: Client
      server: SocketIOClient.Socket
    }
  }
}
