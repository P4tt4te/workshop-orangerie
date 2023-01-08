<template>
    <section class="Hub">
        <div><PaintVue :variant="'enfantdecoeur'" /></div>
        <div>Portrait 2</div>
        <div>Portrait 3</div>
    </section>
</template>

<script>
import PaintVue from './Paint.vue'

export default {
    components: {
        PaintVue,
    },
}
</script>

<style lang="scss"></style>
