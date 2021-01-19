<template>
    <div>
        <table border="1">
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>사진</th>
            </tr>
            <tr v-for="contact in contacts" :key="contact.no">
                <td>{{contact.no}}</td>
                <td>{{contact.name}}</td>
                <td><img :src="contact.photo"/></td>
            </tr>
        </table>
    </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
    name:"contact-list",
    computed:mapState(['contacts'])    
}
</script>