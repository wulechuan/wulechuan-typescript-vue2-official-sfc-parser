/*
  eslint
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-unused-vars": 0,
*/

import { parseHTML } from './dependencies/vue-compiler-html-parser'
import { createHTMLTagsMatchingFunction } from './dependencies/vue-shared-util'

import {
    WarningMessage,
    SFCDescriptor,
    SFCBlock,
    ASTAttr,
} from './types'

const deindent = require('de-indent')

const splitRE = /\r?\n/g
const replaceRE = /./g
const isSpecialTag = createHTMLTagsMatchingFunction(
    'script,style,template', true
)

/**
 * Parse a single-file component (*.vue) file into an SFC Descriptor Object.
 */
type ParseComponentOptions = {
    outputSourceRange?: any;
    pad?: any;
    deindent?: any;
};

export function vueSFCParser (
    content: string,
    options?: ParseComponentOptions
): SFCDescriptor {
    options = options || {}

    const sfc: SFCDescriptor = {
        template: null,
        script: null,
        styles: [],
        customBlocks: [],
        errors: [],
    }
    let depth = 0
    let currentBlock: SFCBlock | null = null

    let warn = (msg: any, range?: any) => {
        sfc.errors!.push(msg) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }

    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        warn = (msg, range) => {
            const data: WarningMessage = { msg }
            if (range.start != null) {
                data.start = range.start
            }
            if (range.end != null) {
                data.end = range.end
            }
            sfc.errors!.push(data) // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }
    }

    function start (
        tag: string,
        attrs: ASTAttr[],
        unary: boolean,
        start: number,
        end: number
    ) {
        if (depth === 0) {
            currentBlock = {
                type: tag,
                content: '',
                start: end,
                attrs: attrs.reduce((cumulated, { name, value }) => {
                    cumulated[name] = value || true
                    return cumulated
                }, {}),
            }
            if (isSpecialTag(tag)) {
                checkAttrs(currentBlock, attrs)
                if (tag === 'style') {
                    sfc.styles.push(currentBlock)
                } else {
                    sfc[tag] = currentBlock
                }
            } else { // custom blocks
                sfc.customBlocks.push(currentBlock)
            }
        }
        if (!unary) {
            depth++
        }
    }

    function checkAttrs (block: SFCBlock, attrs: ASTAttr[]) {
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i]
            if (attr.name === 'lang') {
                block.lang = attr.value
            }
            if (attr.name === 'scoped') {
                block.scoped = true
            }
            if (attr.name === 'module') {
                block.module = attr.value || true
            }
            if (attr.name === 'src') {
                block.src = attr.value
            }
        }
    }

    function end (tag: string, start: number) {
        if (depth === 1 && currentBlock) {
            currentBlock.end = start
            let text = content.slice(currentBlock.start, currentBlock.end)
            if (options!.deindent !== false) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
                text = deindent(text)
            }
            // pad content so that linters and pre-processors can output correct
            // line numbers in errors and warnings
            if (currentBlock.type !== 'template' && options!.pad) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
                text = padContent(currentBlock, options!.pad) + text // eslint-disable-line @typescript-eslint/no-non-null-assertion
            }
            currentBlock.content = text
            currentBlock = null
        }
        depth--
    }

    function padContent (block: SFCBlock, pad: true | 'line' | 'space') {
        if (pad === 'space') {
            return content.slice(0, block.start).replace(replaceRE, ' ')
        } else {
            const offset = content.slice(0, block.start).split(splitRE).length
            const padChar = block.type === 'script' && !block.lang
                ? '//\n'
                : '\n'
            return Array(offset).join(padChar)
        }
    }

    parseHTML(content, {
        warn,
        start,
        end,
        outputSourceRange: options.outputSourceRange,
    })

    return sfc
}
