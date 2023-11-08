// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './element'
import axios from 'axios'
import Message from 'element-ui'


Vue.prototype.$axios = axios
Vue.config.productionTip = false


axios.interceptors.request.use(config => {
    if(config.url.includes("uploadUrl"))
    {
      console.log("interceptor change headers start here");
    }
    return config;
  },
    error => {
        console.log("interceptor errors here");
        return Promise.reject(error);
    }
  );

axios.interceptors.response.use((response) => {
  console.log(response);
  let rspCode = response.status;//http状态码200的也要放行
  let code = response.data.status;
  if (code == "200" || rspCode == 200)
  {
    return response;
  }
  else
  {
    // 状态码
    switch (response.data.status) {
      case 404:
        Vue.prototype.$message({ type: 'error', message: '请求路径不存在', showClose: true, customClass: 'messageBox'});
        break;
      case 400:
        Vue.prototype.$message({ type: 'error', message: '请求参数有误', showClose: true, customClass: 'messageBox'});
        break;
      case 403:
        Vue.prototype.$message({ type: 'error', message: '鉴权失败,请联系管理员!', showClose: true, customClass: 'messageBox'});
      case 500:
        Vue.prototype.$message({ type: 'error', message: '服务器接口异常', showClose: true, customClass: 'messageBox'});
        break;
      default:
        Vue.prototype.$message({ type: 'error', message: '服务端返回未知错误', showClose: true, customClass: 'messageBox'});
        break;
  }
}
}, error => {
  Vue.prototype.$message({ type: 'error', message: '接口访问异常', showClose: true, customClass: 'messageBox'});
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
