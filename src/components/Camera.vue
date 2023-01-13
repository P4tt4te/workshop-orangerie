<template>
    <div class="container">
        <video
            class="input_video"
            id="video"
            ref="input_video"
            width="100%"
            height="100%"
        ></video>

        <canvas
            class="output_canvas"
            ref="output_canvas"
            :width="width"
            :height="height"
        ></canvas>
        <div id="cursor"></div>
        <div id="timer">
            <div class="warningSign">!</div>
            <div class="timerText">
                <span class="time"
                    >{{ this.timeBeforeRestart }} sec avant relance</span
                >
                <span>Aucune main détectée</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import cursor from '../assets/cursor.svg'
import cursorClick from '../assets/cursor-click.svg'
import { bus } from '../main'

export default {
    data: function () {
        return {
            number: null,
            ctx: null,
            width: null,
            height: null,
            hand: [
                {
                    x: 0,
                    y: 0,
                },
            ],
            mousePosX: 0,
            mousePosY: 0,
            isHandClosed: false,
            clickStatus: false,
            timeBeforeRestart: 40,
            timerId: null,
        }
    },
    computed: {
        inputVideo() {
            return this.$refs.input_video
        },
    },
    mounted() {
        this.ctx = this.$refs.output_canvas.getContext('2d')
        const canvasElement =
            document.getElementsByClassName('output_canvas')[0]
        const canvasvals = canvasElement.getBoundingClientRect()
        canvasElement.width = canvasvals.width
        canvasElement.height = canvasvals.height
        this.init()
    },
    created() {
        bus.$on('getHandPositions', () => {
            let positions = this.getPosition()
            bus.$emit('sendHandPositions', positions)
        })
    },
    methods: {
        init() {
            const hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
                },
            })
            hands.setOptions({
                maxNumHands: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.9,
                modelComplexity: 1,
                selfieMode: true,
            })
            hands.onResults(this.onResults)
            const camera = new Camera(this.inputVideo, {
                onFrame: async () => {
                    await hands.send({ image: this.inputVideo })
                },
            })
            camera.start()
        },
        onResults(results) {
            this.width = results.image.width
            this.height = results.image.height
            this.ctx.save()
            this.ctx.clearRect(0, 0, results.image.width, results.image.height)
            this.ctx.drawImage(
                results.image,
                0,
                0,
                results.image.width,
                results.image.height
            )
            this.drawHands(results)
            this.handGesture(results)
            this.handleCursor()
            this.ctx.restore()
        },
        async drawHands(results) {
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    this.hand = [landmarks[9]]
                }
                let wrapperPositions = document
                    .getElementsByClassName('Experience')[0]
                    .getBoundingClientRect()
                let newMousePosX = wrapperPositions.x
                let newMousePosY = wrapperPositions.y
                if (this.hand[0].x !== null && innerWidth !== null) {
                    newMousePosX =
                        wrapperPositions.x +
                        this.hand[0].x * wrapperPositions.width
                }
                this.mousePosX = newMousePosX
                if (this.hand[0].y !== null && innerHeight !== null) {
                    newMousePosY =
                        wrapperPositions.y +
                        this.hand[0].y * wrapperPositions.height
                }
                this.mousePosY = newMousePosY
                document.getElementById('cursor').style.top =
                    this.mousePosY - 15 + 'px'
                document.getElementById('cursor').style.left =
                    this.mousePosX - 15 + 'px'
            }
        },
        handGesture(results) {
            if (
                results.multiHandLandmarks &&
                results.multiHandLandmarks.length != 0
            ) {
                for (const landmarks of results.multiHandLandmarks) {
                    var A = landmarks[12]
                    var B = landmarks[9]
                    var M = landmarks[0]

                    var AB = B.x - A.x + (B.y - A.y)
                    var AM = M.x - A.x + (M.y - A.y)

                    if (Math.sign(AB) === Math.sign(AM)) {
                        this.isHandClosed = false
                    } else {
                        this.isHandClosed = true
                    }
                }
                if (this.timeBeforeRestart <= 40 && this.timerId !== null) {
                    clearInterval(this.timerId)
                    if (
                        document
                            .querySelector('#timer')
                            .classList.contains('active')
                    ) {
                        document
                            .querySelector('#timer')
                            .classList.remove('active')
                    }
                    this.timeBeforeRestart = 40
                    this.timerId = null
                }
                document.getElementById('cursor').style.display = 'block'
            } else {
                if (this.timeBeforeRestart === 40 && this.timerId === null) {
                    let timerClock = setInterval(() => this.setTimer(), 1000)
                    this.timerId = timerClock
                }
                document.getElementById('cursor').style.display = 'none'
            }
        },
        setTimer() {
            this.timeBeforeRestart--
            if (this.timeBeforeRestart === 13) {
                document.querySelector('#timer').classList.add('active')
            }
            if (this.timeBeforeRestart < 1) {
                this.$router.go()
            }
        },
        handleCursor() {
            if (this.isHandClosed) {
                document.getElementById(
                    'cursor'
                ).style.backgroundImage = `url(${cursorClick})`
                document.getElementById('cursor').style.backgroundSize =
                    '30px 35px'
            } else {
                document.getElementById(
                    'cursor'
                ).style.backgroundImage = `url(${cursor})`
                document.getElementById('cursor').style.backgroundSize = 'cover'
            }
        },
        sendEvent(value) {
            bus.$emit('isHandClosed', {
                status: value,
                x: this.mousePosX,
                y: this.mousePosY,
            })
        },
        getPosition() {
            return {
                x: this.mousePosX,
                y: this.mousePosY,
            }
        },
        setStatus() {
            let clickTimeout = setTimeout(() => {
                this.clickStatus = false
                clearTimeout(clickTimeout)
            }, 500)
        },
    },
    watch: {
        isHandClosed: function (val) {
            if (val && this.clickStatus === false) {
                this.sendEvent(true)
                document
                    .elementFromPoint(this.mousePosX, this.mousePosY)
                    .click()
                this.clickStatus = true
                this.setStatus()
                let d = document.createElement('div')
                d.className = 'clickEffect'
                d.style.top = this.mousePosY + 60 + 'px'
                d.style.left = this.mousePosX + 40 + 'px'
                document.body.appendChild(d)
                d.addEventListener(
                    'animationend',
                    function () {
                        d.parentElement.removeChild(d)
                    }.bind(this)
                )
            } else {
                this.sendEvent(false)
            }
        },
    },
}
</script>
<style lang="scss">
.container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
}

#timer.active {
    opacity: 1;
}

#timer {
    position: absolute;
    bottom: 50px;
    left: 50px;
    display: flex;
    padding: 1rem 1.5rem 1rem 1.5rem;
    gap: 1rem;
    font-family: $mono;
    font-size: 1.2rem;
    background-color: $orange;
    text-transform: uppercase;
    color: $black;
    font-weight: 600;
    letter-spacing: 0.1rem;
    border-radius: 50rem;
    opacity: 0;
    transition: 3s ease-in-out;

    & .timerText {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        & .time {
            font-size: 1.6rem;
        }
    }

    & .warningSign {
        color: $orange;
        background-color: $black;
        height: 39px;
        width: 39px;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.input_video {
    display: none;
}
.output_canvas {
    width: 20%;
    height: 20%;
    opacity: 0.5;
}

#cursor {
    position: fixed;
    top: 50vh;
    left: 50vw;
    width: 35px;
    height: 45px;
    z-index: 10;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
}

div.clickEffect {
    position: fixed;
    box-sizing: border-box;
    border-style: solid;
    border-color: #ffffff;
    border-radius: 50%;
    animation: clickEffect 1s ease-out;
    z-index: 11;
}

@keyframes clickEffect {
    0% {
        opacity: 1;
        width: 0.5em;
        height: 0.5em;
        margin: -2em;
        border-width: 0.5em;
    }
    100% {
        opacity: 0.2;
        width: 10em;
        height: 10em;
        margin: -7em;
        border-width: 0.03em;
    }
}
</style>
