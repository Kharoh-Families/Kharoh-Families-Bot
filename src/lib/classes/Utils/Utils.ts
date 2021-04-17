class Utils {
  /**
   * Generate a random color of a family as an output
   */
  static getRandomFamilyColor(): string {
    const familyColors = ['#f3abfd', '#8bc3f7', '#f8ed93', '#f8ed93']
    return familyColors[Math.floor(Math.random() * familyColors.length)]
  }

  /**
   * Generate a random message of a done action
   */
  static getDoneRandomMessage(): string {
    const randomMessage = [
      'Voilà !',
      'Hop :D',
      'Facile :o',
      'Au suivant.',
      'C\'est tout ?',
    ]

    return randomMessage[Math.floor(Math.random() * randomMessage.length)]
  }
}

export default Utils
