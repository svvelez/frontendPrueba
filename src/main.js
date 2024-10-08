import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Vuesax from 'vuesax'
import VueSweetalert2 from 'vue-sweetalert2';
import 'vuesax/dist/vuesax.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.config.productionTip = false
Vue.use(Vuesax, {
  // options here
})
Vue.use(VueSweetalert2)
new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
