import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/composition-api'
import './plugins/buefy'
import './assets/sass/global.sass'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
