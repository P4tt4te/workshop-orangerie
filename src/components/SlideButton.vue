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
            holdIntervalStatus: false,
        }
    },
    props: {
        name: String,
        onValidate: Function,
    },
    mounted() {
        this.initDrag()
    },
    created() {
        bus.$on('isHandClosed', (value) => {
            this.handOnSlider(value)
        })
        bus.$on('sendHandPositions', (value) => {
            let arrowCircleElement =
                document.getElementsByClassName('arrowCircle')[0]
            let objRect = arrowCircleElement.getBoundingClientRect()
            let dx = value.x - objRect.x
            let fakeEvent = {
                target: arrowCircleElement,
                dx: dx,
            }
            this.dragMoveEvent(fakeEvent)
        })
    },
    beforeUnmount() {
        bus.$off()
    },
    methods: {
        initDrag() {
            interact('.arrowCircle').draggable({
                startAxis: 'x',
                lockAxis: 'x',
                inertia: true,
                listeners: {
                    start(event) {
                        console.log(event.type, event.target)
                    },
                    move: this.dragMoveEvent,
                    end: this.replaceCircle,
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
            if (x >= 306) {
                console.log('validé')
                bus.$off()
                this.onValidate()
            }
            if (x >= 308) {
                x = 308
            }
            target.style.transition = null
            target.style.transform = `translateX(${x}px)`

            target.setAttribute('data-x', x)
        },
        replaceCircle() {
            let arrowCircleElement =
                document.getElementsByClassName('arrowCircle')[0]
            arrowCircleElement.style.transition = `transform 0.4s ease-in-out`
            arrowCircleElement.style.transform = `translateX(0px)`
            arrowCircleElement.setAttribute('data-x', 0)
        },
        handOnSlider(value) {
            if (
                value.status === true &&
                document.querySelector('.Slidebutton')
            ) {
                let objRect = document
                    .querySelector('.Slidebutton')
                    .getBoundingClientRect()
                if (
                    value.x > objRect.x - 20 &&
                    value.x <= objRect.x + 40 &&
                    value.y > objRect.y - 20 &&
                    value.y <= objRect.y + 40
                ) {
                    this.holdStatus = true
                    this.holdIntervalStatus = true
                    this.holdInterval = setInterval(this.holdDrag, 50)
                } else {
                    if (this.holdStatus) {
                        clearInterval(this.holdInterval)
                        this.replaceCircle()
                    }
                    this.holdStatus = false
                }
            } else {
                if (this.holdStatus) {
                    clearInterval(this.holdInterval)
                    this.holdStatus = false
                    this.replaceCircle()
                }
            }
        },
        holdDrag() {
            bus.$emit('getHandPositions')
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
    border: 0.05rem solid $white;
    border-radius: 10rem;
    font-family: $mono;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}
.arrowCircle {
    width: 39px;
    height: 39px;
    transform: translateX(0px);
}
</style>
