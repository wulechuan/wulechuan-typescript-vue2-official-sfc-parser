# Vue 2.x Official Single-filed Component (SFC) Parser That's Extracted

<link rel="stylesheet" href="../node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">

## Multilingual Editions of this Article

- 《[本文之简体中文版](../ReadMe.md)》




## NPM Page

<dl>
<dt>NPM Name</dt>
<dd>

[@wulechuan/vue2-official-sfc-parser](https://www.npmjs.com/package/@wulechuan/vue2-official-sfc-parser)

</dd>
<dt>Reviser</dt>
<dd><p>wulechuan (南昌吴乐川)</p></dd>
</dl>





## Introduction

### What is it

This tools is extracted manually from the official source codes of Vue `v2.6.11`.

As we know, Vuejs allows so-called Sinlge-filed Component(SFC), to write markups (`<template>`), JavaScritp codes (`<script>`) and CSS codes (`<style>`) all together within a single file. And the said file by default takes `.vue` as its file extension. This tool parses the content string for a `.vue` file, and outputs an object, containing all parts separately. Thus you get pure markups, pure javascript codes, pure CSS codes, or even pure customized codes if any.


Simply put, this tool tears a `.vue` file apart, and provides all parts under a single object, so that other JavaScript codes and make use of these parts separately.


### Why should this tool exist

-   Maybe we need to extract only the Stylus codes within a given `.vue` file, and then compile these Stylus codes into CSS codes.

-   Or say we are writting a Vue component as a lib, but we choose to write this component in TypeScript instead of JavaScript. When a project of pure JavaScript needs to make use of the lib written by us, that project might have difficulties to import out `.vue` file of TypeScript directly. So, as the author of the lib, we should provide a JavaScript version of our `.vue` file. This is a nice example that my tool play a role. You write your `.vue` lib component in TypeScript, then you design a simple tool chain to convert the TypeScript version into a JavaScript version. Then obviously my tool can help you build your tool chain.


### Modifications over Original Codes

To satisfy the eslint, I do modified the orginal codes a bit.

Such as, change all

```ts
let a, b
```

into

```ts
let a
let b
```



Additionally, I've also changed some function names.




## Usage

### Installation

```sh
npm  i  @wulechuan/vue2-official-sfc-parser
```

### Notice

This tool accept no file path string, but a file content string. So the codes for reading a file should write separately. This design makes this tool a bit more flexible.


### An Example

```js
import { readFile } from 'fs-extra'
import { vueSFCParser } from '@wulechuan/vue2-official-sfc-parser'

test2('./测试集/testing-source-2.vue')

async function test2(testingSourceFilePath) {
    const vueFileRawContent = await readFile(testingSourceFilePath, 'utf8')
    const vueFileContentString = vueFileRawContent.toString()
    console.log(vueSFCParser(vueFileContentString))
}
```


### API

This tool provides the only function named `vueSFCParser`. The signature of the said function is:

```ts
function vueSFCParser (
    content: string,
    options?: ParseComponentOptions
): SFCDescriptor
```



The involved Official Types:

```ts
interface SFCBlock {
    type: string;
    content: string; // Content of a single part. It could be JavaScript codes, markup codes, or CSS codes, etc.
    attrs: Record<string, string>;
    start?: number;
    end?: number;
    lang?: string; // The language of the given part. It could be 'ts', 'stylus', etc.
    src?: string;
    scoped?: boolean;
    module?: string | boolean;
}

interface SFCDescriptor {
    template: SFCBlock | undefined | null;
    script: SFCBlock | undefined | null;
    styles: SFCBlock[];
    customBlocks: SFCBlock[];
    errors?: any[];
}

type ParseComponentOptions = {
    outputSourceRange?: any;
    pad?: any;      // TODO To avoid use 'any' here, further investigations are required.
    deindent?: any; // TODO To avoid use 'any' here, further investigations are required.
};
```



---

## TODOs

- Fine tune the `ParseComponentOptions` type.



