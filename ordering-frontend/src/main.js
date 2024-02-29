import { createApp } from 'vue'
import store from './store/cart.js'
import App from './App.vue'
// starting 포인트라 필수 
import router from '@/router/index.js'
import '@/assets/css/bootstrap.min.css' // bootstrap import
import axios from 'axios'
// index.html의 id인 app에 마운트가 되도록 하는 코드
// createApp(App).mount('#app')
const app = createApp(App);

// 401 응답에 경우 interceptor 를 통해 공통적으로 토큰 제거 후 로그아웃 처리
axios.interceptors.response.use(response => response, error=>{
    if (error.response && error.response.status === 401){
        localStorage.clear();
        window.location.href = "/login"
    }
    else{
        return Promise.reject(error)
    }
})
// vue애플리케이션에서 전역적으로 기능 사용할 경우에 아래와 같이 use문법 사용
app.use(router);
app.use(store);
app.mount('#app');