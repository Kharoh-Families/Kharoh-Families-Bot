import {Message} from "discord.js";
import Command from "../../classes/Command";

export default new Command({
    name: 'joke',
    title: 'Blague',
    desc: "Une blague pour se mettre de bonne humeur ! (Ou pas, d'ailleurs...)",
    aliases: ['blague'],
    permissions: ['everyone'],
    template: "joke",

    exec: (message: Message, ...args: any[]) => {
        const jokes = [
            'C\'est l\'histoire d\'un homme, qui rentre dans un bar. Il hurle "C\'est moi !", mais en fait, c\'était pas lui...',
            'Dans la phrase « le voleur a volé une télévision », où est le sujet ? En prison !',
            'Avez-vous entendu parler des deux personnes qui ont volé un calendrier ? Ils ont pris chacun six mois.',
            'Un volcan s\'installe à côté d\'une colline : Ça te dérange si je fume ?',
            '– Maman, c\'est quoi de la lingerie coquine ? – De la « hot » couture !',
            'Comment appelle-t-on un hamster dans l\'espace ? Un hamsteroïde.',
            'Deux asticots se retrouvent dans une pomme : « Je ne savais pas que vous habitiez dans ce quartier ! »',
            'Un astronaute qui commet un crime dans l\'espace sera-t-il puni ? Non car il s\'agit d\'un crime sans gravité.',
            'Comment se nomme l\'oiseau qui se gratte d\'un seul coté? Un oiseau mi-gratteur.',
            'Comment appelle-t-on le Comte Dracula ? Mon saigneur.',
            'Qu\'est ce qui est jaune et qui attend ? UN POUSSIN DEVANT UN BROYEUR !!'
        ]

        /* Randomly choose a joke */
        const joke = jokes[Math.floor(Math.random() * jokes.length)]
        /* Send it */
        message.reply(`😂 ${joke}`)
    }
})
