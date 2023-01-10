<template>
    <main class="Home">
        <CameraComponent />
        <Experience />
    </main>
</template>

<script>
import Experience from '@/components/Experience.vue'
import CameraComponent from '@/components/Camera.vue'

export default {
    name: 'HomeView',
    components: {
        Experience,
        CameraComponent,
    },
}
</script>
<style lang="scss">
.Home {
    position: relative;
    height: 100vh;
}
</style>
