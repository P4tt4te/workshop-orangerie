<template>
    <canvas id="webgl" ref="canvas"></canvas>
</template>

<style scoped lang="scss">
#webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
</style>

<script>
import Experience from "./../assets/three/Experience/Experience"

export default {
    data() {
        return {
            experience: null,
        }
    },
    mounted() {
        this.experience = new Experience(this.$refs.canvas)
    },
}
</script>
