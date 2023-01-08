<template>
    <div>
        <img :src="image" alt="sticker" />
        <div></div>
    </div>
</template>
<script>
export default {
    props: {
        image: String,
        top: Number,
        left: Number,
    },
}
</script>
<style lang="scss"></style>
