export declare type WarningMessage = {
    msg: string;
    start?: number;
    end?: number;
};
export declare type ASTAttr = {
    name: string;
    value: any;
    dynamic?: boolean;
    start?: number;
    end?: number;
};
/**
 * - 0: FALSE - whole sub tree un-optimizable
 * - 1: FULL - whole sub tree optimizable
 * - 2: SELF - self optimizable but has some un-optimizable children
 * - 3: CHILDREN - self un-optimizable but have fully optimizable children
 * - 4: PARTIAL - self un-optimizable with some un-optimizable children
 */
export declare type SSROptimizability = 0 | 1 | 2 | 3 | 4;
export interface ASTModifiers {
    [key: string]: boolean;
}
export interface ASTIfCondition {
    exp: string | undefined;
    block: ASTElement;
}
export interface ASTElementHandler {
    value: string;
    params?: any[];
    modifiers: ASTModifiers | undefined;
}
export interface ASTElementHandlers {
    [key: string]: ASTElementHandler | ASTElementHandler[];
}
export interface ASTDirective {
    name: string;
    rawName: string;
    value: string;
    arg: string | undefined;
    modifiers: ASTModifiers | undefined;
}
export declare type ASTNode = ASTElement | ASTText | ASTExpression;
export interface ASTElement {
    type: 1;
    tag: string;
    attrsList: {
        name: string;
        value: any;
    }[];
    attrsMap: Record<string, any>;
    parent: ASTElement | undefined;
    children: ASTNode[];
    processed?: true;
    static?: boolean;
    staticRoot?: boolean;
    staticInFor?: boolean;
    staticProcessed?: boolean;
    hasBindings?: boolean;
    text?: string;
    attrs?: {
        name: string;
        value: any;
    }[];
    props?: {
        name: string;
        value: string;
    }[];
    plain?: boolean;
    pre?: true;
    ns?: string;
    component?: string;
    inlineTemplate?: true;
    transitionMode?: string | null;
    slotName?: string;
    slotTarget?: string;
    slotScope?: string;
    scopedSlots?: Record<string, ASTElement>;
    ref?: string;
    refInFor?: boolean;
    if?: string;
    ifProcessed?: boolean;
    elseif?: string;
    else?: true;
    ifConditions?: ASTIfCondition[];
    for?: string;
    forProcessed?: boolean;
    key?: string;
    alias?: string;
    iterator1?: string;
    iterator2?: string;
    staticClass?: string;
    classBinding?: string;
    staticStyle?: string;
    styleBinding?: string;
    events?: ASTElementHandlers;
    nativeEvents?: ASTElementHandlers;
    transition?: string | true;
    transitionOnAppear?: boolean;
    model?: {
        value: string;
        callback: string;
        expression: string;
    };
    directives?: ASTDirective[];
    forbidden?: true;
    once?: true;
    onceProcessed?: boolean;
    wrapData?: (code: string) => string;
    wrapListeners?: (code: string) => string;
    ssrOptimizability?: SSROptimizability;
    appendAsTree?: boolean;
}
export interface ASTExpression {
    type: 2;
    expression: string;
    text: string;
    tokens: (string | Record<string, any>)[];
    static?: boolean;
    ssrOptimizability?: SSROptimizability;
}
export interface ASTText {
    type: 3;
    text: string;
    static?: boolean;
    isComment?: boolean;
    ssrOptimizability?: SSROptimizability;
}
export interface SFCBlock {
    type: string;
    content: string;
    attrs: Record<string, string>;
    start?: number;
    end?: number;
    lang?: string;
    src?: string;
    scoped?: boolean;
    module?: string | boolean;
}
export interface SFCDescriptor {
    template: SFCBlock | undefined | null;
    script: SFCBlock | undefined | null;
    styles: SFCBlock[];
    customBlocks: SFCBlock[];
    errors?: any[];
}
