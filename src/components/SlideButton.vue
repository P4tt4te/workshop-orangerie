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
import interact from 'interactjs'
import { bus } from '../main'

export default {
    props: {
        name: String,
    },
    mounted() {
        this.initDrag()
    },
    created() {
        bus.$on('isHandClosed', (value) => {
            console.log('SlideButtonTesting :' + value)
        })
    },
    methods: {
        initDrag() {
            interact('.arrowCircle').draggable({
                startAxis: 'x',
                lockAxis: 'x',
                listeners: {
                    start(event) {
                        console.log(event.type, event.target)
                    },
                    move: this.dragMoveEvent,
                },
                modifiers: [
                    interact.modifiers.restrict({
                        restriction: 'parent',
                        endOnly: true,
                    }),
                ],
            })
        },
        dragMoveEvent(event) {
            let target = event.target

            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            if (x <= 0) {
                x = 0
            }
            if (x >= 308) {
                x = 308
            }

            target.style.transform = `translateX(${x}px)`

            target.setAttribute('data-x', x)
        },
    },
}
</script>
<style lang="scss" scoped>
.Slidebutton {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 2rem;
    padding-left: 1rem;
    width: 370px;
    height: 59px;
    border: 2px solid white;
    border-radius: 100px;
    font-family: 'basierCircleMono-regular';
}
.arrowCircle {
    width: 39px;
    height: 39px;
}
</style>
