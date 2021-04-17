import { Client } from "discord.js";
import Config from "./assets/Config/Config";
import Command from "./lib/classes/Command/Command";
import Event from "./lib/classes/Event/Event";
import ServerRequest from "./lib/classes/ServerRequest/ServerRequest";
import Utils from "./lib/classes/Utils/Utils";

declare global {
  namespace NodeJS {
    interface Global {
      client: Client
      server: SocketIOClient.Socket
      assets: Assets
      commands: { [command: string]: Command }
    }
  }
}

export interface Assets {
  Event: typeof Event
  Command: typeof Command
  ServerRequest: typeof ServerRequest
  Utils: typeof Utils

  config: Config
}
