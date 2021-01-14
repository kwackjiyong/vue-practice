<template>
    <ul>
        <li 
            v-for="a in todolist" 
            :key="a"
            :class="checked(a.done)" 
            @click="doneToggle(a.id)"
            >
            <span>{{ a.todo }}</span>
            <span v-if="a.done"> (완료)</span>
            <span class="close" @click.stop="deleteTodo(a.id)">&#x00D7;</span>
        </li>
    </ul>
</template>
<script>

import eventBus from '../EventBus'

export default {
    created: function() {
            eventBus.$on('add-todo', this.addTodo);
        },
        data: function() {
            return {
                todolist: [{
                    id: 1,
                    todo: "영화보기",
                    done: false
                }, {
                    id: 2,
                    todo: "산책",
                    done: false
                }, {
                    id: 3,
                    todo: "독서",
                    done: true
                }, {
                    id: 4,
                    todo: "볼링",
                    done: false
                }]

            }
        },
        methods: {
            checked: function(done) {
                if (done) return {
                    checked: true
                };
                else return {
                    checked: false
                };
            },
            addTodo: function(todo) {
                console.log("이벤트버스 메서드로 받은 파라미터 :" + todo);
                if (todo !== "") {
                    this.todolist.push({
                        id: new Date().getTime(),
                        todo: todo,
                        done: false
                    });
                }
            },
            doneToggle: function(id) {
                var index = this.todolist.findIndex(function(item) {
                    return item.id === id;
                });
                this.todolist[index].done = !this.todolist[index].done;
            },
            deleteTodo: function(id) {
                var index = this.todolist.findIndex(function(item) {
                    return item.id === id;
                });
                this.todolist.splice(index, 1);
            }
        }



}



    
</script>