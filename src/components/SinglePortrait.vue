<template>
    <!-- <div class="SinglePortrait">
        <div class="SinglePortrait__meta">
            <h2>{{ currentPortrait.title }}</h2>
            <p>{{ currentPortrait.date }}</p>
            <p>{{ currentPortrait.id }}</p>
        </div>
        <button class="SinglePortrait__prev" @click="goPrev">Prev</button>
        <br />
        <button class="SinglePortrait__next" @click="goNext">Next</button>
        <div class="SinglePortrait__close" @click="$emit('closeModal')">
            Close
        </div>
    </div> -->
</template>

<script>
// export default {
//     props: {
//         portraits: Array,
//         currentIndex: Number,
//     },
//     data() {
//         return {
//             index: this.$props.currentIndex,
//         }
//     },
//     methods: {
//         goPrev() {
//             console.log(this.index)
//             this.index =
//                 this.index - 1 < 0 ? this.portraits.length - 1 : this.index - 1
//         },
//         goNext() {
//             console.log(this.index)
//             this.index = (this.index + 1) % this.portraits.length
//         },
//     },
//     computed: {
//         currentPortrait() {
//             return this.portraits[this.index]
//         },
//     },
// }
</script>

<style lang="scss">
// .SinglePortrait {
//     position: absolute;
//     background-color: $white;
//     width: 100%;
//     height: 100%;
// }
</style>
