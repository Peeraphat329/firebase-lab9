import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const firebaseConfig = {
  apiKey: 'AIzaSyC9rTZsaaOFAcfCrqOOFxgY4SQhypSKQOA',
  authDomain: 'lab-9-firebase-bb725.firebaseapp.com',
  projectId: 'lab-9-firebase-bb725',
  storageBucket: 'lab-9-firebase-bb725.appspot.com',
  messagingSenderId: '1075906938290',
  appId: '1:1075906938290:web:5f813748094c966ab210ab'
}

const vuetify = createVuetify({
  components,
  directives
})
const initfriebase = initializeApp(firebaseConfig)
export const db = getFirestore(initfriebase)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
