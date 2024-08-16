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

        // Edit Button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn-edit');
        editButton.onclick = () => {
            enterEditMode(index, itemSpan, dateSpan);
        };

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
        containerElement.appendChild(editButton);  // Add the Edit button
        containerElement.appendChild(deleteButton);
    });
    
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function enterEditMode(index, itemSpan, dateSpan) {
    // Create input fields with the current task data
    let itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.classList.add('taskiteminput');
    itemInput.value = todoList[index].item;

    let dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.classList.add('taskdateinput');
    dateInput.value = todoList[index].duedate;

    // Replace the text with input fields
    itemSpan.replaceWith(itemInput);
    dateSpan.replaceWith(dateInput);

    // Create a Save button to confirm changes
    let saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('btn-save');
    saveButton.onclick = () => {
        todoList[index].item = itemInput.value;
        todoList[index].duedate = dateInput.value;
        displayitems();  // Update the display
    };

    let editButton = dateInput.nextElementSibling;
    // Replace the Edit button with the Save button
    editButton.replaceWith(saveButton);
}