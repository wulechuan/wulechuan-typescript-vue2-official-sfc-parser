'use strict'
/**
 * Not type-checking this file because it's mostly vendor code.
 */
exports.__esModule = true
/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson (MPL-1.1 OR Apache-2.0 OR GPL-2.0-or-later)
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */
var vue_shared_util_1 = require('./vue-shared-util')
var vue_platform_web_compiler_util_1 = require('./vue-platform-web-compiler-util')
var vue_core_util_lang_1 = require('./vue-core-util-lang')
// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
var ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z' + vue_core_util_lang_1.unicodeRegExp.source + ']*'
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')'
var startTagOpen = new RegExp('^<' + qnameCapture)
var startTagClose = /^\s*(\/?)>/
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>')
var doctype = /^<!DOCTYPE [^>]+>/i
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!--/
var conditionalComment = /^<!\[/
// Special Elements (can contain anything)
exports.isPlainTextElement = vue_shared_util_1.createHTMLTagsMatchingFunction('script,style,textarea', true)
var reCache = {}
var decodingMap = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&amp;': '&',
    '&#10;': '\n',
    '&#9;': '\t',
    '&#39;': '\'',
}
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g
// #5992
var isIgnoreNewlineTag = vue_shared_util_1.createHTMLTagsMatchingFunction('pre,textarea', true)
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n' }
function decodeAttr(value, shouldDecodeNewlines) {
    var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr
    return value.replace(re, function (match) { return decodingMap[match] })
}
function parseHTML(html, options) {
    var stack = []
    var {expectHTML} = options
    var isUnaryTag = options.isUnaryTag || vue_shared_util_1.alwaysReturnsFalse
    var canBeLeftOpenTag = options.canBeLeftOpenTag || vue_shared_util_1.alwaysReturnsFalse
    var index = 0
    var last
    var lastTag
    var _loop_1 = function () {
        last = html
        // Make sure we're not in a plaintext content element like script/style
        if (!lastTag || !exports.isPlainTextElement(lastTag)) {
            var textEnd = html.indexOf('<')
            if (textEnd === 0) {
                // Comment:
                if (comment.test(html)) {
                    var commentEnd = html.indexOf('-->')
                    if (commentEnd >= 0) {
                        if (options.shouldKeepComment) {
                            options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
                        }
                        advance(commentEnd + 3)
                        return 'continue'
                    }
                }
                // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
                if (conditionalComment.test(html)) {
                    var conditionalEnd = html.indexOf(']>')
                    if (conditionalEnd >= 0) {
                        advance(conditionalEnd + 2)
                        return 'continue'
                    }
                }
                // Doctype:
                var doctypeMatch = html.match(doctype)
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length)
                    return 'continue'
                }
                // End tag:
                var endTagMatch = html.match(endTag)
                if (endTagMatch) {
                    var curIndex = index
                    advance(endTagMatch[0].length)
                    parseEndTag(endTagMatch[1], curIndex, index)
                    return 'continue'
                }
                // Start tag:
                var startTagMatch = parseStartTag()
                if (startTagMatch) {
                    handleStartTag(startTagMatch)
                    if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
                        advance(1)
                    }
                    return 'continue'
                }
            }
            var text = void 0
            var rest = void 0
            var next = void 0
            if (textEnd >= 0) {
                rest = html.slice(textEnd)
                while (!endTag.test(rest) &&
                    !startTagOpen.test(rest) &&
                    !comment.test(rest) &&
                    !conditionalComment.test(rest)) {
                    // < in plain text, be forgiving and treat it as text
                    next = rest.indexOf('<', 1)
                    if (next < 0)
                        break
                    textEnd += next
                    rest = html.slice(textEnd)
                }
                text = html.substring(0, textEnd)
            }
            if (textEnd < 0) {
                text = html
            }
            if (text) {
                advance(text.length)
            }
            if (options.chars && text) {
                options.chars(text, index - text.length, index)
            }
        }
        else {
            var endTagLength_1 = 0
            var stackedTag_1 = lastTag.toLowerCase()
            var reStackedTag = reCache[stackedTag_1] || (reCache[stackedTag_1] = new RegExp('([\\s\\S]*?)(</' + stackedTag_1 + '[^>]*>)', 'i'))
            var rest1 = html.replace(reStackedTag, function (all, text, endTag) {
                endTagLength_1 = endTag.length
                if (!exports.isPlainTextElement(stackedTag_1) && stackedTag_1 !== 'noscript') {
                    text = text
                        .replace(/<!--([\s\S]*?)-->/g, '$1') // #7298
                        .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1')
                }
                if (shouldIgnoreFirstNewline(stackedTag_1, text)) {
                    text = text.slice(1)
                }
                if (options.chars) {
                    options.chars(text)
                }
                return ''
            })
            index += html.length - rest1.length
            html = rest1
            parseEndTag(stackedTag_1, index - endTagLength_1, index)
        }
        if (html === last) {
            if (options.chars) {
                options.chars(html)
            }
            if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
                options.warn('Mal-formatted tag at end of template: "' + html + '"', { start: index + html.length })
            }
            return 'break'
        }
    }
    while (html) {
        var state_1 = _loop_1()
        if (state_1 === 'break')
            break
    }
    // Clean up any remaining tags
    parseEndTag()
    function advance(n) {
        index += n
        html = html.substring(n)
    }
    function parseStartTag() {
        var start = html.match(startTagOpen)
        if (start) {
            var match = {
                tagName: start[1],
                attrs: [],
                start: index,
            }
            advance(start[0].length)
            var end = void 0
            var attr
            // tslint:disable-next-line no-conditional-assignment
            = void 0
            // tslint:disable-next-line no-conditional-assignment
            while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
                attr.start = index
                advance(attr[0].length)
                attr.end = index
                match.attrs.push(attr)
            }
            if (end) {
                match.unarySlash = end[1]
                advance(end[0].length)
                match.end = index
                return match
            }
        }
    }
    function handleStartTag(match) {
        var {tagName} = match
        var {unarySlash} = match
        if (expectHTML) {
            if (lastTag === 'p' && vue_platform_web_compiler_util_1.isNonPhrasingTag(tagName)) {
                parseEndTag(lastTag)
            }
            if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
                parseEndTag(tagName)
            }
        }
        var unary = isUnaryTag(tagName) || !!unarySlash
        var l = match.attrs.length
        var attrs = new Array(l)
        for (var i = 0; i < l; i++) {
            var args = match.attrs[i]
            var value = args[3] || args[4] || args[5] || ''
            var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
                ? options.shouldDecodeNewlinesForHref
                : options.shouldDecodeNewlines
            attrs[i] = {
                name: args[1],
                value: decodeAttr(value, shouldDecodeNewlines),
            }
            if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
                attrs[i].start = args.start + args[0].match(/^\s*/).length
                attrs[i].end = args.end
            }
        }
        if (!unary) {
            stack.push({
                tag: tagName,
                lowerCasedTag: tagName.toLowerCase(),
                attrs: attrs,
                start: match.start,
                end: match.end,
            })
            lastTag = tagName
        }
        if (options.start) {
            options.start(tagName, attrs, unary, match.start, match.end)
        }
    }
    function parseEndTag(tagName, start, end) {
        var pos
        var lowerCasedTagName
        if (start == null)
            start = index
        if (end == null)
            end = index
        // Find the closest opened tag of the same type
        if (tagName) {
            lowerCasedTagName = tagName.toLowerCase()
            for (pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos].lowerCasedTag === lowerCasedTagName) {
                    break
                }
            }
        }
        else {
            // If no tag name is provided, clean shop
            pos = 0
        }
        if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
                if (process.env.NODE_ENV !== 'production' &&
                    (i > pos || !tagName) &&
                    options.warn) {
                    options.warn('tag <' + stack[i].tag + '> has no matching end tag.', { start: stack[i].start, end: stack[i].end })
                }
                if (options.end) {
                    options.end(stack[i].tag, start, end)
                }
            }
            // Remove the open elements from the stack
            stack.length = pos
            lastTag = pos && stack[pos - 1].tag
        }
        else if (lowerCasedTagName === 'br') {
            if (options.start) {
                options.start(tagName, [], true, start, end)
            }
        }
        else if (lowerCasedTagName === 'p') {
            if (options.start) {
                options.start(tagName, [], false, start, end)
            }
            if (options.end) {
                options.end(tagName, start, end)
            }
        }
    }
}
exports.parseHTML = parseHTML
