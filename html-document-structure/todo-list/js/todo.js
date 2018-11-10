
const tasks = document.querySelectorAll('input');
var done = document.getElementsByClassName('done')[0];
var undone = document.getElementsByClassName('undone')[0];
for(const task of tasks) {
    task.addEventListener('click', changeTask);
}

function changeTask(event) {
    var task = event.target;
    var label = task.parentElement;
    
    if(task.checked) {
        done.appendChild(label);
    } else {
        undone.appendChild(label);
    }
}