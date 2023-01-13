<template>
    <div class="Portrait wrap-resp">
        <button class="Portrait__go-back" @click="$emit('closePortrait')">
            BOUTON RETOUR
        </button>
        <PortraitMeta
            v-if="isComplete"
            :title="portrait.title"
            :date="portrait.date"
        />
        <div class="Portrait__illus">
            <transition name="fade">
                <div class="Portrait__overlay" v-if="isOverlayActive">
                    <div class="icon">
                        <img src="@/assets/svg/pointer-icon.svg" alt="" />
                    </div>
                    <p class="text">
                        Pointez une zone abîmée pour tenter de la restaurer
                    </p>
                </div>
            </transition>
            <PaintHole
                v-for="(poi, index) in portrait.questions"
                @click.native="trigger(index)"
                :key="index"
                :left="poi.coords.x"
                :top="poi.coords.y"
                :width="poi.coords.width"
                ref="poi"
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
                v-if="!isComplete"
            />
            <!-- <transition name="fade"> -->
            <video
                :src="
                    'src/assets/paintings/painting-' +
                    portrait.id +
                    '/video.mp4'
                "
                v-if="isComplete"
                ref="video"
            ></video>
            <!-- </transition> -->
        </div>
        <Quiz
            v-if="isQuizActive"
            :currentQuestion="currentQuestion"
            @revealPoi="revealPoi"
        />
        <Subtitles :currentSubtitles="currentSubtitles" />
    </div>
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
                    setTimeout(() => {
                        this.isComplete = true
                        this.audio.play()
                    }, 1000)
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
    updated() {
        this.$nextTick(() => {
            if (this.$refs.video) {
                this.$refs.video.play()
            }
        })
    },
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

    // DEBUG
    &__go-back {
        position: absolute;
        top: 6rem;
        right: 0;
        z-index: 20;
        padding: 5rem;
        background-color: $white;
        color: $black;
    }
}
</style>
