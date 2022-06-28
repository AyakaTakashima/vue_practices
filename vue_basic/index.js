/* global Vue */
/* global localStorage */
/* eslint-disable no-new */

setTimeout(function () {
  document.getElementsByTagName('html')[0].classList.add('loading-delay')
}, 100)

Vue.directive('focus', {
  inserted: function (element) {
    element.focus()
  }
})

new Vue({
  el: '#addtodo',
  data: {
    todo: ''
  },
  methods: {
    addTask: function (e) {
      const idNumber = new Date().getTime().toString()
      const todo = {
        id: idNumber,
        text: this.todo,
        check: false
      }
      localStorage.setItem(idNumber, JSON.stringify(todo))
      toDo.tasks.push(todo)
      this.todo = ''
    }
  }
})

const toDo = new Vue({
  el: '#todos',
  data: {
    tasks: [],
    editObject: '',
    editValue: '',
    hoverFlag: false,
    hoverIndex: null
  },
  mounted () {
    if (localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const data = JSON.parse(localStorage.getItem(key))
        this.tasks.push(data)
      }
    }
  },
  methods: {
    checkTask: function (todoId) {
      const task = this.tasks.find(task => task.id === todoId)
      if (task.check === false) {
        localStorage.setItem(todoId, JSON.stringify({ id: todoId, text: task.text, check: true }))
        task.check = true
      } else {
        localStorage.setItem(todoId, JSON.stringify({ id: todoId, text: task.text, check: false }))
        task.check = false
      }
    },
    deleteTask: function (todoId) {
      localStorage.removeItem(todoId)
      this.tasks = this.tasks.filter(task => task.id !== todoId)
    },
    onEdit: function (todoId) {
      this.editObject = todoId
      this.editValue = JSON.parse(localStorage.getItem(todoId))
    },
    offEdit: function (todoId) {
      this.editObject = ''
      const data = JSON.parse(localStorage.getItem(todoId))
      if (data.text === '') {
        localStorage.setItem(todoId, JSON.stringify(this.editValue))
      } else {
        const task = this.tasks.find(task => task.id === todoId)
        data.text = task.text
        localStorage.setItem(todoId, JSON.stringify(task))
      }
    },
    mouseOverAction: function (index) {
      this.hoverFlag = true
      this.hoverIndex = index
    },
    mouseLeaveAction: function () {
      this.hoverFlag = false
    }
  }
})
