setTimeout(function () {
  document.getElementsByTagName("html")[0].classList.add("loading-delay");
}, 100);


Vue.directive('focus', {
  inserted: function(element) {
    element.focus()
  }
})
  
new Vue({
  el: '#addtodo',
  data: {
    todo: ''
  },
  methods: {
    addTask: function(e) {
      var id_number = new Date().getTime().toString();
      var todo = {
        id: id_number,
        text: this.todo,
        check: false
      }
      localStorage.setItem(id_number, JSON.stringify(todo))
      this.todo = ''
      window.location.reload()
    }
  }
})

var toDoList = new Vue({
  el: '#todos',
  data: {
    tasks: [],
    editObject: "",
    editValue: "",
    hoverFlag: false,
    hoverIndex: null
  },
  mounted() {
    if (localStorage) {
      for( let i = 0; i < localStorage.length; i++ ){
        var key = localStorage.key(i)
        var data = JSON.parse(localStorage.getItem(key))
        this.tasks.push(data)
      }
    }
  },
  methods: {
    checkTask: function(todo_id) {
      task = this.tasks.find(task => task.id == todo_id)
      if ( task.check == false) {
        localStorage.setItem(todo_id, JSON.stringify({id: todo_id, text: task.text, check:true}))
      } else {
        localStorage.setItem(todo_id, JSON.stringify({id: todo_id, text: task.text, check:false}))
      }
      window.location.reload()
    },
    deleteTask: function(todo_id) {
      localStorage.removeItem(todo_id)
      window.location.reload()
    },
    onEdit: function(todo_id) {
      this.editObject = todo_id
      this.editValue = JSON.parse(localStorage.getItem(todo_id))
    },
    offEdit: function(todo_id) {
      this.editObject = ''
      var data = JSON.parse(localStorage.getItem(todo_id))
      if(data.text == ''){
        localStorage.setItem(todo_id, JSON.stringify(this.editValue))
      } else {
        task = this.tasks.find(task => task.id == todo_id)
        data.text = task.text
        localStorage.setItem(todo_id, JSON.stringify(task))
      }
      window.location.reload()
    },
    mouseOverAction: function(index){
      this.hoverFlag = true
      this.hoverIndex = index
    },
    mouseLeaveAction: function(){
      this.hoverFlag = false
    }
  }
})
