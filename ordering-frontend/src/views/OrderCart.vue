<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top: 20px"><h1>장바구니 목록</h1></div>
        <div class="d-flex justify-content-between">
            <button class="btn btn-secondary" @click="clearCart">장바구니 비우기</button>
            <button class="btn btn-success" @click="placeOrder">주문하기</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>제품id</th>
                    <th>제품명</th>
                    <th>주문수량</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getcartItems" :key="item.itemId">
                    <td>{{item.itemId}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import axios from 'axios';
export default {
    computed: {
        ...mapGetters(['getcartItems','getTotalQuantity'])
    },
    methods:{
        ...mapActions(['clearCart']),
        clearCart(){
            this.$store.dispatch('clearCart')
        },
        async placeOrder() {
            const orderItems = this.getcartItems.map(item=> {
                return {itemId :item.itemId ,count:item.count}
            })
            if(!confirm(`${this.getTotalQuantity}개의 상품을 주문하시겠습니까 `)){
                console.log("주문이 취소됐습니다")
                return
            }
            if(this.getTotalQuantity < 1){
                alert("물건 이 없어요")
            }
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            try {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderItems, { headers })
                console.log(orderItems)
                alert("주문 완료 되었습니다.")
                this.$store.commit('clearCart')
            } catch (error) {
                console.log(error)
                alert("주문이 실패되었습니다. ")
            }

        },
    }
}
</script>