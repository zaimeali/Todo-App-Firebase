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

function remove_all_tasks_popup() {
    document.getElementById('popup').style.cssText = 'display: flex; justify-content: center; background-color: rgb(57, 206, 181);';
    document.getElementById('popup').innerHTML = "All Tasks are Removed🙂🌼";
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
    }, 2000);
}

// Variables
let todoList = [];

// ToDo App Functionality
function windowLoad() {
    // getFirebaseData();
    refreshTodo();
    alert("You Can Scroll if list gets bigger");
}

document.getElementById('toDo').innerHTML = '';
let myList = document.getElementById('toDo');

function refreshTodo() {
    let i = 0;
    firebase.database().ref('todo').on('child_added', function(data){
        // console.log(data.val());
        todoList = [data.val()];
        // console.log(data.val());
        // console.log(todoList);
        todoList.map(({ id, task, isComplete }) => {
            // console.log(i);
            let list = document.createElement("li");
            let clickable = document.createElement("button");
            clickable.innerHTML = task;
            clickable.id = id;
            clickable.className = "btn";
            clickable.setAttribute("onclick", `updateTodo('${id}', '${task}', ${isComplete}, ${i})`);
            list.appendChild(clickable);
            list.className = `list_task ${isComplete ? "done" : "notDone"}`;
            myList.appendChild(list);
            i++;
        });
    });
    // document.getElementById('toDo').innerHTML = '';
    // let myList = document.getElementById('toDo');
    // getFirebaseData();
    // console.log(todoList);
    // todoList.map(({id, task, isComplete}) => {
    //     let list = document.createElement("li");
    //     let clickable = document.createElement("button");
    //     clickable.innerHTML = task;
    //     clickable.id = id;
    //     clickable.className = "btn";
    //     clickable.setAttribute("onclick", `updateTodo('${id}', '${task}', ${isComplete})`);
    //     list.appendChild(clickable);
    //     list.className = `list_task ${isComplete ? "done" : "notDone"}`;
    //     myList.appendChild(list);
    // });
}
// let flagVar = false;
function updateTodo(id, task, isComplete, i) {
    // console.log(id, task, isComplete, i);
    document.getElementById('toDo').innerHTML = '';
    firebase.database().ref('todo/' + id).set({
        id: id,
        isComplete: !isComplete,
        task: task
    });
    // console.log(todoList);
    !isComplete ? complete_task_popup() : undo_task_popup();
    todoList = [];
    // let ulTodoList = Array.from(document.querySelectorAll('#toDo>li'));
    // console.log(ulTodoList);
    // flagVar = !flagVar;
    // console.log(flagVar);
    // firebase.database().ref('todo/' + id).once('value', function(data) {
    //     // console.log(data.val());
    //     let checkComplete = !data.val().isComplete;
    //     ulTodoList[i].className = `list_task ${ checkComplete ? "done" : "notDone"}`;
    // });
    // ulTodoList[i].className = `list_task ${check ? "done" : "notDone"}`;
    // console.log(ulTodoList[i].className);
    refreshTodo();
    // getFirebaseData();
}

function removeAllTasks() {
    firebase.database().ref('todo').remove();
    console.log("All Tasks are Removed Successfully");
    todoList = [];
    // console.log(todoList);
    document.getElementById('toDo').innerHTML = '';
    remove_all_tasks_popup();
    // refreshTodo();
}

function createTodo({ target }) {
    // document.getElementById('toDo').innerHTML = '';
    let key = firebase.database().ref('todo').push().key;
    let new_task = {
        id: key,
        task: target.value,
        isComplete: false,
    }
    firebase.database().ref('todo/' + key).set(new_task);
    new_task_popup();
    target.value = '';
    // refreshTodo();
    // getFirebaseData();
}

function getFirebaseData() {
    // document.getElementById('toDo').innerHTML = '';
    // firebase.database().ref('todo').once('value', function(data) {
    //     // console.log(data.val());
    //     todoList = [data.val()];
    //     // refreshTodo();
    // });
}