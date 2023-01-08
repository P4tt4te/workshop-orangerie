<template>
    <div
        :class="'sticker'"
        v-bind:style="{ '--top': top + 'px', '--left': left + 'px' }"
    >
        <img :class="'stickerFront'" :src="image" alt="sticker" />
        <div :class="'stickerBack'"></div>
    </div>
</template>
<script>
export default {
    props: {
        image: String,
        top: Number,
        left: Number,
    },
}
</script>
<style lang="scss">
.sticker {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: 0.2s 0.2s;
    transform: translate3d(var(--left) + 50px, var(--top) + 50px, 0) scale(1.5)
        rotate(-45deg);
    opacity: 0;

}

.stickerBack,
.stickerFront {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.35s;

    &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transition: 0.35s;
    }
}

.stickerFront {
    height: 0;
}
.stickerBack {
    top: 100px;
    overflow: hidden;

    &:before {
        background-color: #f7e5c0;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.4);
        top: 0;
    }
}
</style>
