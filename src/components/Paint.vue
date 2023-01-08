<template>
    <div :class="'paintContainer'">
        <img :class="'paint'" :src="image" alt="tableau" />
        <PingVue :top="617" :left="167" />
        <div :class="'sticker'">
            <img :class="'stickerFront'" :src="sticker3" alt="sticker" />
            <div :class="'stickerBack'"></div>
        </div>
    </div>
</template>

<script>
import PingVue from './Ping.vue'
import enfantdecoeur from '../assets/artwork/enfantdecoeur.jpg'
import enfantdecoeursticker3 from '../assets/artwork/enfantdecoeur/sticker3.png'
import enfantdecoeursticker2 from '../assets/artwork/enfantdecoeur/sticker2.png'
import lafiancee from '../assets/artwork/lafiancee.jpg'
import lepetitpatissier from '../assets/artwork/lepetitpatissier.jpg'

export default {
    components: {
        PingVue,
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
$top: 617px;
$left: 167px;

.paintContainer {
    height: 850px;
    width: fit-content;
    position: relative;
    &:hover .sticker {
        transform: translate3d($left, $top, 0) scale(1) rotate(0deg);
        transition-delay: 0s;
        opacity: 1;
        .stickerFront {
            height: 100px;
        }

        .stickerBack {
            top: 0;

            &:before {
                top: -100px;
            }
        }
    }
}
.paint {
    height: 100%;
    width: max-content;
}
.sticker {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: 0.2s 0.2s;
    transform: translate3d($left + 50px, $top + 50px, 0) scale(1.5)
        rotate(-45deg);
    opacity: 0;
}

.stickerBack,
.stickerFront {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.35s;

    &:before {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transition: 0.35s;
    }
}

.stickerFront {
    height: 0;
}
.stickerBack {
    top: 100px;
    overflow: hidden;

    &:before {
        background-color: #f7e5c0;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.4);
        top: 0;
    }
}
</style>
