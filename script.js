let todoItemsContainerEle = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getFromLocalStorage(){
    let stringifiesList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiesList);

    if(parsedTodoList === null){
        return [];
    }
    else{
        return parsedTodoList;
    }
}

let todoList = getFromLocalStorage();
// [
//     {
//         text : "Learn HTML",
//         uniqueId : 1 
//     },
//     {
//         text : "Learn CSS",
//         uniqueId : 2
//     },
//     {
//         text : "Learn JavaScript",
//         uniqueId : 3
//     }
// ]

saveTodoButton.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todosCount = todoList.length;

function onTodoStatusCheck(checkboxId,labelId){
    // let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");
}

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainerEle.removeChild(todoElement);

    let deleteTodoItem = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueId;
        if(eachTodoId == todoId){
            return true;
        }
        else{
            return false;
        }
    });

    todoList.splice(deleteTodoItem,1);
}

function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueId;
    let labelId = "label" + todo.uniqueId ;
    let todoId = "todo" + todo.uniqueId;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container" ,"d-flex", "d-row");
    todoElement.id = todoId;
    todoItemsContainerEle.appendChild(todoElement);

    let inputElement = document.createElement("input");
    // console.log(inputElement);
    inputElement.type = "checkbox";
    inputElement.id = checkboxId ;

    inputElement.onclick = function(){
        onTodoStatusCheck(checkboxId,labelId);
    }
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex","flex-row");
    // console.log(labelContainer);
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    labelElement.textContent = todo.text ;
    // console.log(labelElement);
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    // console.log(deleteIconContainer);


    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
    // console.log(deleteIcon);

}

for (let todo of todoList){
    createAndAppendTodo(todo);
}

function onAddTodo(){
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value ;

    if(userInputValue == ""){
        alert("Enter valid Text");
        return;
    }

    todosCount += 1 ;
    let newTodo = {
        text : userInputValue,
        uniqueId : todosCount 
    };
    createAndAppendTodo(newTodo);
    todoList.push(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function(){
    onAddTodo();
}