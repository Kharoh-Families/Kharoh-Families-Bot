export default class ServerRequest {
    public name: string
    public params: any
    public maxDelay: any

    constructor(name: string, params: any, maxDelay: number) {
        this.name = name
        this.params = params
        this.maxDelay = maxDelay
    }

    static generateRandomResponseToken(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    public sendRequest() {
        const token = ServerRequest.generateRandomResponseToken()
        global.server.emit(this.name, token, this.params)

        return new Promise((resolve, reject) => {
            /* If the server sends the response */
            global.server.on('response' + token, (data: any) => {
                resolve(data)
                global.server.removeListener('response' + token)
            })

            /* If the server does not send the response */
            setTimeout(reject, this.maxDelay)
        })
    }
}