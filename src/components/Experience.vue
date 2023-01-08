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

export default {
    components: {
        Previews,
        Carousel,
    },
    data() {
        return {
            currentIndex: 0,
            isCarouselActive: false,
            portraits: [
                {
                    id: 0,
                    title: 'Le Petit Pâtissier',
                    date: '1922-1923',
                    image: 'image1.jpeg',
                    questions: [
                        {
                            question: 'Quelle est la nature du couvre-chef?',
                            id: 0,
                            options: [
                                'Une toque',
                                'Un bonnet',
                                'Un haut-de-forme',
                            ],
                            answer: 'Une toque',
                            isAnswered: false,
                            coords: {
                                x: 42,
                                y: 0,
                            },
                        },
                        {
                            question: 'Quelle est la particularité du cou?',
                            id: 1,
                            options: [
                                'Il est étroit',
                                'Il est griffé',
                                'Il est ensanglanté',
                            ],
                            answer: 'Il est étroit',
                            isAnswered: false,
                            coords: {
                                x: 41,
                                y: 34,
                            },
                        },
                        {
                            question: 'Que tient le garçon?',
                            id: 2,
                            options: [
                                'Un morceau de pain',
                                'Un chiffon',
                                'Un couteau',
                            ],
                            answer: 'Un chiffon',
                            isAnswered: false,
                            coords: {
                                x: 41,
                                y: 71,
                            },
                        },
                    ],
                },
                {
                    id: 1,
                    title: 'La Fiancée',
                    date: '1923',
                    image: 'image3.jpeg',
                },
                {
                    id: 2,
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
.Experience {
    height: 100%;
    width: 100%;
}
</style>
