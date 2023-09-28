let addedTasks = [{}];
let lastClickedPrio = null;
let newSubTasks = [];
let assignedContact = []
let userData = [];



function init() {
    loadUserDataFromRemote()
    getTaskStorage();
    //assignContacts()

}

function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId);


    if (button.classList.contains('active')) {
        button.classList.remove('active');
        img.classList.remove('active');
        lastClickedPrio = null;
    } else {

        let buttons = document.querySelectorAll('.prio-buttons button');
        buttons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        let images = document.querySelectorAll('.prio-buttons button img');
        images.forEach(function (imag) {
            imag.classList.remove('active');
        });

        lastClickedPrio = button;

        button.classList.add('active');
        img.classList.add('active');
    }
}


/*  function submitForm(event) {  // Nur für den Test. Später rausnehmen, und auch das onclick entfernen. Verhindert das neu laden der Seite.
    event.preventDefault();
    console.log(addedTasks)
}*/

function getValues() {
    let bucket = "todo";
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let date = document.getElementById('date-input');
    let category = document.getElementById('select-category');
    let categoryText = category.options[category.selectedIndex].text;
    let subtask = document.getElementById('subtask-input');
    let prioValue = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = {
        "title": title.value,
        "description": description.value,
        "assigned": assignedContact,
        "date": date.value,
        "prio": prioValue,
        "category": categoryText,
        "subtask": newSubTasks,
        "bucket": bucket,
    };
    addedTasks.push(tasks);
    addTaskToStorage();
    clearTasks();
    newSubTasks = [];
}


async function loadUserDataFromRemote() {
    let newUserDataString = await getItem('users');
    newUserDataString = JSON.parse(newUserDataString['data']['value']);
    for (let i = 0; i < newUserDataString.length; i++) {
        let users = newUserDataString[i];
        userData.push(users);
    }
    renderContacts();
}


async function getTaskStorage() {
    addedTasks = [];
    let currentTasks = await getItem('tasks');
    currentTasks = JSON.parse(currentTasks['data']['value']);

    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);
    }
}


async function addTaskToStorage() {
    await setItem('tasks', JSON.stringify(addedTasks))
}

function addSubTask() {
    let subtaskContent = document.getElementById('subtask-lists');
    let newTasksText = document.getElementById('subtask-input').value;

    if (newTasksText !== '') {
        newSubTasks.push(newTasksText);
    }

    subtaskContent.innerHTML = '';

    for (let i = 0; i < newSubTasks.length; i++) {
        const newTasks = newSubTasks[i];

        subtaskContent.innerHTML += /*html*/`
        <div id="sublist-container${i}" class="sublist-container">
          <ul id="subtask-list${i}" class="subtask-list">
                <li> <span  id="show-current-subtask${i}">${newTasks}</span></li>
          </ul>
            <div id="subtask-input-container${i}" class="d-none subtask-input-container" style="width: 100%;"> 
               <input onkeydown="handleEnterKeyPress(event, 'edit-Input', ${i})"  id="edit-task-input${i}" class=" edit-subtask-input" type="text" > 
               <img onclick="renameSubTask(${i})" class="edit-done"  src="/assets/img/done.svg" alt="">
               <img onclick="deleteSubTask(${i})"  src="/assets/img/addtasktrash.svg" alt="">
            </div>
            <div id="task-edit-buttons${i}" class="d-flex subtask-edit-buttons">
              <img onclick="editSubTask(${i}, '${newTasks}')" class="d-none edit-subtask" src="/assets/img/addtaskedit.svg" alt="">
              <img onclick="deleteSubTask(${i})" class="d-none" style="height: 24px; width: 24px;" src="/assets/img/addtasktrash.svg" alt="">
            </div>
        </div> `;
    }
    document.getElementById('subtask-input').value = '';
}



function openContactOverlay() {
    let onclick = document.getElementById('assignedTo')
    let overlayContainer = document.getElementById('contact-overlay');

    overlayContainer.classList.remove('d-none');
    overlayContainer.classList.add('d-flex');

    onclick.removeAttribute('onClick')

    document.addEventListener('click', closeOnClickOutside);
    onclick.onclick = closeContactOverlay;
}

function renderContacts() {
    let overlayContainer = document.getElementById('contact-overlay');


    for (let i = 0; i < userData.length; i++) {
        let currentContact = userData[i];
        let name = currentContact['name'];

        overlayContainer.innerHTML += /*html*/`
        <label class="contact-label" for="check-contact${i}">
            <div class="current-contacts">
                <div class="add-task-contacts"> 
                   <span class="current-name">${name}</span>
                   <input value="${name}" class="check-contact" id="check-contact${i}" type="checkbox" onchange="setCheckbox(this, '${name}', ${i})">
                </div>
            </div>
        </label>        
        `;
    }
}

function setCheckbox(checkbox, name, i) {
    let container = checkbox.closest('.contact-label');
    if (checkbox.checked) {
        container.style.backgroundColor = 'rgb(9, 25, 49)';
        container.style.color = 'white';
        pushContact(name);

    } else {
        container.style.backgroundColor = '';
        container.style.color = '';
        spliceContact(name)
    }
}

function pushContact(name) {
    assignedContact.push(name)
    console.log(assignedContact)
}


function spliceContact(name) {
    // Suche den Index des Kontakts im assignedContact-Array
    let indexToRemove = assignedContact.indexOf(name);

    if (indexToRemove !== -1) {
        assignedContact.splice(indexToRemove, 1);
        console.log(assignedContact);
    }
}

function removeCheckboxStyle() {
    let overlayContainer = document.getElementById('contact-overlay');
    overlayContainer.innerHTML = '';
    renderContacts()
}



function closeContactOverlay() {
    let overlayContainer = document.getElementById('contact-overlay');
    let onclick = document.getElementById('assignedTo')
    overlayContainer.classList.remove('d-flex');
    overlayContainer.classList.add('d-none');

    document.removeEventListener('click', closeOnClickOutside);
    onclick.onclick = openContactOverlay;
}


function closeOnClickOutside(event) {
    let overlayContainer = document.getElementById('contact-overlay');
    let assignedTo = document.getElementById('assignedTo');

    // Überprüfung ob der Klick außerhalb des Popups liegt
    if (!overlayContainer.contains(event.target) && event.target !== assignedTo) {
        closeContactOverlay();
    }
}

function handleEnterKeyPress(event, action, i) {
    if (event.key === 'Enter') {
        event.preventDefault();
        if (action === 'subtask-input') {
            addSubTask();
        } else if (action === 'edit-Input') {
            renameSubTask(i)
        }
    }
}

function renameSubTask(i) {
    let editSubTask = document.getElementById(`edit-task-input${i}`).value;
    if (editSubTask !== '') {
        newSubTasks.push(editSubTask);
    }
    deleteSubTask(i)
    addSubTask();
}

function editSubTask(i, currenTask) {
    let subtaskList = document.getElementById(`subtask-list${i}`);
    let editSubInput = document.getElementById(`edit-task-input${i}`);
    let taskbtn = document.getElementById(`task-edit-buttons${i}`);
    let inputContainer = document.getElementById(`subtask-input-container${i}`)

    inputContainer.classList.add('d-flex');
    inputContainer.classList.remove('d-none');
    taskbtn.classList.remove('d-flex');
    taskbtn.classList.add('d-none');
    subtaskList.classList.remove('subtask-list')
    subtaskList.classList.add('d-none')
    editSubInput.classList.remove('d-none');
    editSubInput.value = `${currenTask}`;
}


function deleteSubTask(i) {
    newSubTasks.splice(i, 1)
    addSubTask()
}

function clearTasks() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let date = document.getElementById('date-input');
    let sublist = document.querySelectorAll('.sublist-container');
    let newTasks = document.getElementById('subtask-input');

    newTasks.value = "";
    date.value = "";
    description.value = "";
    title.value = "";
    sublist.forEach(function (element) {
        element.innerHTML = '';
    })
    newSubTasks = [];
    assignedContact = [];
    removeCheckboxStyle()
    removeButtonColor();

}

function removeButtonColor() {
    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn,) {
        btn.classList.remove('active');
    });
    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag,) {
        imag.classList.remove('active');
    });
}