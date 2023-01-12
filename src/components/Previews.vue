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
                    v-if="portrait.isComplete"
                />
                <img
                    :src="
                        'src/assets/paintings/painting-' +
                        portrait.id +
                        '/dirty-image.jpeg'
                    "
                    alt=""
                    v-if="!portrait.isComplete"
                />
            </div>
            <footer class="Previews__footer" ref="footer">
                <div class="icon">
                    <img src="@/assets/svg/pointer-icon.svg" alt="" />
                </div>
                <p class="text">
                    Pointez une œuvre pour tenter de la restaurer
                </p>
            </footer>
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

        tl.from(this.$refs.footer, {
            duration: 2,
            autoAlpha: 0,
        })
        tl.from(this.$refs.item, {
            duration: 2,
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

            allButClicked.forEach((item) => {
                item.style = 'pointer-events: none'
            })

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
    beforeDestroy() {
        gsap.killTweensOf(this.$refs.meta)
    },
}
</script>

<style lang="scss" scoped>
.Previews {
    height: 100%;

    &__wrapper {
        height: 100%;
    }

    &__footer {
        position: absolute;
        left: 0;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding-bottom: 6rem;

        .icon {
            width: 6.4rem;
            margin: auto;
            margin-bottom: 2rem;
        }

        .text {
            font-family: $mono;
            text-transform: uppercase;
            letter-spacing: 0.1rem;
        }
    }

    .item {
        width: 35rem;
        opacity: 0.8;
        position: absolute;

        &:nth-child(odd) {
            animation: orbit 8s linear infinite;
        }

        &:nth-child(even) {
            animation: reverse-orbit 8s linear infinite;
        }

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
    }
}
</style>
