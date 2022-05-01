import fs from "fs";
import path from "path";

export default function loadModules(directory: string): Module[] {
    const modules = []
    for (const file of fs.readdirSync(directory)) {
        /* If the extension isn't allowed don't load it */
        if (!(file.endsWith('.js') || file.endsWith('.ts'))) continue
        /* The file path */
        const filePath = path.join(directory, file)
        /* Save the command name */
        const name = file.split('.')[0]
        /* Save the default export */
        const content = require(filePath).default
        /* Delete the module from the require cache */
        delete require.cache[require.resolve(filePath)]
        /* Add the module to the list */
        modules.push({name, content})
    }
    return modules
}

export interface Module {
    name: string
    content: any
}