<template>
    <section class="Carousel">
        <button class="Carousel__close" @click="$emit('closeCarousel')">
            Fermer
        </button>
        <swiper
            :slides-per-view="1"
            :space-between="25"
            navigation
            :initial-slide="currentIndex"
            :simulate-touch="false"
        >
            <swiper-slide v-for="(portrait, index) in portraits">
                <Portrait :portrait="portrait" />
            </swiper-slide>
        </swiper>
    </section>
</template>

<script>
import Portrait from '@/components/Portrait.vue'

import { Navigation } from 'swiper'
import { SwiperCore, Swiper, SwiperSlide } from 'swiper-vue2'

import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation])

export default {
    components: {
        Portrait,
        Swiper,
        SwiperSlide,
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
}
</script>

<style lang="scss" scoped>
.Carousel {
    position: absolute;
    background-color: $white;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 2rem;

    &__close {
        position: absolute;
        z-index: 10;
        right: 2rem;
    }

    .swiper-container,
    .swiper-wrapper,
    .swiper-slide {
        width: 100% !important;
    }
}
</style>
