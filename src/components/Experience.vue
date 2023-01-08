<template>
    <section class="Experience">
        <Previews
            v-if="!isCarouselActive"
            :portraits="portraits"
            @showCarousel="showCarousel"
        />
        <Carousel
            v-if="isCarouselActive"
            :portraits="portraits"
            :currentIndex="currentIndex"
            @closeCarousel="closeCarousel"
        />
    </section>
</template>

<script>
import Previews from '@/components/Previews.vue'
import Carousel from '@/components/Carousel.vue'

import data from '@/assets/data/portraits.json'

export default {
    components: {
        Previews,
        Carousel,
    },
    data() {
        return {
            currentIndex: 0,
            isCarouselActive: false,
            portraits: data
        }
    },
    methods: {
        showCarousel(index) {
            this.isCarouselActive = true
            this.currentIndex = index
        },
        closeCarousel() {
            this.isCarouselActive = false
        },
    },
}
</script>

<style lang="scss">
.Experience {
    height: 100%;
    width: 100%;
}
</style>
