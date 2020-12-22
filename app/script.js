const { TouchBarButton } = require("electron/main");

const { ipcRenderer } = require('electron');

window.onload = function(){
    let list = document.getElementById("list");
    let newTask = document.getElementById("newTask");
    let button = document.getElementById("addTask");

    console.log("Cmon... do something...");
    console.log(list);
    console.log(newTask);
    console.log(button);

    button.addEventListener('click', () => {
        list.insertAdjacentHTML('beforeend', `<li class="list-group-item">${newTask.value}</li>`);
        console.log("Logged new value, with this value: " + newTask.value);
        ipcRenderer.invoke('show-notification', newTask.value);
        newTask.value = '';
    });
}