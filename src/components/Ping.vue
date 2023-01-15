<template>
    <div
        :style="{ '--top': top + '%', '--left': left + '%' }"
        :class="[!status ? activeClass : disabledClass, pingClass]"
    >
    </div>
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
            disabledClass: 'disabled',
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

    &.active {
        background-color: rgb(219, 216, 175);
        animation: 2s ease-in-out pingEffect infinite;
    }

    &.disabled {
        pointer-events: none;
    }
}

@keyframes pulse-black {
    0% {
        transform: scale(0.95) translate(-50%, -50%);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }

    70% {
        transform: scale(1) translate(-50%, -50%);
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }

    100% {
        transform: scale(0.95) translate(-50%, -50%);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
}
</style>
