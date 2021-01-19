import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        contacts: []
    },
    actions: {
        [Constant.SEARCH_CONTACT]: (store, payload) => {
            axios.get(Constant.BASE_URL + payload.name)
                .then((response) => {
                    store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
                })
        }
    },
    mutations: {
        [Constant.SEARCH_CONTACT]: (state, payload) => {
            state.contacts = payload.contacts;
        }
    }
})


export default store;