<template>
  <div>
    <search placeholder="두글자 이상 입력해여"></search>
    <contact-list></contact-list>
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue';
import Search from './components/Search.vue';
export default{
  name : 'app',
  components: {Search,ContactList}
}

</script>