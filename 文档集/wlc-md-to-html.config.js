/*
    参考（中文）：
        https://github.com/wulechuan/wulechuan-js-generate-html-via-markdown/blob/HEAD/ReadMe.md#%E5%85%A5%E5%8F%A3%E5%8F%82%E6%95%B0
    References (English):
        https://github.com/wulechuan/wulechuan-js-generate-html-via-markdown/blob/HEAD/ReadMe.en-US.md#arguments
*/
module.exports = {
    conversionOptions: {
        articleTOCBuildingHeadingLevelStartsFrom: 2,
        articleTOCListTagNameIsUL: true,
    },
    manipulationsOverHTML: {
        shouldNotReplaceLineBreaksInCodeTagsWithBrTags: false,
        desiredReplacementsInHTML: [
            {
                from: /\s+href="([^#\./].+)/gi,
                to:   ' target="_blank" href="$1',
            },
            {
                from: /\s+href="(.+)\.md(#.*)?"/gi,
                to:   ' href="$1.html$2"',
            },
            {
                from: /<link rel="stylesheet" href="(\.\/|(\.\.\/)+)node_modules\/@wulechuan\/css-stylus-markdown-themes\/dist\/css\/wulechuan-styles-for-html-via-markdown--vscode\.default\.min\.css">/gi,
                to:   '',
            },
        ],
        absolutePathsOfExtraFilesToEmbedIntoHTML: [],
    },
    behavioursOfBuiltInTOC: {
        atBeginingShouldExpandTOCWhenWindowIsWideEnough: false,
    },
    sundries: {
        shouldConsoleLogsInChinese: true,
        shouldDisableCachingForInternalThemeFiles: false,
        shouldDisableCachingForExternalFiles: false,
    },
}
