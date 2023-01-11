<template>
    <section class="SplashScreen">
        <header class="header">
            <div class="header__logo">
                <img src="@/assets/svg/gobelins-logo.svg" />
            </div>
            <div class="header__logo">
                <img src="@/assets/svg/orangerie-logo.svg" />
            </div>
        </header>
        <div class="content">
            <div class="content__logo">
                <img
                    src="@/assets/svg/app-logo.svg"
                    alt="Les portraits de Soutine"
                />
            </div>
        </div>
        <div class="background">
            <div class="background__portrait" v-for="n in 5">
                <img
                    :src="'src/assets/img/splash/' + (n - 1) + '.jpg'"
                    alt=""
                />
            </div>
        </div>
        <SlideButton
            name="Démarrer l'expérience"
            :on-validate="startExperience"
        />
    </section>
</template>
<script>
import SlideButton from './SlideButton.vue'

export default {
    components: {
        SlideButton,
    },
    methods: {
        startExperience() {
            console.log('yes')
            this.$emit('startExperience')
        },
    },
}
</script>
<style lang="scss">
.SplashScreen {
    height: 100vh;
    padding: 6rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .header {
        display: flex;

        &__logo {
            height: 8rem;

            &:not(:last-child) {
                margin-right: 3rem;
            }

            img {
                width: auto;
            }
        }
    }

    .content {
        &__logo {
            height: 20rem;

            img {
                width: auto;
            }
        }
    }

    .background {
        z-index: -10;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &__portrait {
            opacity: 0.3;
            position: absolute;
            transform: scale(0.8);
            animation: orbit 8s linear infinite;

            &:nth-child(1) {
                top: 5%;
                left: 30%;
            }

            &:nth-child(2) {
                top: 5%;
                left: 55%;
            }

            &:nth-child(3) {
                top: 40%;
                left: 20%;
            }

            &:nth-child(4) {
                top: 30%;
                left: 35%;
            }

            &:nth-child(5) {
                top: 40%;
                left: 70%;
            }

            &:nth-child(6) {
                top: 30%;
                left: 0%;
            }
        }
    }
}
</style>
