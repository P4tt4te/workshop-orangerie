<template>
    <header class="PortraitMeta" ref="meta">
        <p class="label">Vous avez restauré</p>
        <h2 class="title">{{ title }}, {{ date }}</h2>
    </header>
</template>

<script>
import gsap from 'gsap'

export default {
    props: {
        title: String,
        date: String,
    },
    mounted() {
        const tl = gsap.timeline({
            defaults: {
                ease: 'Power4.easeOut',
            },
        })

        tl.from(this.$refs.meta, {
            delay: 1,
            duration: 2,
            y: -50,
            autoAlpha: 0,
        })
    },
    beforeDestroy() {
        gsap.killTweensOf(this.$refs.meta)
    },
}
</script>

<style lang="scss">
.PortraitMeta {
    position: absolute;
    top: 6rem;
    left: 50%;
    transform: translate(-50%, 0%);
    text-align: center;
    z-index: 20;

    .label {
        font-family: $mono;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
    }

    .title {
        font-family: $serif;
        font-size: 6rem;
        margin-top: 1rem;
    }
}
</style>
