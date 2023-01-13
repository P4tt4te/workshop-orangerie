<template>
    <transition name="fade">
        <div class="Portrait wrap-resp">
            <button
                class="Portrait__go-back"
                @click="$emit('closePortrait', portrait.id)"
                v-if="isComplete || portrait.isComplete"
            >
                Revenir en arrière
            </button>
            <PortraitMeta
                v-if="isComplete || portrait.isComplete"
                :title="portrait.title"
                :date="portrait.date"
            />
            <div class="Portrait__illus">
                <div
                    class="Portrait__overlay"
                    v-if="isOverlayActive && !portrait.isComplete"
                >
                    <div class="icon">
                        <img src="@/assets/svg/pointer-icon.svg" alt="" />
                    </div>
                    <p class="text">
                        Pointez une zone abîmée pour tenter de la restaurer
                    </p>
                </div>
                <PaintHole
                    v-for="(poi, index) in portrait.questions"
                    @click.native="trigger(index)"
                    :key="index"
                    :left="poi.coords.x"
                    :top="poi.coords.y"
                    ref="poi"
                    :width="poi.coords.width"
                    :image="
                        'src/assets/paintings/painting-' +
                        portrait.id +
                        '/stickers/calc' +
                        (index + 1) +
                        '.png'
                    "
                    :index="index"
                    :status="poi.isAnswered"
                />
                <img
                    :src="
                        'src/assets/paintings/painting-' +
                        portrait.id +
                        '/image.jpeg'
                    "
                    v-if="!isComplete || portrait.isComplete === false"
                />
                <video
                    :src="
                        'src/assets/paintings/painting-' +
                        portrait.id +
                        '/video.mp4'
                    "
                    v-else
                    ref="video"
                ></video>
            </div>
            <Quiz
                v-if="isQuizActive"
                :currentQuestion="currentQuestion"
                @revealPoi="revealPoi"
            />
            <Subtitles :currentSubtitles="currentSubtitles" />
        </div>
    </transition>
</template>

<script>
import Quiz from '@/components/Quiz.vue'
import PaintHole from '@/components/PaintHole.vue'
import Subtitles from '@/components/Subtitles.vue'
import PortraitMeta from '@/components/PortraitMeta.vue'

export default {
    components: {
        Quiz,
        PaintHole,
        Subtitles,
        PortraitMeta,
    },
    props: {
        portrait: Object,
    },
    data() {
        return {
            isOverlayActive: true,
            isQuizActive: false,
            currentQuestion: null,
            audio: null,
            isComplete: false,
            goodAnswers: [],
            subtitles: null,
            currentSubtitles: null,
        }
    },
    methods: {
        trigger(index) {
            this.startQuiz(index)

            this.$refs.poi[index].$el.children[1].classList.add('visible')

            const allButClicked = [...this.$refs.poi]
            if (index > -1) {
                allButClicked.splice(index, 1)
            }

            allButClicked.forEach((item) => {
                item.$el.children[1].classList.remove('visible')
            })
        },
        startQuiz(index) {
            this.clearAudio()
            this.isQuizActive = true
            this.currentQuestion = this.portrait.questions[index]
        },
        async revealPoi(question) {
            this.portrait.questions[question.id].isAnswered = true
            this.isQuizActive = false

            this.subtitles = await import(
                `@/assets/paintings/painting-${this.portrait.id}/subtitles/${question.id}.json`
            ).then((module) => {
                return module.default
            })

            this.clearAudio()
            this.audio = new Audio(
                `src/assets/paintings/painting-${this.portrait.id}/audios/${question.id}.mp3`
            )
            this.audio.play()

            this.portrait.questions.forEach((answer) => {
                this.goodAnswers.push(answer)
            })
            this.audio.addEventListener('ended', async () => {
                this.currentSubtitles = null
            })
            if (this.goodAnswers.every(this.checkGoodAnswers) === true) {
                this.audio.addEventListener('ended', async () => {
                    this.audio.currentTime = 0
                    this.clearAudio()
                    this.audio = new Audio(
                        `src/assets/paintings/painting-${this.portrait.id}/audios/complete.mp3`
                    )
                    this.subtitles = await import(
                        `@/assets/paintings/painting-${this.portrait.id}/subtitles/complete.json`
                    ).then((module) => {
                        return module.default
                    })
                    let timeoutEnd = setTimeout(() => {
                        this.isComplete = true
                        this.audio.play()
                        clearTimeout(timeoutEnd)
                    }, 800)
                })
            }
        },
        checkGoodAnswers(answer) {
            return answer.isAnswered === true
        },
        clearAudio() {
            if (this.audio) {
                this.audio.pause()
                this.audio = null
                this.currentSubtitles = null
            }
        },
    },
    mounted() {
        setTimeout(() => {
            this.isOverlayActive = false
        }, 4000)

        setInterval(() => {
            if (this.audio) {
                this.subtitles.forEach((s) => {
                    if (
                        this.audio.currentTime > s.start &&
                        this.audio.currentTime < s.end
                    ) {
                        this.currentSubtitles = s.text
                    }
                })
            }
        }, 100)
    },
    // watch: {
    //     isComplete(value) {
    //         this.$set(this.video, 'video', this.$refs.video)
    //     },
    //     video: {
    //         handler(newVal, oldVal) {
    //             console.log(this.$refs.video)
    //         },
    //         deep: true,
    //     },
    // },
    beforeDestroy() {
        this.clearAudio()
    },
}
</script>

<style lang="scss">
.Portrait {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &__illus {
        position: relative;
        // height: 70rem;
        height: 75%;

        img {
            object-fit: contain;
            height: 100%;
        }

        video {
            object-fit: contain;
            height: 100%;
        }
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 20;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        animation: fade-out cubic-bezier(0.215, 0.61, 0.355, 1) 4s forwards;

        .icon {
            width: 6.4rem;
            margin-bottom: 2rem;
        }

        .text {
            font-family: $mono;
            text-transform: uppercase;
            letter-spacing: 0.1rem;
            max-width: 30rem;
        }
    }

    &__go-back {
        border: 0.05rem solid $white;
        border-radius: 10rem;
        font-family: $mono;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        position: absolute;
        left: 6rem;
        padding: 2rem;
        width: 30rem;
        text-align: center;
        z-index: 20;
    }
}

@keyframes fade-out {
    0% {
        opacity: 0;
    }

    25% {
        opacity: 1;
    }

    75% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
