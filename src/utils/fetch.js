import axios from "axios";
import { baseUrl } from "./env";
import Vue from "vue";
import { Loading } from "element-ui";

const mynotify=()=>Vue.prototype.$notify.error({
  title: '提示',
  message: '网络或者系统有问题哟!'
});
// axios.defaults.timeout = 2000;
//拦截器
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err);
    mynotify()
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
      // myloading().close();
    return response;
  },
  err => {
    console.log(err);
    mynotify()
    return Promise.reject(err);
  }
);

const fetch = (url, method, data) => {
  if (method == "get") {
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (method == "delete") {
    return new Promise((resovle, reject) => {
      axios
        .delete(baseUrl + url, { params: data })
        .then(response => {
          resovle(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    return new Promise((resovle, reject) => {
      axios({
        method: method,
        url: baseUrl + url,
        data: data
      })
        .then(response => {
          resovle(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default fetch