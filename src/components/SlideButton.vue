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
    data: function () {
        return {
            holdStatus: false,
            holdInterval: null,
        }
    },
    props: {
        name: String,
    },
    mounted() {
        this.initDrag()
    },
    created() {
        bus.$on('isHandClosed', (value) => {
            console.log(value)
            this.handOnSlider(value)
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
        handOnSlider(value) {
            if (value.status === true) {
                let objRect = document
                    .querySelector('.Slidebutton')
                    .getBoundingClientRect()
                console.log(objRect)
                if (
                    value.x > objRect.x - 20 &&
                    value.x <= objRect.x + 40 &&
                    value.y > objRect.y - 20 &&
                    value.y <= objRect.y + 40
                ) {
                    console.log('on est dessus !!!')
                    this.holdStatus = true
                    this.holdInterval = setInterval(this.holdDrag, 500)
                } else {
                    if (this.holdStatus) {
                        console.log('cleartrue')
                        clearInterval(this.holdInterval)
                    }
                    this.holdStatus = false
                }
            } else {
                if (this.holdStatus) {
                    console.log('clear')
                    clearInterval(this.holdInterval)
                    this.holdStatus = false
                }
            }
        },
        holdDrag() {
            console.log('holdDrag')
        },
    },
}
</script>
<style lang="scss" scoped>
.Slidebutton {
    position: relative;
    margin-left: auto;
    margin-right: auto;
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
