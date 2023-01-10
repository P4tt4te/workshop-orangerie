<template>
    <section class="Carousel">
        <swiper
            :slides-per-view="1"
            :space-between="25"
            navigation
            :initial-slide="currentIndex"
            :simulate-touch="false"
            @slideChange="slideChange"
        >
            <swiper-slide v-for="(portrait, index) in portraits" :key="index">
                <Portrait :portrait="portrait" />
            </swiper-slide>
        </swiper>
        <button class="Carousel__close" @click="$emit('closeCarousel')">
            Fermer
        </button>
    </section>
</template>

<script>
import Vue from 'vue'
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
    created() {
        window.bus = new Vue({})
    },
    data() {
        return {
            index: this.$props.currentIndex,
        }
    },
    methods: {
        slideChange() {
            bus.$emit('slideChange')
        },
    },
}
</script>

<style lang="scss" scoped>
.Carousel {
    position: absolute;
    background-color: transparent;
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
