<template>
    <div
        :class="[status && activeClass, paintholeClass]"
        :style="{ '--top': top + '%', '--left': left + '%' }"
    >
        <!--<Ping :top="top" :left="left" :status="status" /> -->
        <!--<Sticker :top="top" :left="left" :image="image" />-->
        <img class="calc" :src="image" />
    </div>
</template>

<script>
import Ping from './Ping.vue'
import Sticker from './Sticker.vue'

export default {
    components: {
        Ping,
        Sticker,
    },
    props: {
        image: String,
        top: Number,
        left: Number,
        status: Boolean,
    },
    data() {
        return {
            activeClass: 'active',
            paintholeClass: 'Painthole',
        }
    },
}
</script>

<style lang="scss">
$size: 15vh;

.Painthole {
    position: absolute;
    width: max-content;
    height: max-content;
    top: var(--top);
    left: var(--left);
    transform: scale(1.11);
    transition: 1s ease-in-out all;

    &.active {
        z-index: 10;
        pointer-events: none;
    }

    &.active .Sticker {
        transform: translate3d(
            var(--left) - calc($size / 2),
            var(--top) - calc($size / 2),
            0
        );
        transition-delay: 0s;
        opacity: 0;
    }
}
</style>
