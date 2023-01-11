<template>
    <div
        :class="[status && activeClass, paintholeClass]"
        :style="{ '--top': top + '%', '--left': left + '%' }"
    >
        <Ping :top="top" :left="left" :status="status" />
        <Sticker :top="top" :left="left" :image="image" />
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
    width: $size;
    height: $size;
    top: var(--top);
    left: var(--left);
    z-index: 10;
    
    &.active .Sticker {
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
