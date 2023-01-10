<template>
    <main class="Home">
        <Experience />
        <CameraComponent />
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
