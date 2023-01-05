<script setup>
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
    <div id="app">
        <header>
            <div class="wrapper">
                <HelloWorld msg="You did it!" />

                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                </nav>
            </div>
        </header>

        <router-view />
    </div>
</template>
