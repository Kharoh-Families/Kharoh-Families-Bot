import Event from "../../classes/Event";
import {RESET_COLOR, SERVER_COLOR} from "../../../config";
import path from "path";
import loadModules from "../../utils/loadModules";

export default function loadServerEvents() {
    /* The number of loaded files */
    let loaded: number = 0
    /* The path of the directory */
    const directoryPath = path.join(__dirname, '../../events/server')
    /* Load the modules */
    for (const module of loadModules(directoryPath)) {
        /* Save the module default function in the events */
        this.serverEvents[module.name] = new Event(module.name, module.content)
        /* Log the module */
        console.info(`[INFO] Loaded server event ${module.name}`)
        /* Add 1 to the loaded files */
        loaded++
    }
    /* Log the number of files loaded */
    console.info(SERVER_COLOR + `[INFO] Loaded ${loaded} server events` + RESET_COLOR)
}