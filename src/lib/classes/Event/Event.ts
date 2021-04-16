class Event {
  constructor(
    public name: string,
    public exec: (...args: any[]) => void
  ) { }

  run(...args: any[]): void {
    // try {
    this.exec(...args)
    // } catch (error) {
    //     console.error(new Error('Error handled in event ' + this.name + '\n' + error))
    // }
  }
}

export default Event
