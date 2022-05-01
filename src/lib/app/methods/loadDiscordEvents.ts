import Event from "../../classes/Event";
import {DISCORD_COLOR, RESET_COLOR} from "../../../config";
import path from "path";
import loadModules from "../../utils/loadModules";

export default function loadDiscordEvents() {
    /* The number of loaded files */
    let loaded: number = 0
    /* The path of the directory */
    const directoryPath = path.join(__dirname, '../../events/discord')
    /* Load the modules */
    for (const module of loadModules(directoryPath)) {
        /* Save the module default function in the events */
        this.discordEvents[module.name] = new Event(module.name, module.content)
        /* Log the module */
        console.info(`[INFO] Loaded Discord event ${module.name}`)
        /* Add 1 to the loaded files */
        loaded++
    }
    /* Log the number of files loaded */
    console.info(DISCORD_COLOR + `[INFO] Loaded ${loaded} Discord events` + RESET_COLOR)
}