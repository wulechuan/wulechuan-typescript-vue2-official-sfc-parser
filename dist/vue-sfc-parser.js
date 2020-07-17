'use strict'
/*
  eslint
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-unused-vars": 0,
*/
exports.__esModule = true
exports.vueSFCParser = void 0
var vue_compiler_html_parser_1 = require('./dependencies/vue-compiler-html-parser')
var vue_shared_util_1 = require('./dependencies/vue-shared-util')
var deindent = require('de-indent')
var splitRE = /\r?\n/g
var replaceRE = /./g
var isSpecialTag = vue_shared_util_1.createHTMLTagsMatchingFunction('script,style,template', true)
function vueSFCParser(content, options) {
    options = options || {}
    var sfc = {
        template: null,
        script: null,
        styles: [],
        customBlocks: [],
        errors: [],
    }
    var depth = 0
    var currentBlock = null
    var warn = function (msg, range) {
        sfc.errors.push(msg) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
        warn = function (msg, range) {
            var data = { msg: msg }
            if (range.start != null) {
                data.start = range.start
            }
            if (range.end != null) {
                data.end = range.end
            }
            sfc.errors.push(data) // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }
    }
    function start(tag, attrs, unary, start, end) {
        if (depth === 0) {
            currentBlock = {
                type: tag,
                content: '',
                start: end,
                attrs: attrs.reduce(function (cumulated, _a) {
                    var {name} = _a, {value} = _a
                    cumulated[name] = value || true
                    return cumulated
                }, {}),
            }
            if (isSpecialTag(tag)) {
                checkAttrs(currentBlock, attrs)
                if (tag === 'style') {
                    sfc.styles.push(currentBlock)
                }
                else {
                    sfc[tag] = currentBlock
                }
            }
            else { // custom blocks
                sfc.customBlocks.push(currentBlock)
            }
        }
        if (!unary) {
            depth++
        }
    }
    function checkAttrs(block, attrs) {
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i]
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
    function end(tag, start) {
        if (depth === 1 && currentBlock) {
            currentBlock.end = start
            var text = content.slice(currentBlock.start, currentBlock.end)
            if (options.deindent !== false) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
                text = deindent(text)
            }
            // pad content so that linters and pre-processors can output correct
            // line numbers in errors and warnings
            if (currentBlock.type !== 'template' && options.pad) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
                text = padContent(currentBlock, options.pad) + text // eslint-disable-line @typescript-eslint/no-non-null-assertion
            }
            currentBlock.content = text
            currentBlock = null
        }
        depth--
    }
    function padContent(block, pad) {
        if (pad === 'space') {
            return content.slice(0, block.start).replace(replaceRE, ' ')
        }
        else {
            var offset = content.slice(0, block.start).split(splitRE).length
            var padChar = block.type === 'script' && !block.lang
                ? '//\n'
                : '\n'
            return Array(offset).join(padChar)
        }
    }
    vue_compiler_html_parser_1.parseHTML(content, {
        warn: warn,
        start: start,
        end: end,
        outputSourceRange: options.outputSourceRange,
    })
    return sfc
}
exports.vueSFCParser = vueSFCParser
