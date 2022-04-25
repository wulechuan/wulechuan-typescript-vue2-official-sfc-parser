/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export declare function createHTMLTagsMatchingFunction(str: string, expectsLowerCase?: boolean): (key: string) => true | void;
/**
 * Always return false.
 */
export declare const alwaysReturnsFalse: () => boolean
