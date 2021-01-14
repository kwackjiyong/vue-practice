<template>
    <div>
        <input class="input" type="text" id="task" v-model.trim="todo" placeholder="입력후 엔터" @keyup.enter="addTodo">
        <span class="addbutton" @click="addTodo">추가</span>
    </div>
</template>
<script>
    import eventBus from '../EventBus'

    export default {
        name : 'input-todo',
        data : function(){
            return {todo:""}
        },
        methods: {
            addTodo: function() {
                eventBus.$emit('add-todo', this.todo);
                console.log("입력내용 emit:" + this.todo);
                this.todo = "";
            }
        }
    }
</script>