<template>
    <div>
        <canvas id="webgl" ref="canvas"></canvas>
        <button ref="goLeft" class="button button-left">GO LEFT</button>
        <button ref="goRight" class="button button-right">GO RIGHT</button>
    </div>
</template>

<style scoped lang="scss">
#webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}

.button {
    position: fixed;
    top: 50vh;
    padding: 10px;
    background-color: green;
    color: white;
    border-radius: 15px;
}
.button-left {
    left: 20px;
}
.button-right {
    right: 20px;
}
</style>

<script>
import Experience from './../assets/three/Experience/Experience'

export default {
    data() {
        return {
            experience: null,
        }
    },
    mounted() {
        this.experience = new Experience(
            this.$refs.canvas,
            this.$refs.goLeft,
            this.$refs.goRight
        )
    },
}
</script>
