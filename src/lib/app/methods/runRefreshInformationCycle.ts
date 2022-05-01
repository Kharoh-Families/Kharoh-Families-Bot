import {DISCORD_COLOR, REFRESH_INTERVAL, RESET_COLOR} from "../../../config";

export default function runRefreshInformationCycle() {
    /* Refresh information at the start of the bot */
    this.refreshInformation().then(() => {
        /* Generate a cycle called every {} seconds (configurable in config.ts) */
        setInterval(this.refreshInformation, REFRESH_INTERVAL)
    })

    /* Send an info message */
    console.info(DISCORD_COLOR + "[INFO] Started refresh information cycle" + RESET_COLOR)
}