import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import HighchartsVue from "highcharts-vue";
import Highcharts from 'highcharts'
import Maps from "highcharts/modules/map";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/default.css'
Vue.use(ElementUI);
Maps(Highcharts)
Vue.use(HighchartsVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
