import { createRouter,createWebHistory } from "vue-router";
import ItemList from '@/views/ItemList.vue'
import LoginComponent from '@/views/LoginComponent.vue'
// export default 인 경우에는 {} 필요없고, 여러개 요소가 있을경우네는 {} 필요
import {memberRoutes} from './memberRouter.js'
import {orderRoutes} from './orderRouter.js'
import {itemRoutes} from './itemRouter.js'
import BasicComponent from '@/components/BasicComponent.vue'
const routes = [
    {   
        // 라우터 경로
        path : '/',
        // 라우터 이름
        name : 'HOME',
        // 넣을 component
        component:ItemList
    },
    
    {
        path:'/login',
        name : 'Login',
        component: LoginComponent,
    },
    {
        path:'/basic',
        name : 'basic',
        component: BasicComponent,
    },
    // ... 은 스프레드 연산자로 불린다 주로 배열 요소를 다른 배열요소에 합할때 사용된다
    ...memberRoutes,
    ...orderRoutes,
    ...itemRoutes
]
const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공한다.
    // 1) history: createWebHashHistory, createHashHistory
    history: createWebHistory(),
    routes
    }
)
export default router;