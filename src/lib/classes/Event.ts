/**
 * Class used for websocket events
 */
export default class Event {
    /**
     * The name used for the event registration in the websocket
     */
    public name: string
    /**
     * The function to call when the event is called
     */
    public exec: (...args: any[]) => void

    constructor(name: string, exec: (...args: any[]) => void) {
        this.name = name
        this.exec = exec
    }

    /**
     * The method called when the event is called which call the exec event
     */
    run(...args: any[]): void {
        this.exec(...args)
    }
}