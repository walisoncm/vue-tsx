import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'gmap-vue'
import './registerServiceWorker'

import './assets/main.scss'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB9l6QNB1t7NvYBf65jJW7qH7eZmsPq0TI',
    libraries: 'places, maps, geocode'
  },
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
