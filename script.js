let todoStr = localStorage.getItem('todoList');
let todoList = todoStr ? JSON.parse(todoStr) : [];

displayitems();

function addtodo() {
    let inputitem = document.querySelector('#todo-input');
    let inputdate = document.querySelector('#todo-date');
    let todoitem = inputitem.value;
    let tododate = inputdate.value;
    
    if (!todoitem || !tododate) { //both must be given
        alert('Please enter both a task and a due date.');
        return;
    }
        todoList.push({ item: todoitem, duedate: tododate, completed: false });
        inputitem.value = '';
        inputdate.value = '';
        displayitems();
}

function displayitems() {
    let containerElement = document.querySelector('#todo-container');
    containerElement.innerHTML = '';  // Clear previous content

    todoList.sort((a, b) => new Date(a.duedate) - new Date(b.duedate)); //sorts date of task
    
    todoList.forEach((todo, index) => {
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => { //toggle check box status
            todoList[index].completed = !todoList[index].completed;
            displayitems();
        }
        
        
        let itemSpan = document.createElement('span');
        itemSpan.textContent = todo.item;
        itemSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';
        
        let dateSpan = document.createElement('span');
        dateSpan.textContent = todo.duedate;
        
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn-delete');
        deleteButton.onclick = () => {
            todoList.splice(index, 1);
            displayitems();
        };
        
        containerElement.appendChild(checkbox);
        containerElement.appendChild(itemSpan);
        containerElement.appendChild(dateSpan);
        containerElement.appendChild(deleteButton);
        
    });
    
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

