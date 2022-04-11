# 从 Vue 2.x 官方代码中提取出来的单文件部件拆分器

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


> 中国人——特别是汉族人，理应坚持广泛、规范地使用汉语。凡非必要之情形不说外国话、不用外国字。此乃天经地义！然则每当必要，亦不排斥采用外国之语言。不妨 **博世界之学问，养中国之精神** 。
>
> 本人亦支持少数民族坚持采用自己民族的传统语言。仍须强调，凡中国人，皆应会用汉语、积极使用汉语，此乃中华各民族之大一统之必由。



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

### 此物之来源及功用

本工具之代码系由本人手工提取自 Vue `v2.6.11` 之官方源代码后整理而得。这些代码之功能如下：

-   将一个【Vue 单文件部件】（即“single-filed-component”，扩展名往往为 `.vue` ）之内容字符串中的：

    - 唯一的【根 `<template>`】、
    - 唯一的【`<script>`】、
    - 所有的【`<style>`】、
    - 以及所有的自定义部分，
    
    逐一分离，形成多个“纯净的”代码片段。
    
-   分离出的多个代码片段全部存放在一个对象中。
-   本工具对外界【返回】该对象。

我们不妨暂时约定将 `<template>` 中的纯净的代码、 `<script>` 中的纯净的代码，以及 `<style>` 中的纯净的代码等，统称为鄙人所谓“**单品类代码**”。

**简而言之，本工具将 `.vue` 文件之内容拆分成一个对象（Object），该对象中存放着各个单品类代码，供其他程序采用。**



### 为何要拆分 `.vue` 文件（即本工具之价值）

将 `.vue` 文件之内容拆分之意义，是令其他代码可以方便的将 `.vue` 文件中的各个部分分别处理。

> **须强调，本工具对 `.vue` 文件之内容仅作拆分，并不做任何额外的转译、编译、转换等工作。**


#### 假定的应用场景1

我们可以另行编写工具，接受本工具之输出内容，以便将原始 `.vue` 文件中的 Stylus 代码编译成 CSS 代码，并单独存放成 `.css` 文件。

#### 假定的应用场景2

我们可以另行编写工具，接受本工具之输出内容，以便将原始 `.vue` 文件中的 TypeScript 代码转译为 JavaScript 代码，并单独存放成 `.js` 文件。

#### 假定的应用场景3

我们可以将原始 `.vue` 文件中的 TypeScript 代码转译为 JavaScript 代码，并将 Sass 代码编译成 CSS 代码。然后将 JavaScript 和 CSS 代码，连同原封未动的 template 部分的代码，拼合为一个新的 `.vue` 文件，存放在磁盘上。

> 那么，既然已经写就了 `.vue` 文件，为何还要产出新的 `.vue` 文件呢？
>
> 这是因为：
>
> - 已知我们的工具的代码是 TypeScript 语言编写的；
> - 其他人在其项目中则可能采用纯 JavaScript 而非 TypeScript 语言编写代码。且可能其并未配置与兼容 TypeScript 代码相关的复杂的工具链。故其项目无法直接利用我们采用 TypeScript 语言编写的 `.vue` 部件。**他们的项目希望利用纯用 JavaScript 语言编写之工具。**
>
> 因此，每当我们采用 TypeScript 语言编写独立 Vue 部件后，在发布 TypeScript 语言编写的代码时，常常须同时发布一套 JavaScript 语言之版本的代码是非常必要之举。**即，发布时 TypeScript 和 JavaScript 并举。**
>
> 欲将原始 `.vue` 文件中的 TypeScript 代码提取出来以便之后转译为 JavaScript 代码，就要用到本工具。

> **顺便再次强调，本工具对 `.vue` 文件之内容仅作拆分，并不做任何额外的转译、编译、转换等工作。**


### 对官方原始代码所作的修订

为令本工具之所有代码均满足 eslint 之要求，**本人对官方的原始代码做了少数修订**。**这些修订均不改变执行之逻辑**，仅涉及代码风格。

例如，将形如

```ts
let a, b
```

之写法，统统改为

```ts
let a
let b
```

之形式。

另外，本人也重命名了一些工具函数，以期“顾名思义”。




## 用法

### 安装

```sh
npm  i  @wulechuan/vue2-official-sfc-parser
```

### 注意事项

-   本工具接受的输入是一个字符串，但该字符串**并非** `.vue` 文件路径之字符串，而是 `.vue` 文件之**内容**之字符串。因此，读取文件之操作须另行编写。如此设计，自然是为了令本工具拥有更佳的通用性。

-   本工具对 `.vue` 文件之内容仅作拆分，并不做任何额外的转译、编译、转换等工作。



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
    lang?: string; // 该品类之语言类型，例如 'ts' 、'sass' 、 'stylus' 等。
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



## 源代码仓库

| <span style="display:inline-block;width:180px;">提供仓库服务之组织</span> | <span style="display:inline-block;width:150px;">仓库组织之国别</span> | 仓库地址 |
| ------------- | :----------: | ------- |
| 码云           | 中华人民共和国 | [https://gitee.com/nanchang-wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git](https://gitee.com/nanchang-wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git) |
| 阿里云之代码仓库 | 中华人民共和国 | [https://code.aliyun.com/wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git](https://code.aliyun.com/wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git) |
| GitHub         | 美           | [https://github.com/wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git](https://github.com/wulechuan/wulechuan-typescript-vue2-official-sfc-parser.git) |




---

## 未来计划

暂无。



