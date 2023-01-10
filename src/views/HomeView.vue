<template>
    <fragment>
        <main class="Home">
            <Experience />
        </main>
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
            <div id="div1"></div>
            <button>coucou</button>
        </div>
    </fragment>
</template>

<script>
import Experience from '@/components/Experience.vue'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

import cursor from '../assets/cursor.svg'
import cursorClick from '../assets/cursor-click.svg'

export default {
    name: 'HomeView',
    components: {
        Experience,
    },
    data: function () {
        return {
            number: null,
            ctx: null,
            width: null,
            height: null,
            hand: null,
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
                this.mousePosX = this.hand[0].x * innerWidth
                this.mousePosY = this.hand[0].y * innerHeight
                document.getElementById('cursor').style.top =
                    this.mousePosY - 200 + 'px'
                document.getElementById('cursor').style.left =
                    this.mousePosX - 100 + 'px'
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
        handleClick() {
            document.querySelector('button').style.background =
                '#' + Math.floor(Math.random() * 16777215).toString(16)
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
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.Home {
    position: relative;
    height: 100vh;
}

body {
    margin: 0;
}
.input_video {
    display: none;
}
.output_canvas {
    width: 100vw;
    height: 100vh;
}

#cursor {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50vh;
    left: 50vw;
    z-index: 2;
    background-repeat: no-repeat;
    background-size: cover;
}

button {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 20vh;
    left: 20vw;
}
</style>
