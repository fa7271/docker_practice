<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top:20px;"><h1>회원 정보</h1></div>
        <table class="table">
                    <tr>
                        <td>이름</td>
                        <td>{{ myOrder.id }}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>{{ myOrder.email }}</td>
                    </tr>
                    <tr>
                        <td>도시</td>
                        <td>{{ myOrder.city}}</td>
                    </tr>
                    <tr>
                        <td>상세주소</td>
                        <td>{{ myOrder.street}}</td>
                    </tr>
                    <tr>
                        <td>우편번호</td>
                        <td>{{myOrder.zipcode}}</td>
                    </tr>
        </table>
    </div>
    <OrderListComponent
    apiUrl="/member/myorders"
    />
</template>

<script>
import OrderListComponent from '@/components/OrderListComponent.vue';
import axios from 'axios';
export default {
    components:{
        OrderListComponent
    },
    data(){
        return{
            myOrder: {},
        }
    },
    created(){
        this.fetchMember()
        
    },
    methods:{
        async fetchMember(){
            try{
        const token = localStorage.getItem('token');
        const headers = token ? {Authorization: `Bearer ${token}`} : {};
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`, {headers});
        this.myOrder = response.data;
        }catch(error){
            console.log(error)
        }
        }
    }
}
</script>

