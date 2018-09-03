import axios from "axios";
import { MessageBox } from "element-ui";
const checkid = () => {
    axios.get("/api/App/GetLanguages").then(res => {
      })
      .catch(err => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          MessageBox.alert("您还没有登录云译通，请先注册或登录", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              location.href='home.html';
            }
          });
          deluser();
        }
      });
  };
  export {  checkid };