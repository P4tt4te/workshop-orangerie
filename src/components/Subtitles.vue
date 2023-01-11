<template>
    <h3 class="subtitles">{{ currentSubtitles }}</h3>
</template>

<script>
export default {
    name: 'Subtitles',
    props: {
        currentSubtitles: String,
    },
}
</script>

<style lang="scss" scoped>
.subtitles {
    text-align: center;
    color: white;
    position: absolute;
    bottom: 6rem;
    width: 100%;
    z-index: 10;
    font-size: 21px;
}
</style>
