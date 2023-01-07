<template>
    <section class="Hub">
        <div
            class="PreviewPortrait"
            v-for="(portrait, index) in portraits"
            :key="index"
            :style="{
                backgroundImage: 'url(src/assets/img/' + portrait.image + ')',
            }"
            @click="showSlider(index)"
        >
            <h2 class="PreviewPortrait__title">{{ portrait.title }}</h2>
            <p class="PreviewPortrait__date">{{ portrait.date }}</p>
            <p class="PreviewPortrait__id">{{ portrait.id }}</p>
        </div>
        <Slider
            v-if="isSliderActive"
            :portraits="portraits"
            :currentIndex="currentIndex"
            @closeSlider="closeSlider"
        />
    </section>
</template>

<script>
import Slider from '@/components/Slider.vue'

export default {
    components: {
        Slider,
    },
    data() {
        return {
            currentIndex: 0,
            isSliderActive: false,
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
        showSlider(index) {
            this.isSliderActive = true
            this.currentIndex = index
        },
        closeSlider() {
            this.isSliderActive = false
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
