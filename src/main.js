import Vue from 'vue'
import App from './App.vue'

import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pangination from '@/components/Pagination'
import { Button,MessageBox} from 'element-ui'

Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pangination.name,Pangination)
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import router from './router'

import store from '@/store'

import '@/mock/mockServe'

import 'swiper/css/swiper.css'

import * as API from '@/api'
import atm from '@/assets/atm.gif'
import VueLazyload from 'vue-lazyload' 


Vue.use(VueLazyload,{
  loading:atm
})
Vue.config.productionTip = false

import '@/plugins/validate'
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
