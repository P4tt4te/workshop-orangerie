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
    </div>
</template>

<script>
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import cursor from '../assets/cursor.svg'
import cursorClick from '../assets/cursor-click.svg'

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
        canvasElement.width = innerWidth
        canvasElement.height = innerHeight
        this.init()
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
                minTrackingConfidence: 0.5,
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
                let newMousePosX = 0
                let newMousePosY = 0
                if (this.hand[0].x !== null && innerWidth !== null) {
                    newMousePosX = this.hand[0].x * innerWidth
                }
                this.mousePosX = newMousePosX
                if (this.hand[0].y !== null && innerHeight !== null) {
                    newMousePosY = this.hand[0].y * innerHeight
                }
                this.mousePosY = newMousePosY
                document.getElementById('cursor').style.top =
                    this.mousePosY - 100 + 'px'
                document.getElementById('cursor').style.left =
                    this.mousePosX - 50 + 'px'
            }
        },
        handGesture(results) {
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    const topFingerPoints = [
                        landmarks[8],
                        landmarks[12],
                        landmarks[16],
                        landmarks[20],
                    ]
                    const isclosed = (currentValue) =>
                        currentValue.y > this.hand[0].y
                    if (topFingerPoints.every(isclosed)) {
                        this.isHandClosed = true
                    } else {
                        this.isHandClosed = false
                    }
                }
            }
        },
        handleCursor() {
            if (this.isHandClosed) {
                document.getElementById(
                    'cursor'
                ).style.backgroundImage = `url(${cursorClick})`
            } else {
                document.getElementById(
                    'cursor'
                ).style.backgroundImage = `url(${cursor})`
            }
        },
    },
    watch: {
        isHandClosed: function (val) {
            if (val) {
                document
                    .elementFromPoint(this.mousePosX, this.mousePosY)
                    .click()
            }
        },
    },
}
</script>
<style lang="scss">
.container {
    position: fixed;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.input_video {
    display: none;
}
.output_canvas {
    width: 100%;
    height: 100%;
}

#cursor {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50vh;
    left: 50vw;
    z-index: 2;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
