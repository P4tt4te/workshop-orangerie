<template>
    <section class="Experience">
        <SplashScreen
            v-if="mode !== 'experience'"
            @startExperience="startExperience"
        />
        <Previews
            v-if="mode === 'experience' && !isPortraitActive"
            :portraits="portraits"
            @showPortrait="showPortrait"
        />
        <Portrait
            v-if="portrait && isPortraitActive"
            :portrait="portrait"
            @closePortrait="closePortrait"
        />
    </section>
</template>

<script>
import portraits from '@/assets/data/portraits.json'

import SplashScreen from '@/components/SplashScreen.vue'
import Previews from '@/components/Previews.vue'
import Portrait from '@/components/Portrait.vue'

export default {
    components: {
        SplashScreen,
        Previews,
        Portrait,
    },
    data() {
        return {
            mode: 'splash',
            currentIndex: 0,
            isSplashScreenVisible: true,
            isPortraitActive: false,
            portrait: null,
            portraits,
        }
    },
    methods: {
        startExperience() {
            this.mode = 'experience'
        },
        showPortrait(index) {
            this.isPortraitActive = true
            this.portrait = this.portraits[index]
        },
        closePortrait(completedPortraitId) {
            this.portraits[completedPortraitId].isComplete = true
            this.isPortraitActive = false
        },
    },
}
</script>

<style lang="scss">
.Experience {
    height: 100%;
    width: 100%;
    background-color: transparent;
}
</style>
