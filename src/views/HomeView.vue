<template>
    <main class="Home">
        <Experience />
        <CameraComponent />
    </main>
</template>

<script>
import Experience from '@/components/Experience.vue'
import CameraComponent from '@/components/Camera.vue'
import { Pane } from 'tweakpane'

export default {
    name: 'HomeView',
    components: {
        Experience,
        CameraComponent,
    },
    data: function () {
        const DEFAULTPARAMS = {
            perspective: 500,
            scale: 1,
            translateX: 0,
            translateY: 0,
            skewX: 0,
            skewY: 0,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            color: '#ff0055',
        }

        return {
            PARAMS: DEFAULTPARAMS,
        }
    },
    mounted() {
        let tab = window.location.href.split('#')
        if (tab.length > 0 && tab[tab.length - 1] === 'debug') {
            const app = document.getElementsByClassName('Experience')[0]
            this.initPane(app)
        }
    },
    methods: {
        initPane($app) {
            const pane = new Pane({
                title: 'Positioning',
                expanded: true,
            })

            const pScale = pane.addInput(this.PARAMS, 'scale', {
                min: 0.1,
                max: 1.5,
                step: 0.1,
            })
            const pTranslateX = pane.addInput(this.PARAMS, 'translateX', {
                min: -1000,
                max: 1000,
                step: 10,
            })
            const pTranslateY = pane.addInput(this.PARAMS, 'translateY', {
                min: -700,
                max: 700,
                step: 10,
            })
            const pRotate = pane.addInput(this.PARAMS, 'rotate', {
                min: -0.02,
                max: 0.02,
                step: 0.001,
            })
            pane.addSeparator()
            const pSkewX = pane.addInput(this.PARAMS, 'skewX', {
                min: -15,
                max: 15,
                step: 0.5,
            })
            const pSkewY = pane.addInput(this.PARAMS, 'skewY', {
                min: -15,
                max: 15,
                step: 0.5,
            })
            pane.addSeparator()
            const pPerspective = pane.addInput(this.PARAMS, 'perspective', {
                min: 80,
                max: 1024,
                step: 1,
                label: 'depth',
            })
            const pRotateX = pane.addInput(this.PARAMS, 'rotateX', {
                min: -0.02,
                max: 0.02,
                step: 0.001,
            })
            const pRotateY = pane.addInput(this.PARAMS, 'rotateY', {
                min: -0.02,
                max: 0.02,
                step: 0.001,
            })

            pPerspective.on('change', (ev) => {
                this.transform({ ...this.PARAMS, perspective: ev.value })
            })
            pScale.on('change', (ev) => {
                this.transform({ ...this.PARAMS, scale: ev.value })
            })
            pTranslateX.on('change', (ev) => {
                this.transform({ ...this.PARAMS, translateX: ev.value })
            })
            pTranslateY.on('change', (ev) => {
                this.transform({ ...this.PARAMS, translateY: ev.value })
            })
            pSkewX.on('change', (ev) => {
                this.transform({ ...this.PARAMS, skewY: ev.value })
            })
            pSkewY.on('change', (ev) => {
                this.transform({ ...this.PARAMS, skewY: ev.value })
            })
            pRotate.on('change', (ev) => {
                this.transform({ ...this.PARAMS, rotate: ev.value })
            })
            pRotateX.on('change', (ev) => {
                this.transform({ ...this.PARAMS, rotateX: ev.value })
            })
            pRotateY.on('change', (ev) => {
                this.transform({ ...this.PARAMS, rotateY: ev.value })
            })

            pane.addSeparator()
            const pColor = pane.addInput(this.PARAMS, 'color')
            pColor.on('change', (ev) => {
                $app.style.borderColor = ev.value
            })

            pane.addSeparator()
            const pFull = pane.addButton({
                title: 'full screen',
            })

            function toggleFullScreen() {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen()
                } else if (document.exitFullscreen) {
                    document.exitFullscreen()
                }
            }

            pFull.on('click', () => {
                toggleFullScreen()
            })

            const pClose = pane.addButton({
                title: 'close',
            })

            pClose.on('click', () => {
                pane.dispose()
            })
        },
        transform(params) {
            let home = document.getElementsByClassName('Experience')[0]

            home.style.transform = `
            perspective(${params.perspective}px)
            scale(${params.scale})
            translateX(${params.translateX}px)
            translateY(${params.translateY}px)
            skewX(${params.skewX}deg)
            skewY(${params.skewY}deg)
            rotate(${params.rotate}turn)
            rotateX(${params.rotateX}turn)
            rotateY(${params.rotateY}turn)
            `
        },
    },
}
</script>

<style lang="scss">
.Home {
    position: relative;
    height: 100vh;
}
</style>
