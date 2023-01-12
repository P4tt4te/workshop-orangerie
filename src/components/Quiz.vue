<template>
    <div class="Quiz">
        <div class="Quiz__meta" ref="meta">
            <small class="Quiz__label"
                >Question n°{{ currentQuestion.id + 1 }}</small
            >
            <h2 class="Quiz__question">{{ currentQuestion.question }}</h2>
        </div>
        <div class="Quiz__options">
            <button
                class="Quiz__button"
                @click="selectOption($event)"
                v-for="(option, index) in currentQuestion.options"
                ref="button"
            >
                <div class="icon">{{ letters[index] }}</div>
                <div class="text">{{ option }}</div>
            </button>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap'

export default {
    props: {
        currentQuestion: Object,
    },
    data() {
        return {
            letters: ['A', 'B', 'C'],
            selectedOption: '',
        }
    },
    mounted() {
        const tl = gsap.timeline({
            defaults: {
                ease: 'Power4.easeOut',
            },
        })
        tl.from(this.$refs.meta, {
            duration: 2,
            y: '-50%',
            autoAlpha: 0,
        })
        tl.fromTo(
            this.$refs.button,
            {
                autoAlpha: 0,
                y: 50,
                x: 50,
            },
            {
                autoAlpha: 1,
                y: 0,
                x: 0,
                stagger: 0.5,
            }
        )
    },
    methods: {
        selectOption(event) {
            const str = event.target.innerText.slice(2).trim().toLowerCase()
            const str2 = str.charAt(0).toUpperCase() + str.slice(1)
            this.selectedOption = str2
            this.checkAnswer(event)
        },
        checkAnswer(event) {
            if (this.selectedOption === this.currentQuestion.answer) {
                event.target.classList.add('Quiz__button--correct-answer')

                setTimeout(() => {
                    this.$emit('revealPoi', this.currentQuestion)
                }, 500)
            } else {
                event.target.classList.add('Quiz__button--bad-answer')

                setTimeout(() => {
                    event.target.classList.remove('Quiz__button--bad-answer')
                }, 1000)
            }
        },
    },
    beforeDestroy() {
        gsap.killTweensOf(this.$refs.meta)
        gsap.killTweensOf(this.$refs.button)
    },
}
</script>

<style lang="scss">
.Quiz {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    padding-top: 6rem;
    // border: 0.1rem solid red;

    &__meta {
        padding-top: 2rem;
        border-top: 0.1rem dashed $white;
        max-width: 40%;
    }

    &__label {
        font-family: $mono;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
    }

    &__question {
        font-size: 5rem;
        margin-top: 2rem;
        font-family: $serif;
        display: block;
        height: 11.6rem;
    }

    &__options {
        // margin-top: 3rem;
        // border: 0.1rem solid blue;
        width: 100%;
        height: 100%;
        // height: calc(100% - 14.6rem);
        // position: relative;
        position: absolute;
        top: 0;
        left: 0;
    }

    &__button {
        border-radius: 10rem;
        border: 0.05rem solid $white;
        padding: 2rem;
        font-family: $mono;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        display: flex;
        align-items: center;
        width: 45rem;
        position: absolute;
        transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transition-property: background-color, opacity, color;
        text-align: center;

        &:nth-child(1) {
            top: 30%;
            right: 6rem;
        }

        &:nth-child(2) {
            bottom: 6rem;
            right: 10%;
        }

        &:nth-child(3) {
            top: 60%;
            left: 6rem;
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            height: 4rem;
            width: 4rem;
            background-color: $white;
            color: $black;
            margin-right: 4rem;
            pointer-events: none;
        }

        .text {
            pointer-events: none;
            width: calc(100% - 16rem);
            text-align: center;
        }

        &:hover {
            background-color: $white;
            color: $black;
        }

        &:hover .icon {
            background-color: $black;
            color: $white;
        }

        &--correct-answer {
            background-color: $green;
            pointer-events: none;
            border-color: $green;
            color: $black;
            transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

            .icon {
                background-color: $black;
                color: $green;
            }

            &:hover {
                background-color: $green;
                color: $black;

                .icon {
                    background-color: $black;
                    color: $green;
                }
            }
        }

        &--bad-answer {
            background-color: $red;
            animation: 0.25s wiggle forwards;
            border-color: $red;
            color: $black;
            transition: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

            .icon {
                background-color: $black;
                color: $red;
            }

            &:hover {
                background-color: $red;
                color: $black;

                .icon {
                    background-color: $black;
                    color: $red;
                }
            }
        }
    }
}

@keyframes wiggle {
    0% {
        transform: translateX(-1%);
    }

    25% {
        transform: translateX(2%);
    }

    50% {
        transform: translateX(-1%);
    }

    75% {
        transform: translateX(-2%);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
