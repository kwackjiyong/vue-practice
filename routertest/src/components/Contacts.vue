<template>
    <div>
        <h1>연락처</h1>
        <div>
            <div v-for="c in contacts" :key="c.no">
                <router-link :to="{name:'contactbyno',params:{no:c.no}}">{{c.name}}</router-link>
            </div>

        </div>
    </div>
</template>

<script>
import contactlist from '../ContactList';
export default {
    name :"contacts",
    data : function(){
        return {
            contacts : contactlist.contacts
        }
    }
}
</script>