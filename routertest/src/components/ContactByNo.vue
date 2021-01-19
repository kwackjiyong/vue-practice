<template>
    <div>
        <h1>연락처 상세</h1>
        <div>
            <table border="1">
                <tr>
                   <td>일련변호</td> 
                   <td>{{contact.no}}</td>
                </tr>
                <tr>
                   <td>이름</td> 
                   <td>{{contact.name}}</td>
                </tr>
                <tr>
                   <td>전화</td> 
                   <td>{{contact.tel}}</td>
                </tr>
                <tr>
                   <td>주소</td> 
                   <td>{{contact.address}}</td>
                </tr>
            </table>
            <router-link :to="'/contacts/'+(parseInt(contact.no)+1).toString()">다음</router-link>
        </div>
    </div>
</template>

<script>
import contactlist from '../ContactList';
export default{
    name : 'contactbyno',
    data : function(){
        return {
            no : 0,
            contacts : contactlist.contacts
        }
    },
    created : function(){
        this.no = this.$route.params.no;
    },
    computed : {
        contact : function(){
            var no = this.no;
            var arr = this.contacts.filter(function(item){
                return item.no == no;
            });
            if(arr.length == 1) return arr[0];
            else return {};
        }
    }
}
</script>