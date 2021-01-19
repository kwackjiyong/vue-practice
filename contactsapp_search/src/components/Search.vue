<template>
    <p>
        이름 : <input type="text" v-model.trim="name" placeholder="두글자 이상 입력" @keyup.enter="keyupEvent"/>
        <span v-show="length_list">   총 {{length_list}}개의 결과를 찾았습니다.</span>
    </p>

    
</template>
<script>
import Constant from '../Constant';
export default {
    name: 'search',
    data:function(){
        return {name:''};
    },
    computed:{
        length_list(){
            return this.$store.state.contacts.length;
        }
    },
    methods :{
        keyupEvent:function(e){
            var val = e.target.value;
            if(val.length >=2){
                this.$store.dispatch(Constant.SEARCH_CONTACT, {name:val});
                this.name = "";
            }else{
                this.$store.dispatch(Constant.SEARCH_CONTACT,{name:''});
            }
        }
    }

}
</script>