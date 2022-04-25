<template>
    <div class="my-test-component2">
        <template v-for="i in 9">
            <span :key="i">{{ i }}</span>
        </template>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class MyVueSFCParserTestingSource2 extends Vue {
    @Prop() firstProp!: string

    firstData: null | number = null

    constructor() { // Actually not necessary.
        super()
        this.firstData = 319
    }

    @Watch('firstProp')
    onFirstPropChanged() {
        console.log('let \'s do something.')
    }

    // computed properties
    get firstComputedProp() {
        return `anything ${this.firstProp}`
    }
}
</script>

<style lang="stylus">
.my-test-component2 {
    color #96f
    background-color white
}
</style>
