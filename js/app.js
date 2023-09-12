const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
  
/* time elements */

const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

let editItemId

// Check 

let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

if(todos.length) showTodos()

// SetTodos to LocalStorage
function setTodos(){
    localStorage.setItem('list' , JSON.stringify(todos))
}

//  time

function getTime(){
    const now = new Date()
    const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const month = now.getMonth() < 10 ? '0' + (now.getMonth()+1) : now.getMonth();
    const year = now.getFullYear()
    const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();

    const months = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr",
    ]
    const month_title = now.getMonth()
    fullDay.textContent = `${date} ${months[month_title]} , ${year}`
    hourEl.textContent = hour
    minuteEl.textContent = minute
    secondEl.textContent = seconds
    return `${hour}:${minute} , ${date}.${month}.${year}`;
}

setInterval(()=>{
    getTime()
},1000)
// ShowTodos

function showTodos(){
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ""
    todos.forEach((item , i) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'complated' : ""}">
            ${item.text}
        <div class="todo-icons">
          <span class="opacity-50 me-2">${item.time}</span>
          <img onclick="editTodo(${i})" src="img/edit.svg" alt="edit-icon" width="25" height="25">
          <img onclick="deleteTodo(${i})" src="img/delete.svg" alt="delete-icon" width="25" height="25">
        </div>
      </li>
        `
    });
}


// Show Error

function showError(where , message){
    document.getElementById(`${where}`).textContent = message
     
    setTimeout(()=>{
        document.getElementById(`${where}`).textContent = ""
    },2500)
}




// Add 

formCreate.addEventListener("submit" , (e)=> {
    e.preventDefault()
    const todoText = formCreate['input-create'].value.trim()
    
    formCreate.reset()
    if(todoText.length !== 0){
        todos.push(
            {
                text: todoText,
                time: getTime(),
                completed: false
            }
        )
        setTodos()             
        showTodos()
    }else{
        showError('message-create' , 'Please , enter some todo...')
    }
})

// Delete toDo

function deleteTodo(id){
    const deletedTodos = todos.filter((item ,i)=>{
        return i !== id
    })
    
    todos = deletedTodos
    setTodos()
    showTodos()
}

// setCompleted

function setCompleted(id){
    const completedTodos = todos.map((item , i) => {
        if(id == i){
            return  {...item , completed: item.completed == true ? false : true} 
        }else{
            return {...item}
        }
    })

    todos = completedTodos
    setTodos()
    showTodos()
}

// Edit form

formEdit.addEventListener("submit" , (e)=> {
    e.preventDefault()
    
    const todoText = formEdit['input-edit'].value.trim()
    
    formEdit.reset()
    if(todoText.length !== 0){
        todos.splice(editItemId , 1 , {
            text: todoText,
            time: getTime(),
            completed: false
        } )
        setTodos()             
        showTodos()
        close()
    }else{
        showError('message-edit' , 'Please , enter some todo...')
    }

})

// editTodo

function editTodo(id){
    open()
    editItemId = id
}

overlay.addEventListener("click" , close)
closeEl.addEventListener("click" , close)
document.addEventListener("keydown" , (e)=>{
    if(e.key == "Escape"){
        close()
    };
})

function open(){
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}
function close(){
    modal.classList.add("hidden")
    overlay.classList.add("hidden")
}