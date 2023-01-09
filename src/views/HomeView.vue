<template>
    <main class="Home">
        <Experience />
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
    </main>
</template>

<script>
import Experience from '@/components/Experience.vue'
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

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
        console.log(canvasElement.width, innerWidth)
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
            this.ctx.restore()
        },
        async drawHands(results) {
            if (results.multiHandLandmarks) {
                for (const landmarks of results.multiHandLandmarks) {
                    this.hand = [landmarks[9]]
                }
                let handX = this.hand[0].x * innerWidth
                let handY = this.hand[0].y * innerHeight
                // this.ctx.beginPath()
                // this.ctx.arc(handX, handY, 40, 0, 2 * Math.PI)
                // this.ctx.fill()
                document.getElementById('div1').style.top = handY + 'px'
                document.getElementById('div1').style.left = handX + 'px'

                const model = handPoseDetection.SupportedModels.MediaPipeHands
                const detectorConfig = {
                    runtime: 'mediapipe', // or 'tfjs',
                    modelType: 'full',
                }
                const detector = await handPoseDetection.createDetector(
                    model,
                    detectorConfig
                )

                const video = document.getElementById('video')
                await detector.estimateHands(video)
            }
        },
    },
}
</script>
<style lang="scss">
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

#div1 {
    width: 100px;
    height: 100px;
    background: green;
    position: absolute;
    top: 50vh;
    left: 50vw;
    transform: translate(-50%, 50%);
}

button {
    position: absolute;
    top: 20vh;
    left: 20vw;
}
</style>
