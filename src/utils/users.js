import axios from "axios";
import { MessageBox } from "element-ui";
const checkid = () => {
    axios.get("/api/App/GetLanguages").then(res => {
      })
      .catch(err => {
        // console.log(err.response.status);
        if (err.response.status === 401) {
          let title = '提示';
          let message = '您还没有登录云译通，请先注册或登录';
          let btnText = '确定';
          switch (localStorage.getItem('langinfo')) {
            case 'ko':
              title = '프롬프트';
              message = '아직 CTC에 로그인하지 않으며,우선 등록하거나 로그인하십시오';
              btnText = '확인';
              break;
            default:
              title = '提示';
              message = '您还没有登录云译通，请先注册或登录';
              btnText = '确定';
              break;
          }

          MessageBox.alert(message, title, {
            confirmButtonText: btnText,
            callback: action => {
              location.href='home.html';
            }
          });
          deluser();
        }
      });
  };
  export {  checkid };
