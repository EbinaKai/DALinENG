import { createApp } from 'vue'
import store from './store/index'
import './style.css'
import router from './route/index'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faPenToSquare, faFloppyDisk, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faPenToSquare, faFloppyDisk, faArrowLeft, faTrash)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(store)
.mount('#app')