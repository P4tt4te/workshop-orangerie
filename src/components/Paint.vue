<template>
    <div :class="'paintContainer'">
        <img :class="'paint'" :src="image" alt="tableau" />
        <img :class="'sticker'" :src="sticker" alt="sticker" />
    </div>
</template>

<script>
import enfantdecoeur from '../assets/artwork/enfantdecoeur.jpg'
import sticker3 from '../assets/artwork/enfantdecoeur/sticker3.png'
import lafiancee from '../assets/artwork/lafiancee.jpg'
import lepetitpatissier from '../assets/artwork/lepetitpatissier.jpg'

export default {
    props: {
        variant: {
            validator: function (value) {
                return [
                    'enfantdecoeur' | 'lafiancee' | 'lepetitpatissier',
                ].includes(value)
            },
        },
    },
    data: function () {
        return {
            image: enfantdecoeur,
            sticker: sticker3,
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
.sticker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
}
</style>
