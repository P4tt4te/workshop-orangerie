<template>
    <main class="Home">
        <Hub />
    </main>
</template>

<script>
import Hub from '@/components/Hub.vue'

export default {
    components: {
        Hub
    },
}
</script>

<style lang="scss">
.Home {
    position: relative;
    max-height: 100vh;
}
</style>