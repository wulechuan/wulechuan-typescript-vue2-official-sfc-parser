import { SFCDescriptor } from './types'
/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 */
declare type ParseComponentOptions = {
    outputSourceRange?: any;
    pad?: any;
    deindent?: any;
};
export declare function vueSFCParser(content: string, options?: ParseComponentOptions): SFCDescriptor;
export {}
