<template>
    <div id="app">
        <div class="container">
            <div class="form-group">
                <button @click="fetchContacts">1페이지 연락처 조회</button>
            </div>
            <br>
            <div class="form-group">
                <input type="text" v-model="name" placeholder="이름"/>
                <input type="text" v-model="tel" placeholder="전번"/>
                <input type="text" v-model="address" placeholder="주소"/>
                <button @click="addContact">연락처 1건 추가</button>
            </div>
            <br>
            <div class="form-group">
                <input type="text" v-model="no" /><button @click="fetchContactOne">연락처1건 조회</button>
            </div>
            <br>
            <div class="form-group">
                <input type="text" v-model="no"/>
                <input type="text" v-model="name" placeholder="이름"/>
                <input type="text" v-model="tel" placeholder="전번"/>
                <input type="text" v-model="address" placeholder="주소"/>
                <button @click="updateContact">수정</button>
            </div>
            <br>
            <div class="form-group">
                <input type="text" v-model="no"/><button @click="deleteContact">삭제</button>
            </div>
            <br>
            <div class="form-group">
                <input type="text" v-model="no" />
                <input type="file" ref ="photofile" name="photo"/>
                <button @click="changePhoto">파일 변경</button>
            </div>
        </div>
        <span>JSON 출력</span>
        <div id="result" class="container">
            <xmp>{{result}}</xmp>
        </div>
    </div>
</template>

<script>

export default {
    name: "app",
    data(){
        return {
            no : 0, name: '', tel: '', address:'',result:null
        }
    },
    methods:{
        fetchContacts: function(){
            this.$axios({
                method:'GET',
                url:'/api/contacts',
                params:{pageno :1,pagesize:5}
            })
            .then((response) => {
                console.log(response);
                this.result = response.data;
            })
            .catch((ex)=>{
                console.log("ERROR!!!!:",ex);
            })

            
        },
        addContact:function(){
            this.$axios.post('/api/contacts',{ name:this.name,tel:this.tel,address:this.address})
            .then((response)=>{
                console.log(response);
                this.no=0;
                this.result = response.data;
            }).catch((ex)=>{
                console.log("ERROR!! : ",ex);
            })

        },
        fetchContactOne:function(){
            this.$axios.get('/api/contacts/'+this.no)
            .then((response)=>{
                console.log(response);
                console.log(response.data);
                this.result = response.data;
            })
        },
        updateContact:function(){
            this.$axios.put('api/contacts/'+this.no, {name:this.name,tel:this.tel,address:this.address})
            .then((response)=>{
                console.log(response);
                this.name="";
                this.tel="";
                this.address="";
                this.result=response.data;
            })
            .catch((ex)=>{
                console.log("ERROR!! :",ex);
            })
        },
        deleteContact:function(){

        },
        changePhoto:function(){

        }
    }
}
</script>