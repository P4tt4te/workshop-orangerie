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
            <img :src="'src/assets/img/' + portrait.image" alt="" />
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
        }
    },
    methods: {
        startQuiz(index) {
            this.isQuizActive = true
            this.currentQuestion = this.portrait.questions[index]
        },
        revealPoi(answeredQuestion) {
            this.portrait.questions[answeredQuestion.id].isAnswered = true
            this.$refs.poi[answeredQuestion.id].classList.add('revealed')

            console.log(this.portrait.questions)
        },
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
        width: 100rem;

        img {
            object-fit: contain;
            height: 100%;
        }
    }

    &__meta {
        flex: 1;
        padding-right: 10rem;
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

        &.revealed {
            opacity: 0;
        }
    }
}
</style>
