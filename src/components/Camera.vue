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
        <div id="square"></div>
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
                    this.mousePosY + 'px'
                document.getElementById('cursor').style.left =
                    this.mousePosX + 'px'
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
                document.getElementById('cursor').style.display = 'block'
            } else {
                document.getElementById('cursor').style.display = 'none'
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
    },
    watch: {
        isHandClosed: function (val) {
            if (val) {
                this.sendEvent(true)
                document
                    .elementFromPoint(this.mousePosX, this.mousePosY)
                    .click()

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

#square {
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    background-color: red;
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
    z-index: 99999;
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
