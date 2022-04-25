/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export declare const unicodeRegExp: RegExp
/**
 * Check if a string starts with $ or _
 */
export declare function isReserved(str: string): boolean;
/**
 * Define a property.
 */
export declare function def(obj: Record<string, unknown>, key: string, val: any, enumerable?: boolean): void;
export declare function parsePath(path: string): any;
