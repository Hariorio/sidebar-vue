import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DatetimePicker from "vuetify-datetime-picker";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueJsonToCsv from 'vue-json-to-csv'
import JsonExcel from "vue-json-excel";
import VueI18n from 'vue-i18n';
import VueNativeNotification from 'vue-native-notification'
import VueChatScroll from 'vue-chat-scroll'


// Locales
import en from './translation/en.json';
import id from './translation/id.json';

window.axios = require('axios');

Vue.config.productionTip = false;
require("@/assets/styles/styles.css");
Vue.use(DatetimePicker);
Vue.use(VueJsonToCsv);
Vue.component("DownloadExcel", JsonExcel);
Vue.use(VueI18n);
Vue.use(VueNativeNotification, {
  requestOnNotify: true
})
Vue.use(VueChatScroll)
Vue.use(require('vue-moment'));

const messages = {
  en,
  id
};

const i18n = new VueI18n({
  locale: 'en', 
  fallbackLocale: 'en', 
  messages, 
});

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
