<template>
  <div id="app">
    <h1>To-Do List</h1>
    <to-do-form @todo-added="addToDo"></to-do-form>
    <ul aria-labelledby="list-summary" class="stack-large">
      <li v-for="item in ToDoItems" :key="item.key">
        <to-do-item
          :label="item.label"
          :done="item.done"
          :id="item.id"
          @checkbox-changed="updateDoneStatus(item.key)"
          @item-deleted="deleteToDo(item.key)"
          @item-edited="editToDo(item.key, $event)"
        >
        </to-do-item>
      </li>
    </ul>
  </div>
</template>
<script>
import ToDoItem from './components/ToDoItem.vue'
import ToDoForm from './components/ToDoForm.vue'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    ToDoItem,
    ToDoForm
  },
  data () {
    return {
      ToDoItems: null
    }
  },
async created () {
 var dtaOb
 var arrToDo=[];
    await axios
      .get(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo.json'
      )
      .then(response => {
        dtaOb = response.data
        let keys = Object.keys(dtaOb);
        let values = Object.values(dtaOb);
        keys.forEach(function(n,i){
        let keyVal=values[i];
        let toDoObj={key:n, done:Object.values(keyVal)[0],id:Object.values(keyVal)[1],label:Object.values(keyVal)[2]};
        arrToDo.push(toDoObj);
    });
    })
    this.ToDoItems = arrToDo
  },
   async mounted () {
   var dtaOb
   var arrToDo=[];
    await axios
      .get(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo.json'
      )
      .then(response => {
        dtaOb = response.data
        let keys = Object.keys(dtaOb);
        let values = Object.values(dtaOb);
        keys.forEach(function(n,i){
        let keyVal=values[i];
        let toDoObj={key:n, done:Object.values(keyVal)[0],id:Object.values(keyVal)[1],label:Object.values(keyVal)[2]};
        arrToDo.push(toDoObj);
        })
      })
    .catch((error) => console.log(error));
    this.ToDoItems = arrToDo
  },
  methods: {
   addToDo (toDoLabel) {
      const uid = this.getRandomNumbers()
      const dataObj = {
        label: toDoLabel,
        done: false,
        id: uid
      }
     axios.post(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo.json',
        {
          label: dataObj.label,
          done: dataObj.done,
          id: dataObj.id
        }
      )
      .then((response) => 
      {
      console.log(response)
       this.ToDoItems.push(dataObj);
      }
      )
      .catch((error) => console.log(error));   
    },

    getRandomNumbers () {
      const typedArray = new Uint8Array(10)
      const randomValues = window.crypto.getRandomValues(typedArray)
      return randomValues.join('')
    },
    updateDoneStatus (toDoKey) {
      console.log('test3', toDoKey)
    const toDoToUpdate = this.ToDoItems.find((item) => item.key === toDoKey);
    toDoToUpdate.done = !toDoToUpdate.done;
      axios.patch(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo/' +
          toDoKey +
          '.json',
        {
          done:  toDoToUpdate.done
        }
      )
    },
    deleteToDo (toDoKey) {
      const itemIndex = this.ToDoItems.findIndex(item => item.key === toDoKey)
     axios.delete(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo/' +
          toDoKey +
          '.json'
      ).then((response) => 
      {
      console.log(response);
       this.ToDoItems.splice(itemIndex, 1)
      }
      )
      .catch((error) => console.log(error));
    },
    editToDo (toDoKey, newLabel) {
      const toDoToUpdate = this.ToDoItems.find((item) => item.key === toDoKey);
      toDoToUpdate.label=newLabel;
      const dataObj = {
        label: toDoToUpdate,
        done: false
      }
      axios.patch(
        'https://todo-42c62-default-rtdb.asia-southeast1.firebasedatabase.app/ToDo/' +
          toDoKey +
          '.json',
        {
          label: dataObj.label,
          done: dataObj.done
        }
      ).then((response) => 
      {
      console.log(response);
      }
      )
      .catch((error) => console.log(error));
    }
  },
  computed: {
    listSummary () {
      const numberFinishedItems = this.ToDoItems.filter(
        item => item.done
      ).length
      return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`
    }
  }
}
</script>

<style>
/* Global styles */
.btn {
  padding: 0.8rem 1rem 0.7rem;
  border: 0.2rem solid #4d4d4d;
  cursor: pointer;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ca3c3c;
  border-color: #bd2130;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #c82333;
}
.btn__primary {
  color: #fff;
  background-color: #000;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}
.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*='__lg'] {
  display: inline-block;
  width: 100%;
  font-size: 1.9rem;
}
[class*='__lg']:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*='__lg'] {
    font-size: 2.4rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*='stack'] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}
/* End global styles */
#app {
  background: #fff;
  margin: 2rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2.5rem 5rem 0 rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
