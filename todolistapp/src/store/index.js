import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        todolist: [
            { id: 1, todo: "영화", done: false },
            { id: 2, todo: "산책", done: true },
            { id: 3, todo: "학습", done: false },
            { id: 4, todo: "야구", done: false }
        ]
    },
    mutations: {
        [Constant.ADD_TODO]: (state, payload) => {
            if (payload.todo !== "") {
                state.todolist.push({ id: new Date().getTime(), todo: payload.todo, done: false });
            }
        },
        [Constant.DONE_TOGGLE]: (state, payload) => {
            var index = state.todolist.findIndex((item) => item.id === payload.id);
            state.todolist[index].done = !state.todolist[index].done;
        },
        [Constant.DELETE_TODO]: (state, payload) => {
            var index = state.todolist.findIndex((item) => item.id === payload.id);
            state.todolist.splice(index, 1);
        }
    },
    actions: {
        [Constant.ADD_TODO]: (store, payload) => {
            console.log("###addTODO!", payload);
            store.commit(Constant.ADD_TODO, payload);
        },
        [Constant.DONE_TOGGLE]: (store, payload) => {
            console.log("###doneTODO!", payload);
            store.commit(Constant.DONE_TOGGLE, payload);
        },
        [Constant.DELETE_TODO]: (store, payload) => {
            console.log("###deleteTODO!", payload);
            store.commit(Constant.DELETE_TODO, payload);
        }

    }
})

export default store;