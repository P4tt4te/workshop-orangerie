<template>
    <div class="Previews">
        <h1 class="Previews__title">Portraits de Soutine</h1>
        <div class="Previews__wrapper">
            <div
                class="item"
                v-for="(portrait, index) in portraits"
                :key="index"
                @click="$emit('showCarousel', index)"
            >
                <div class="item__illus">
                    <img
                        :src="
                            'src/assets/paintings/painting-' +
                            portrait.id +
                            '/image.jpeg'
                        "
                        alt=""
                    />
                </div>
                <h2 class="item__title">{{ portrait.title }}</h2>
                <p class="item__date">{{ portrait.date }}</p>
            </div>
        </div>
        <SlideButton name="Démarrer l'expérience" />
    </div>
</template>

<script>
import SlideButton from '@/components/SlideButton.vue'

export default {
    components: {
        SlideButton,
    },
    props: {
        portraits: Array,
    },
}
</script>

<style lang="scss" scoped>
.Previews {
    height: 100%;
    text-align: center;
    padding-top: 2rem;

    &__title {
        font-size: 8rem;
        margin-bottom: 2rem;
    }

    &__wrapper {
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .item {
        border: 0.1rem solid $grey;
        min-height: 30rem;
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
