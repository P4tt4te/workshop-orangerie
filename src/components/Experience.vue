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
import portraits from '@/assets/data/portraits.json'

import Previews from '@/components/Previews.vue'
import Carousel from '@/components/Carousel.vue'

export default {
    components: {
        Previews,
        Carousel,
    },
    data() {
        return {
            currentIndex: 0,
            isCarouselActive: false,
            portraits,
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
