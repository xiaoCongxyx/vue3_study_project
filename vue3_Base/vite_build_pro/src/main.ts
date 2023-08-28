import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import registerDirectives from "./directives"


let app = createApp(App)
registerDirectives(app)

app.mount('#app')
