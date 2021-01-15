<template>
    <div>
        <div class="header">
            <h1 class="headerText">(주) OpenSG</h1>
            <nav>
                <ul>
                    <li>
                        <a href="#" @click="changeMenu('home')">Home</a>
                    </li>
                    <li>
                        <a href="#" @click="changeMenu('about')">about</a>
                    </li>
                    <li>
                        <a href="#" @click="changeMenu('contact')">contact</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container">
            <keep-alive include="about,home">
              <component v-bind:is="currentView"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

export default {
  name: 'App',
  components : {Home, About, Contact},
  data(){
    return { currentView: 'home' }
  },
  methods : {
    changeMenu(view){
      this.currentView = view;
    }
  }
}
</script>