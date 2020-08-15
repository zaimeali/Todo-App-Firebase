// POP-UPS
function complete_task_popup() {
    document.getElementById('popup').style.cssText = 'display: flex; justify-content: center; background-color: rgb(81, 190, 81);';
    document.getElementById('popup').innerHTML = "Well Done🔥💯";
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
    }, 2000);
}

function new_task_popup() {
    document.getElementById('popup').style.cssText = 'display: flex; justify-content: center; background-color: rgb(57, 121, 206);';
    document.getElementById('popup').innerHTML = "New Task Added🌑🚩";
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
    }, 2000);
}

function undo_task_popup() {
    document.getElementById('popup').style.cssText = 'display: flex; justify-content: center; background-color: rgb(206, 57, 57);';
    document.getElementById('popup').innerHTML = "Oho! Again Added🤦😟";
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
    }, 2000);
}

// Variables
let todoList = [];

// ToDo App Functionality
function windowLoad() {
    getFirebaseData();
}

function refreshTodo() {
    document.getElementById('toDo').innerHTML = '';
    let myList = document.getElementById('toDo');

    todoList.map(({id, task, isComplete}) => {
        let list = document.createElement("li");
        let clickable = document.createElement("button");
        clickable.innerHTML = task;
        clickable.id = id;
        clickable.className = "btn";
        clickable.setAttribute("onclick", `updateTodo('${id}', '${task}', ${isComplete})`);
        list.appendChild(clickable);
        list.className = `list_task ${isComplete ? "done" : "notDone"}`;
        myList.appendChild(list);
    });
}

function updateTodo(id, task, isComplete) {
    document.getElementById('toDo').innerHTML = '';
    firebase.database().ref('todo/' + id).set({
        id: id,
        isComplete: !isComplete,
        task: task
    });
    getFirebaseData();
}

function removeAllTasks() {
    firebase.database().ref('todo').remove();
    console.log("All Tasks are Removed Successfully");
    // console.log(todoList);
}

function createTodo({ target }) {
    document.getElementById('toDo').innerHTML = '';
    let key = firebase.database().ref('todo').push().key;
    let new_task = {
        id: key,
        task: target.value,
        isComplete: false,
    }
    // firebase.database().ref('todo/' + key).set(new_task);
    firebase.database().ref('todo/' + key).set(new_task);
    new_task_popup();
    target.value = '';
    // getFirebaseData();
}

function getFirebaseData() {
    document.getElementById('toDo').innerHTML = '';
    firebase.database().ref('todo').on('child_added', function(data) {
        // console.log(data.val());
        todoList = [...todoList, data.val()];
        refreshTodo();
    });
}