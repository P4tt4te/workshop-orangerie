<template>
    <div class="Portrait">
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
                alt=""
            />
        </div>
        <div class="Portrait__meta">
            <h2 class="Portrait__title">{{ portrait.title }}</h2>
            <p class="Portrait__date">{{ portrait.date }}</p>
            <p class="Portrait__details">Huile sur toile</p>
            <Quiz
                v-if="isQuizActive"
                :currentQuestion="currentQuestion"
                @revealPoi="revealPoi"
            />
            <div v-if="isComplete">
                <p>Merci de m'avoir entièrement restauré!</p>
                <p>[Afficher la vidéo à la place de l'image]</p>
            </div>
        </div>
    </div>
</template>

<script>
import Quiz from '@/components/Quiz.vue'
import PaintHole from '@/components/PaintHole.vue'

export default {
    components: {
        Quiz,
        PaintHole,
    },
    props: {
        portrait: Object,
    },
    data() {
        return {
            isQuizActive: false,
            currentQuestion: null,
            audio: null,
            isComplete: false,
            goodAnswers: [],
        }
    },
    created() {
        bus.$on('slideChange', () => {
            this.isQuizActive = false
            this.clearAudio()
        })
    },
    methods: {
        startQuiz(index) {
            this.isQuizActive = true
            this.currentQuestion = this.portrait.questions[index]
        },
        revealPoi(question) {
            this.portrait.questions[question.id].isAnswered = true
            console.log(this.$refs.poi[question.id])
            this.isQuizActive = false

            this.clearAudio()
            this.audio = new Audio(
                `src/assets/paintings/painting-${this.portrait.id}/audios/${question.id}.mp3`
            )
            this.audio.load()
            this.audio.play()

            this.portrait.questions.forEach((answer) => {
                this.goodAnswers.push(answer)
            })
            if (this.goodAnswers.every(this.checkGoodAnswers) === true) {
                this.isComplete = true

                this.audio.addEventListener('ended', () => {
                    this.audio.currentTime = 0
                    this.clearAudio()
                    this.audio = new Audio(
                        `src/assets/paintings/painting-${this.portrait.id}/audios/complete.mp3`
                    )
                    setTimeout(() => {
                        this.audio.load()
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
            }
        },
    },
    beforeDestroy() {
        this.clearAudio()
    },
}
</script>

<style lang="scss">
.Portrait {
    border: 0.1rem solid $grey;
    height: 100%;
    width: 100%;
    display: flex;

    &__illus {
        position: relative;

        img {
            object-fit: contain;
            height: 100%;
        }
    }

    &__meta {
        flex: 1;
        padding: 5rem;
    }

    &__title {
        font-size: 6rem;
    }
}
</style>
