<template>
    <div
        :class="'painthole'"
        v-bind:style="{ '--top': top + 'px', '--left': left + 'px' }"
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
    },
}
</script>

<style lang="scss">
.painthole {
    &:hover .sticker {
        transform: translate3d(var(--left), var(--top), 0) scale(1) rotate(0deg);
        transition-delay: 0s;
        opacity: 1;
        .stickerFront {
            height: 100px;
        }

        .stickerBack {
            top: 0;

            &:before {
                top: -100px;
            }
        }
    }
}
</style>
