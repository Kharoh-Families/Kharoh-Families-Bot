class Formatter {
  static formatArgs(args: string[]): any[] {
    const finalArgs = []

    for (const arg of args) {
      const [argType, argValue] = arg.split('|')

      if (!argValue) {
        finalArgs.push(argType) // argType will in fact be the value if nothing is specified and we store it as a string
        continue
      }

      switch (argType) {
        case 'string':
          finalArgs.push(argValue)
          break;
        case 'number':
          finalArgs.push(parseInt(argValue, 10))
          break;
        case 'json':
          finalArgs.push(JSON.parse(argValue))
          break;
        default:
          throw new Error(`${argType} does not exist in types : string, number, json`)
      }
    }

    return finalArgs
  }
}

export default Formatter
