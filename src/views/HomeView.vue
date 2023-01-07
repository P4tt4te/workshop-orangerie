<template>
    <main class="Home">
        <Hub />
        <!-- <Quiz /> -->
    </main>
</template>

<script>
import Hub from '@/components/Hub.vue'
import Quiz from '@/components/Quiz.vue'

export default {
    components: {
        Hub,
        Quiz
    },
}
</script>

<style lang="scss">
.Home {
    position: relative;
    height: 100vh;
}
</style>