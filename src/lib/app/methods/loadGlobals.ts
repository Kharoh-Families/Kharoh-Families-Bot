import {DISCORD_COLOR, RESET_COLOR} from "../../../config";

export default function loadGlobals() {
    global.app = this
    global.client = undefined
    global.server = undefined
    global.mysql = undefined
    global.commands = {}

    console.log(DISCORD_COLOR + "[INFO] Loaded global variables" + RESET_COLOR)
}