<template>
    <div class="Portrait">
        <div class="Portrait__illus">
            <div
                class="Portrait__poi"
                v-for="(poi, index) in portrait.questions"
                ref="poi"
                :key="index"
                :style="{
                    left: poi.coords.x + '%',
                    top: poi.coords.y + '%',
                }"
                @click="startQuiz(index)"
            ></div>
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
                [Afficher la vidéo à la place du portrait]
            </div>
        </div>
    </div>
</template>

<script>
import Quiz from '@/components/Quiz.vue'

export default {
    components: {
        Quiz,
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
            this.$refs.poi[question.id].classList.add('hidden')
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

                /* TODO: Wait for the last audio to be finished before launching the final one */
                // myAudio.addEventListener('ended', function () {
                //     myAudio.currentTime = 0
                //     console.log('ended')
                // })
                // this.clearAudio()
                // this.audio = new Audio(
                //     `src/assets/paintings/painting-${this.portrait.id}/audios/complete.mp3`
                // )
                // this.audio.load()
                // this.audio.play()
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

    &__poi {
        border-radius: 50%;
        width: 20vh;
        height: 20vh;
        background-color: $white;
        position: absolute;
        transition: opacity 1s cubic-bezier(0.215, 0.61, 0.355, 1);

        &.hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
    }
}
</style>
