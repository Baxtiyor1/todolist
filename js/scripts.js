const elTemplate = document.querySelector('#todo-item--template').content
const elForm = document.querySelector('.todo-form');
let elInput = document.querySelector('.form-control')
const elList = document.querySelector('.todo-list')

//local array

let localArray = JSON.parse(window.localStorage.getItem('todos'))

// Count 
let elAllCount = document.querySelector('.all-count')
let elComplateCount = document.querySelector('.complated-count')
let elUnComplateCount = document.querySelector('.uncomplated-count')

let Complatenumber = [];

//render

let  results = localArray || [] ;

function renderToDos(ToDoArr, element){
    element.innerHTML = null
    ToDoArr.forEach(todo =>{
        let cloneTemplate = elTemplate.cloneNode(true)
        let elTextArea = cloneTemplate.querySelector('.todo-item-complete-text')
        elTextArea.textContent = todo.content 
        
        // checkbox
        let elCheckbox = cloneTemplate.querySelector('#complated')
        elCheckbox.dataset.id = todo.id
        
        if(todo.isComplate === true){
            elCheckbox.setAttribute('checked', 'checked')
        }
        
        elCheckbox.addEventListener('click', (e)=>{
            let itemId = e.target.dataset.id
            
            let findCheckObj = results.find(todo => todo.id == itemId)
            
            findCheckObj.isComplate = !findCheckObj.isComplate
            
            window.localStorage.setItem('todos', JSON.stringify(results))
        })

        
        // delete button
        let elDeleteBtn = cloneTemplate.querySelector('.todo-item-delete-btn')
        elDeleteBtn.dataset.id = todo.id
        
        elDeleteBtn.addEventListener('click', (e)=>{
            let itemId = e.target.dataset.id
            
            let findToDo = results.findIndex(todo => todo.id == itemId)
            
            results.splice(findToDo, 1)
            
            // renderToDo for update
            renderToDos(results, elList)
            
            // localStorage for update
            window.localStorage.setItem('todos', JSON.stringify(results))
        })
        
        element.appendChild(cloneTemplate)
    })
    // AllCount 
    elAllCount.textContent = results.length
}
renderToDos(results, elList)

// document.addEventListener('click', ()=>{
//     results.forEach(todo =>{
//         if(todo.isComplate === true){
//             Complatenumber.push(todo)
//         }
//     })
//     console.log(Complatenumber.length)
// })

elForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    let inputValue = elInput.value.trim()
    
    let newObj = {
        id: new Date().getTime(),
        content: inputValue,
        isComplate: false
    }
    
    elInput.value = ''
    
    results.unshift(newObj)
    
    window.localStorage.setItem('todos', JSON.stringify(results))
    
    renderToDos(results, elList)
})