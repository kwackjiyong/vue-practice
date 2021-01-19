<template>
  <div>
    <div>
      <h1>(주)OpenSG</h1>
      <nav>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <!-- <li><router-link to="/about">About</router-link></li> -->
          <span @click="nav()">About</span>
          <li><router-link to="/contacts">Contacts</router-link></li>

        </ul>
      </nav>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contacts from './components/Contacts.vue';
import ContactByNo from './components/ContactByNo.vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  mode:'history',
  routes : [
    {path:'/', name:'home', component:Home},
    {path:'/home', name:'home', component:Home},
    {path:'/about', name:'about', component:About},
    {path:'/contacts', name:'contacts', component:Contacts
    ,children :[
      {path:':no', name:'contactbyno', component:ContactByNo}
    ]
    }
  ]
})

export default{
  name : 'app',
  methods:{
    nav : function(){
      if(confirm("대하여 보시겠습니까?")){
        this.$router.push({name:'about'},function(){
          console.log("이동했습니다.");
        })
      }
    }
  },
  router
}

</script>


