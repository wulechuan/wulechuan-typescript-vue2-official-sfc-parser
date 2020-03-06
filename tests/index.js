import { readFile } from 'fs-extra'
import { vueSFCParser } from '..'





test1()
test2('./tests/testing-source-2.vue')





function test1() {
    const testingSrouce = `
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

    console.log(vueSFCParser(testingSrouce))
}





async function test2(testingSourceFilePath) {
    const vueFileRawContent = await readFile(testingSourceFilePath, 'utf8')
    const vueFileContentString = vueFileRawContent.toString()
    console.log(vueSFCParser(vueFileContentString))
}
