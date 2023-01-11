<template>
    <div
        class="Sticker"
        v-bind:style="{ '--top': top + '%', '--left': left + '%' }"
    >
        <img class="stickerFront" :src="image" alt="sticker" />
        <div class="stickerBack"></div>
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
$size: 15vh;

.Sticker {
    display: block;
    position: absolute;
    top: var(--top);
    right: 0;
    bottom: 0;
    left: var(--left);
    z-index: 5;
    width: $size;
    height: $size;
    border-radius: 50%;
    transition: 0.2s 0.2s;
    transform: translate3d(100px, 100px, 0) scale(1.5) rotate(-45deg);
    opacity: 0;
    pointer-events: none;
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
        width: $size;
        height: $size;
        border-radius: 50%;
        transition: 0.35s;
    }
}

.stickerFront {
    height: 0;
}
.stickerBack {
    top: $size;
    overflow: hidden;

    &:before {
        background-color: #f7e5c0;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.4);
        top: 0;
    }
}
</style>
