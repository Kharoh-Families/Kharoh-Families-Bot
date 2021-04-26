import { Message } from "discord.js";
import Command from "../../classes/Command/Command";

export default new Command({
  name: 'Connaître le nombre de points des familles',
  desc: "Permet de connaître le nombre de points de chaque famille sur le jeu des Kharoh Families.",
  aliases: [],
  permissions: ['everyone'],
  template: "!points [FAMILY_NAME]",

  exec: async (message: Message, ...args: string[]) => {
    const familyNameArg: string = args[0]
    const familyNames = ['pink', 'blue', 'yellow', 'green']

    if (familyNameArg) {
      if (!familyNames.includes(familyNameArg.toLowerCase())) throw new Error('Nom de famille invalide e.g. pink blue yellow green')
      const familyPoints = { realPointsNumber: 0, number: 0, pointsMultiplier: 0 }

      for (const key in familyPoints) {
        familyPoints[key] = await new global.assets.ServerRequest({ name: 'getFamilyInfo', params: { familyName: familyNameArg, path: `points.${key}` }, maxDelay: 10000 }).sendRequest()
      }

      return message.reply(`Points : ${familyPoints.number} * Multiplicateur : ${familyPoints.pointsMultiplier} = Points réels : ${familyPoints.realPointsNumber}`)
    }

    const familyPointsList: any = {}

    for (const familyName of familyNames) {
      const familyPoints = await new global.assets.ServerRequest({ name: 'getFamilyInfo', params: { familyName, path: 'points.realPointsNumber' }, maxDelay: 10000 }).sendRequest()
      familyPointsList[familyName] = familyPoints
    }

    message.reply(`
      Famille Rose : ${familyPointsList.pink}
      Famille Bleue : ${familyPointsList.blue}
      Famille Jaune : ${familyPointsList.yellow}
      Famille Verte : ${familyPointsList.green}
    `)
  }
})
