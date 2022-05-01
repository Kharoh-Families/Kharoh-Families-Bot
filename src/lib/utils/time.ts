export default function time(string: string): number {
    try {
        string = string.toUpperCase()
        /* If it's a fixed time (millis timestamp) */
        if (string.startsWith('F')) {
            /* Just return the given timestamp */
            return parseInt(string.substring(1))
            /* If it's a relative time (in 30d for example) */
        } else if (string.startsWith('R')) {
            /* Will store the multiplier to make a timestamp */
            let multiplier: number
            switch (string.charAt(string.length - 1)) {
                /* If time is in seconds */
                case "S": {
                    multiplier = 1000
                    break
                }
                /* Or in minutes */
                case "M": {
                    multiplier = 60000
                    break
                }
                /* Or... In hours ! */
                case "H": {
                    multiplier = 3600000
                    break
                }
                /* In days ? */
                case "D": {
                    multiplier = 86400000
                    break
                }
                /* In weeks ! */
                case "W": {
                    multiplier = 604800000
                    break
                }
            }
            return parseInt(string.substring(1, string.length - 1)) * multiplier + Date.now()
        }
        /* Return undefined because we can't process it */
        return undefined
    } catch (error) {
        /* String was malformed, undefined too */
        return undefined
    }


}