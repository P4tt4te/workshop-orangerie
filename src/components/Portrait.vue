<template>
    <div class="Portrait wrap-resp">
        <button class="Portrait__go-back" @click="$emit('closePortrait')">
            [BOUTON RETOUR]
        </button>
        <div class="Portrait__overlay" v-if="isOverlayActive">
            <div class="icon"></div>
            <p>Pointez une zone abîmée pour tenter de la restaurer</p>
        </div>
        <header class="Portrait__meta" v-if="isComplete">
            <p class="label">Vous avez restauré</p>
            <h2 class="title">{{ portrait.title }}, {{ portrait.date }}</h2>
        </header>
        <div class="Portrait__illus">
            <PaintHole
                v-for="(poi, index) in portrait.questions"
                @click.native="startQuiz(index)"
                :key="index"
                ref="poi"
                :left="poi.coords.x"
                :top="poi.coords.y"
                :image="
                    'src/assets/paintings/painting-' +
                    portrait.id +
                    '/stickers/sticker' +
                    (index + 1) +
                    '.png'
                "
                :status="poi.isAnswered"
            />
            <img
                :src="
                    'src/assets/paintings/painting-' +
                    portrait.id +
                    '/image.jpeg'
                "
            />
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
import { bus } from '../main'
import Subtitles from '@/components/Subtitles.vue'

export default {
    components: {
        Quiz,
        PaintHole,
        Subtitles,
    },
    props: {
        portrait: Object,
    },
    data() {
        return {
            isOverlayActive: false,
            isQuizActive: false,
            currentQuestion: null,
            audio: null,
            isComplete: false,
            goodAnswers: [],
            subtitles: null,
            currentSubtitles: null,
            questionId: null,
        }
    },
    created() {
        // bus.$on('slideChange', () => {
        //     this.isQuizActive = false
        //     this.clearAudio()
        // })
    },
    methods: {
        startQuiz(index) {
            this.clearAudio()
            this.isQuizActive = true
            this.currentQuestion = this.portrait.questions[index]
        },
        async revealPoi(question) {
            this.portrait.questions[question.id].isAnswered = true
            this.isQuizActive = false
            this.questionId = question.id

            this.subtitles = await import(
                `@/assets/paintings/painting-${this.portrait.id}/subtitles/${this.questionId}.json`
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
                    }, 2000)
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

    &__meta {
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
            font-size: 4rem;
            margin-top: 1rem;
            // font-family: $mono;
            // text-transform: uppercase;
            // letter-spacing: 0.1rem;
        }
    }

    &__illus {
        position: relative;
        height: 75%;

        img {
            object-fit: contain;
            height: 100%;
        }
    }

    &__go-back {
        position: absolute;
        top: 6rem;
        right: 0;
        z-index: 20;
    }
}
</style>
