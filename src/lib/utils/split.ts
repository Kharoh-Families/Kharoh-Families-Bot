export default function split(string: string, maxCharacters: number = 1450): string[] {
    /* This array will store the strings */
    const array: string[] = []
    /* If the string is short, return it without touching it */
    if (string.length <= maxCharacters) {
        array.push(string)
        return array
    }
    /* Get the last line jump in the first characters */
    const jump = string.substring(0, maxCharacters).lastIndexOf("\n")
    /* Push it into the array and call the function for the rest */
    array.push(string.substring(0, jump), ...split(string.substring(jump)))
    /* Return the array */
    return array
}