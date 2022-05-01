import * as path from "path";
import {DISCORD_COLOR, RESET_COLOR} from "../../../config";
import loadModules from "../../utils/loadModules";

export default function loadDiscordCommands() {
    /* The number of loaded files */
    let loaded: number = 0
    /* The path of the directory */
    const directoryPath = path.join(__dirname, '../../events/commands')
    /* Load the modules */
    for (const module of loadModules(directoryPath)) {
        /* Save the module default function in the commands */
        global.commands[module.name] = module.content
        /* Log the module */
        console.info(`[INFO] Loaded Discord command ${module.name}`)
        /* Add 1 to the loaded files */
        loaded++
    }
    /* Log the number of files loaded */
    console.info(DISCORD_COLOR + `[INFO] Loaded ${loaded} Discord commands` + RESET_COLOR)
}