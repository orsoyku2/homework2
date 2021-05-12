const form = document.getElementById('todoForm');
const input = document.getElementById('task');
const list = document.getElementById('list');



eventListeners();
onLoadContent();

function eventListeners() {
    form.addEventListener('submit', addNewToDo);
    list.addEventListener('click', deleteToDo)

}

function onLoadContent() {
    todoItems = getData()
    todoItems.forEach(function (item) {
        createToDoItem(item)
    })

}

function getData() {
    if (localStorage.getItem('todoItems') === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(localStorage.getItem('todoItems'))
    }
    return todoItems
}

function setData(todo) {
    todoItems = getData();
    todoItems.push(todo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems))

}

function createToDoItem(text) {
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>'

    const li = document.createElement('li');
    li.appendChild(a)
    li.appendChild(document.createTextNode(text))
    list.appendChild(li);
  
}

function deleteToDo(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
        console.log("delete item", e.target.parentElement.parentElement.textContent)
        deleteItem(e.target.parentElement.parentElement.textContent)
    }
    e.preventDefault();
}

function deleteItem(todo) {
    todoItems = getData();
    todoItems.forEach(function (item, index) {
        if (item === todo) {
            todoItems.splice(index, 1);
        }
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

}

function addNewToDo(event) {
    event.preventDefault();
    todoItems = getData();
    if (input.value === '') {
        $('.toast').toast('show')
    }
    else if (todoItems.includes(input.value)) {
        $('.toast').toast('show')
    } else {
        createToDoItem(input.value);
        setData(input.value);
    }
    input.value = '';

}

list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);





