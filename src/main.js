import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/fonts/basiercircle/styles.css'
import '@/assets/fonts/basiercircle-mono/styles.css'
import '@/assets/fonts/apple-garamond/styles.css'

export const bus = new Vue()

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app')
