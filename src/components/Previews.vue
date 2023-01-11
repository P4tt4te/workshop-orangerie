<template>
    <div class="Previews">
        <div class="Previews__wrapper">
            <div
                class="item"
                v-for="(portrait, index) in portraits"
                :key="index"
                ref="item"
                @click="showPortrait(index)"
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
import gsap from 'gsap'

export default {
    props: {
        portraits: Array,
    },
    mounted() {
        const tl = gsap.timeline({
            defaults: {
                ease: 'Power4.easeOut',
            },
        })

        tl.from(this.$refs.item, {
            duration: 2,
            delay: 1,
            top: '50%',
            autoAlpha: 0,
        })
    },
    methods: {
        showPortrait(index) {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'Power4.easeOut',
                },
                onComplete: () => {
                    this.$emit('showPortrait', index)
                },
            })

            const allButClicked = [...this.$refs.item]

            if (index > -1) {
                allButClicked.splice(index, 1)
            }

            tl.to(this.$refs.item[index], {
                duration: 1,
                left: '50%',
                top: '50%',
                animation: 'none',
                autoAlpha: 1,
            })
            tl.to(this.$refs.item[index], {
                delay: -1,
                duration: 1,
                transform: 'translateX(-50%) translateY(-50%) scale(1)',
            })
            tl.to(allButClicked, {
                delay: -1,
                duration: 2,
                autoAlpha: 0,
                top: '50%',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.Previews {
    height: 100%;

    &__wrapper {
        height: 100%;
    }

    .item {
        width: 35rem;
        opacity: 0.8;
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
            opacity: 1 !important; // Override GSAP inline-styling
            animation-play-state: paused;
            z-index: 10;
        }
    }
}
</style>
