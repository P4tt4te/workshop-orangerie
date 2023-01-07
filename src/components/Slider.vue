<template>
    <section class="Slider">
        <Portrait v-for="(portrait, index) in portraits" :portrait="portrait" />
        <div class="Slider__navigation">
            <button class="Portrait__prev" @click="goPrev">Prev</button>
            <button class="Portrait__next" @click="goNext">Next</button>
        </div>
        <div class="Slider__close">
            <button @click="$emit('closeSlider')">Close</button>
        </div>
    </section>
</template>

<script>
import Portrait from '@/components/Portrait.vue'

export default {
    components: {
        Portrait,
    },
    props: {
        portraits: Array,
        currentIndex: Number,
    },
    data() {
        return {
            index: this.$props.currentIndex,
        }
    },
    methods: {
        goPrev() {
            this.index =
                this.index - 1 < 0 ? this.portraits.length - 1 : this.index - 1
        },
        goNext() {
            this.index = (this.index + 1) % this.portraits.length
        },
    },
}
</script>

<style lang="scss">
.Slider {
    position: absolute;
    background-color: $white;
    width: 100%;
    height: 100%;
    display: flex;
}
</style>
