<template>
    <section class="Hub">
        <div
            class="Portrait"
            v-for="(portrait, index) in portraits"
            :key="index"
            @click="showModal(index)"
        >
            <h2 class="Portrait__title">{{ portrait.title }}</h2>
            <p>{{ portrait.date }}</p>
        </div>
        <SinglePortrait
            v-if="isModalActive"
            :portraits="portraits"
            :currentIndex="currentIndex"
            @closeModal="closeModal"
        />
    </section>
</template>

<script>
import SinglePortrait from '@/components/SinglePortrait.vue'

export default {
    components: {
        SinglePortrait,
    },
    data() {
        return {
            currentIndex: 0,
            isModalActive: false,
            portraits: [
                {
                    id: '0',
                    title: 'Le Petit Pâtissier',
                    date: '1922-1923',
                    image: 'img1',
                },
                {
                    id: '1',
                    title: 'La Fiancée',
                    date: '1923',
                    image: 'img2',
                },
                {
                    id: '2',
                    title: 'Enfant de chœur',
                    date: '1927-1928',
                    image: 'img3',
                },
            ],
        }
    },
    methods: {
        showModal(index) {
            this.isModalActive = true
            this.currentIndex = index
        },
        closeModal() {
            this.isModalActive = false
        },
    },
}
</script>

<style lang="scss">
.Hub {
    display: flex;

    .Portrait {
        border: 0.1rem solid $grey;
        height: 30rem;
        width: 20rem;

        &:not(:last-child) {
            margin-right: 2rem;
        }
    }
}
</style>
