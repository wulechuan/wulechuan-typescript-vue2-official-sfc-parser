import { readFile as 非阻塞式读取文件 } from 'fs-extra'
import { vueSFCParser, 将Vue2的单文件部件内容全文拆分 } from '..'





测试用例1()
测试用例2('./测试集/测试用例2-原始文件.vue')





function 测试用例1 () {
    const 原始Vue文件之内容全文 = `
<template><div class="my-test-component1"></div></template>

<script>
import Vue from 'vue'

export default class MyTestComponent1 extends Vue {
    components = {}
    someData = 79
    mounted() {
        console.log("I'm here.")
    }
}
</script>

<style lang="stylus">
.my-test-component1 {
    color blue
}
</style>
`

    const 拆分得到的结构化数据 = vueSFCParser(原始Vue文件之内容全文)
    console.log('\n\n测试用例1之结果：')
    console.log(拆分得到的结构化数据)
    console.log('')
}





async function 测试用例2 (原始文件之路径) {
    const 原始Vue文件之内容包 = await 非阻塞式读取文件(原始文件之路径, 'utf8')
    const 原始Vue文件之内容全文 = 原始Vue文件之内容包.toString()
    const 拆分得到的结构化数据 = 将Vue2的单文件部件内容全文拆分(原始Vue文件之内容全文)
    console.log('\n\n测试用例2之结果：')
    console.log(拆分得到的结构化数据)
    console.log('')
}
