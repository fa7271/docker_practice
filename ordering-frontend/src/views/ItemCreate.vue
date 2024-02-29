<template>
    <div class="container">
        <div class="page-header text-center" style="margin-top:20px;">
            <h1>상품등록</h1>
        </div>
        <form @submit.prevent="itemCreate">
            <div class="form-group">
                <label>상품명 :</label>
                <input type="text" class="form-control" v-model="name">
            </div>
            <div class="form-group">
                <label>cateogry :</label>
                <input type="text" class="form-control" v-model="cateogry">
            </div>
            <div class="form-group">
                <label>가격 :</label>
                <input type="number" class="form-control" v-model="price">
            </div>
            <div class="form-group">
                <label>재고수량 :</label>
                <input type="number" class="form-control" v-model="stockQuantity">
            </div>
            <div class="form-group">
                <label>상품이미지 :</label>
                <!-- @change와 @click 비교 
                click 은 클릭될때마다 함수실행
                change 는 해당 태그의 걉시 변할때 함수 실행
                -->
                <input type="file" class="form-control" accept="image/*" @change="fileUpload">
            </div>
            <button type="submit" class="btn btn-primary" mt-3>가입완료</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: "",
            cateogry: "",
            price: null,
            stockQuantity: null,
            itemImage: null
        }
    },
    methods: {
        fileUpload(event) {
            // event.target : 이벤트가 발생한 DOM요소를 가리키는 객체
            this.itemImage = event.target.files[0]
        },
        async itemCreate() {
            // multi-part formdata형식의 경우 new FormData를 통해 객체 생성
                const registerData = new FormData ()
                registerData.append("name",this.name)
                registerData.append("category",this.cateogry)
                registerData.append("price",this.price)
                registerData.append("stockQuantity",this.stockQuantity)
                registerData.append("itemImage",this.itemImage)

                const token = localStorage.getItem('token');
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/item/create`, registerData,{headers});
                this.$router.push("/items/manage")

        }
    }
}
</script>
