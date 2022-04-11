'use strict'
exports.__esModule = true
exports.alwaysReturnsFalse = exports.createHTMLTagsMatchingFunction = void 0
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function createHTMLTagsMatchingFunction(str, expectsLowerCase) {
    var map = Object.create(null)
    var list = str.split(',')
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase
        ? function (val) { return map[val.toLowerCase()] }
        : function (val) { return map[val] }
}
exports.createHTMLTagsMatchingFunction = createHTMLTagsMatchingFunction
/**
 * Always return false.
 */
var alwaysReturnsFalse = function () { return false }
exports.alwaysReturnsFalse = alwaysReturnsFalse
