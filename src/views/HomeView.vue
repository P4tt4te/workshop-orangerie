<template>
    <main class="Home">
        <Experience />
    </main>
</template>

<script>
import Experience from '@/components/Experience.vue'

export default {
    components: {
        Experience,
    },
}
</script>

<style lang="scss">
.Home {
    position: relative;
    height: 100vh;
}
</style>