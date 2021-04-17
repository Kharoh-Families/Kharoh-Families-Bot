class ServerRequest {
  public name: string
  public params: any
  public maxDelay: any

  constructor({ name, params, maxDelay }: ServerRequestParams) {
    this.name = name
    this.params = params
    this.maxDelay = maxDelay
  }

  static generateRandomResponseToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  public sendRequest() {
    const responseToken = ServerRequest.generateRandomResponseToken()
    global.server.emit(this.name, responseToken, this.params)

    return new Promise((resolve, reject) => {
      /* If the server sends the response */
      global.server.on('response' + responseToken, (...responseData: any) => {
        resolve(responseData)
        global.server.removeListener('response' + responseToken)
      })

      /* If the server does not send the response */
      setTimeout(reject, this.maxDelay)
    })
  }
}

export interface ServerRequestParams {
  name: string
  params: any
  maxDelay: number
}

export default ServerRequest
