<template>
    <div class="Previews">
        <div class="Previews__wrapper">
            <div
                class="item"
                v-for="(portrait, index) in portraits"
                :key="index"
                @click="$emit('showPortrait', index)"
            >
                <img
                    :src="
                        'src/assets/paintings/painting-' +
                        portrait.id +
                        '/image.jpeg'
                    "
                    alt=""
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        portraits: Array,
    },
}
</script>

<style lang="scss" scoped>
.Previews {
    height: 100%;

    .item {
        width: 35rem;
        opacity: 0.6;
        position: absolute;
        animation: orbit 8s linear infinite;

        &:nth-child(1) {
            top: 20%;
            left: 30%;
        }

        &:nth-child(2) {
            top: 30%;
            left: 45%;
        }

        &:nth-child(3) {
            top: 10%;
            left: 60%;
        }

        &:hover {
            opacity: .8;
            animation-play-state: paused;
            z-index: 10;
        }
    }
}
</style>
