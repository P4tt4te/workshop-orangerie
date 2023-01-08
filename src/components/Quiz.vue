<template>
    <div class="Quiz">
        <div class="Quiz__label">
            {{ currentQuestion.question }}
        </div>
        <div class="Quiz__options">
            <button
                class="Quiz__button"
                @click="selectOption($event)"
                v-for="(option, index) in currentQuestion.options"
            >
                {{ letters[index] }}: {{ option }}
            </button>
        </div>
    </div>
</template>

<script>
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
    methods: {
        selectOption(event) {
            this.selectedOption = event.target.innerText.slice(3).trim()
            this.checkAnswer()
        },
        checkAnswer() {
            if (this.selectedOption === this.currentQuestion.answer) {
                this.currentQuestion.isAnswered = true
                this.$emit('revealPoi', this.currentQuestion)
            } else {
                alert('Mauvaise réponse!')
            }
        },
    },
}
</script>

<style lang="scss">
.Quiz {
    margin-top: 2rem;

    &__label {
        font-size: 3rem;
        margin-bottom: 2rem;
    }

    &__button {
        display: block;
        padding: 2rem;
        border: 0.1rem solid black;
        width: 100%;

        &:hover {
            background-color: black;
            color: $white;
        }

        &:not(:last-child) {
            margin-bottom: 2rem;
        }
    }
}
</style>
