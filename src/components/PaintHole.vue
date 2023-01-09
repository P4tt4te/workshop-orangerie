<template>
    <div
        class="painthole"
        v-bind:class="{ active: status }"
        v-bind:style="{ '--top': top + '%', '--left': left + '%' }"
    >
        <PingVue :top="top" :left="left" />
        <StickerVue :top="top" :left="left" :image="image" />
    </div>
</template>

<script>
import PingVue from './Ping.vue'
import StickerVue from './Sticker.vue'

export default {
    components: {
        PingVue,
        StickerVue,
    },
    props: {
        image: String,
        top: Number,
        left: Number,
        status: Boolean,
    },
}
</script>

<style lang="scss">
$size: 15vh;

.painthole {
    position: absolute;
    width: $size;
    height: $size;
    top: var(--top);
    left: var(--left);
    z-index: 10;
    &.active .sticker {
        transform: translate3d(
                var(--left) - calc($size / 2),
                var(--top) - calc($size / 2),
                0
            )
            scale(1) rotate(0deg);
        transition-delay: 0s;
        opacity: 1;
        .stickerFront {
            height: $size;
        }

        .stickerBack {
            top: 0;

            &:before {
                top: -$size;
            }
        }
    }
}
</style>
