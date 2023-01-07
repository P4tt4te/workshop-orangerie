<template>
    <div class="Portrait">
        <div class="Portrait__meta">
            <h2>{{ portrait.title }}</h2>
            <p>{{ portrait.date }}</p>
            <p>{{ portrait.id }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        portrait: Object,
    },
}
</script>

<style lang="scss">
.Portrait {
    border: 0.1rem solid $grey;
    height: 100%;
    width: 100%;

    &:not(:last-child) {
        margin-right: 2rem;
    }
}
</style>
