# 从 Vue 2.x 官方代码中提取出来的单文件组件拆分器

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/dist/css/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- [English version of this ReadMe](./documents/ReadMe.en-US.md)




## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/vue2-official-sfc-parser](https://www.npmjs.com/package/@wulechuan/vue2-official-sfc-parser)

</dd>
<dt>整理者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>





## 简介

### 来源及功用

本工具之代码系由本人手工提取自 Vue `v2.6.11` 之官方源代码，而后整理而成。提取出的这些代码之功能如下：

-   将一个 Vue 【单文件组件】（即“single-filed-component”，扩展名往往为 `.vue` ）之内容字符串中的唯一的【根 `<template>`】、唯一的【`<script>`】、所有的【`<style>`】， 以及任何自定义部分，逐一干净的分离。分离出的多个片段全部存放在一个对象中，并返回该对象。

我们不妨将纯净的 `<template>` 中的代码、纯净的 `<script>` 中的代码，以及纯净的 `<style>` 中的代码，统称为鄙人所谓“**单品类代码**”。

**简而言之，本工具将 `.vue` 文件之内容拆分成一个对象（Object），该对象中存放着各个单品类代码，供其他程序采用。**


### 存在意义

此举之意义是，令其他代码可以方便的将 `.vue` 文件中的各个部分分别处理。例如：

-   我们可以自行编写工具，将原始 `.vue` 文件中的 Stylus 代码编译成 CSS 代码，并单独存放成 `.css` 文件。

-   又或者，我们可以将原始 `.vue` 文件中的 TypeScript 转译为 JavaScript，并将 Sass 编译成 CSS。然后将 JavaScript 和 CSS，连同原封未动的 template 部分，拼合为一个新的 `.vue` 文件，存放在磁盘上。这在采用 TypeScript 自行编写独立的 Vue 组件，并欲发布成 JavaScript 可以直接使用的代码时，是非常必要之举。我们采用 TypeScript 直接编写 `.vue` 文件，但他人的纯 JavaScript 代码可能并未配置 TypeScript 相关的工具链，因而无法直接采用我们编写的 `.vue`。如此，我们须另行提供 JavaScript 版本的 `.vue` 文件。此时，为精准将我们编写的原始 `.vue` 中的 TypeScript 代码提取出来以便之后转译，就要用到本工具。


### 修订

为满足 eslint，本人对原始代码做了少数几处不改变执行逻辑的修订。

例如，将类似

```ts
let a, b
```

之写法，统统改为

```ts
let a
let b
```

之形式。

另外，本人也重命名了一些工具函数。




## 用法

### 安装

```sh
npm  i  @wulechuan/vue2-official-sfc-parser
```

### 注意事项

本工具接受的输入**并非**文件路径字符串，而是文件内容字符串。因此，读取文件之操作须另行编写。如此设计，自然是为了令本工具拥有更佳的通用性。

### 具体示例

```js
import { readFile } from 'fs-extra'
import { vueSFCParser } from '@wulechuan/vue2-official-sfc-parser'

test2('./tests/testing-source-2.vue')

async function test2(testingSourceFilePath) {
    const vueFileRawContent = await readFile(testingSourceFilePath, 'utf8')
    const vueFileContentString = vueFileRawContent.toString()
    console.log(vueSFCParser(vueFileContentString))
}
```


### 应用编程接口（所谓 API）

该工具提供唯一的函数，名为 `vueSFCParser`。该函数之签名（signature）如下：

```ts
function vueSFCParser (
    content: string,
    options?: ParseComponentOptions
): SFCDescriptor
```



以下是上述函数签名所涉及的、官方给出的类型定义。

```ts
interface SFCBlock {
    type: string;
    content: string; // 分离出的单品类代码。
    attrs: Record<string, string>;
    start?: number;
    end?: number;
    lang?: string; // 该品类之语言类型，例如 ts、sass、stylus 等。
    src?: string;
    scoped?: boolean;
    module?: string | boolean;
}

interface SFCDescriptor {
    template: SFCBlock | undefined | null; // 其中 null 系由本人补充之条目。
    script: SFCBlock | undefined | null;   // 其中 null 系由本人补充之条目。
    styles: SFCBlock[];
    customBlocks: SFCBlock[];
    errors?: any[]; // 系由本人补充之条目。
}

type ParseComponentOptions = {
    outputSourceRange?: any;
    pad?: any;      // TODO 不敢冒然配为 string，遂暂定为 any。
    deindent?: any; // TODO 不敢冒然配为 string，遂暂定为 any。
};
```



---

## 未来计划

暂无。



