<template>
    <div
        :style="{ '--top': top + '%', '--left': left + '%' }"
        :class="[!status && activeClass, pingClass]"
    ></div>
</template>
<script>
export default {
    props: {
        top: Number,
        left: Number,
        status: Boolean,
    },
    data() {
        return {
            activeClass: 'active',
            pingClass: 'Ping',
        }
    },
}
</script>
<style lang="scss">
$size: 15vh;

.Ping {
    position: absolute;
    left: var(--left);
    top: var(--top);
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: transparent;
}

.Ping.active {
    background-color: white;
    animation: 2s ease-in-out pingEffect infinite;
}

@keyframes pingEffect {
    0% {
        box-shadow: 0px 0px 10px 10px rgba(221, 225, 7, 0.25),
            inset 2px 2px 11px 3px rgba(0, 0, 0, 0.71);
    }
    50% {
        box-shadow: 0px 0px 20px 20px rgba(221, 225, 7, 0.25),
            inset 2px 2px 11px 3px rgba(0, 0, 0, 0.71);
    }
    100% {
        box-shadow: 0px 0px 10px 10px rgba(221, 225, 7, 0.25),
            inset 2px 2px 11px 3px rgba(0, 0, 0, 0.71);
    }
}
</style>
