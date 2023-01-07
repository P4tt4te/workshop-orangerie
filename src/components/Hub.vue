<template>
    <section class="Hub">
        <div
            class="PreviewPortrait"
            v-for="(portrait, index) in portraits"
            :key="index"
            :style="{
                backgroundImage: 'url(src/assets/img/' + portrait.image + ')',
            }"
            @click="showCarousel(index)"
        >
            <h2 class="PreviewPortrait__title">{{ portrait.title }}</h2>
            <p class="PreviewPortrait__date">{{ portrait.date }}</p>
            <p class="PreviewPortrait__id">{{ portrait.id }}</p>
        </div>
        <Carousel
            v-if="isCarouselActive"
            :portraits="portraits"
            :currentIndex="currentIndex"
            @closeCarousel="closeCarousel"
        />
    </section>
</template>

<script>
import Carousel from '@/components/Carousel.vue'

export default {
    components: {
        Carousel,
    },
    data() {
        return {
            currentIndex: 0,
            isCarouselActive: false,
            portraits: [
                {
                    id: '0',
                    title: 'Le Petit Pâtissier',
                    date: '1922-1923',
                    image: 'image1.jpeg',
                },
                {
                    id: '1',
                    title: 'La Fiancée',
                    date: '1923',
                    image: 'image3.jpeg',
                },
                {
                    id: '2',
                    title: 'Enfant de chœur',
                    date: '1927-1928',
                    image: 'image2.jpeg',
                },
            ],
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
.Hub {
    display: flex;
    height: 100%;

    .PreviewPortrait {
        border: 0.1rem solid $grey;
        height: 30rem;
        width: 20rem;
        background-size: cover;
        filter: grayscale(1);

        &:not(:last-child) {
            margin-right: 2rem;
        }

        &:hover {
            filter: grayscale(0);
        }
    }
}
</style>
