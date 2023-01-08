<template>
    <div :class="'paintContainer'">
        <img :class="'paint'" :src="image" alt="tableau" />
        <PaintHoleVue :top="425" :left="254" :image="sticker2" />
        <PaintHoleVue :top="617" :left="167" :image="sticker3" />
    </div>
</template>

<script>
import PaintHoleVue from './PaintHole.vue'
import enfantdecoeur from '../assets/artwork/enfantdecoeur.jpg'
import enfantdecoeursticker3 from '../assets/artwork/enfantdecoeur/sticker3.png'
import enfantdecoeursticker2 from '../assets/artwork/enfantdecoeur/sticker2.png'
import lafiancee from '../assets/artwork/lafiancee.jpg'
import lepetitpatissier from '../assets/artwork/lepetitpatissier.jpg'

export default {
    components: {
        PaintHoleVue,
    },
    props: {
        variant: {
            validator: function (value) {
                return [
                    'enfantdecoeur',
                    'lafiancee',
                    'lepetitpatissier',
                ].includes(value)
            },
        },
    },
    data: function () {
        return {
            image: enfantdecoeur,
            sticker3: enfantdecoeursticker3,
            sticker2: enfantdecoeursticker2,
        }
    },
}
</script>

<style lang="scss">
.paintContainer {
    height: 850px;
    width: fit-content;
    position: relative;
}
.paint {
    height: 100%;
    width: max-content;
}
</style>
