/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function createHTMLTagsMatchingFunction (
    str: string,
    expectsLowerCase?: boolean
): (key: string) => true | void {
    const map = Object.create(null)
    const list: string[] = str.split(',')
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? (val): any => map[val.toLowerCase()]
        : (val): any => map[val]
}


/**
 * Always return false.
 */
export const alwaysReturnsFalse = () => false
