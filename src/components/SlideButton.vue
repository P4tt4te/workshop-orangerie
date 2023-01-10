<template>
    <div :class="'Slidebutton'">
        <img
            class="arrowCircle"
            src="src/assets/arrow-circle.svg"
            alt="black arrow in a circle"
        />
        <span>{{ name }}</span>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
    },
}
</script>
<style lang="scss" scoped>
.Slidebutton {
    position: relative;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 2rem;
    width: 370px;
    height: 59px;
    border: 2px solid white;
    border-radius: 100px;

    span : {
        color: white;
    }
}
.arrowCircle {
    width: 39px;
    height: 39px;
    position: absolute;
    top: 8px;
    left: 6px;
}
</style>
