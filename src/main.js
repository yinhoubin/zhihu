// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jquery from 'jquery'
import moment from 'moment/moment'

import './common/font-awesome-4.7.0/css/font-awesome.css'
import 'animate.css'

Vue.config.productionTip = false

import commonCom from './components/common'
for(var i in commonCom){Vue.component(i,commonCom[i])};

import Filter from './filter'
for(var i in Filter){
  Vue.filter(i,Filter[i])
}
Vue.filter('moment', function (value, formatString) {
  formatString = formatString ||' MM-DD HH:mm';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});

Vue.prototype.$=jquery;
import axios from 'axios'
Vue.prototype.$http=axios;

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
