let addedTasks = [];
let lastClickedPrio = null;

function ChangeButtonColor(buttonId, imgId) {
    let button = document.getElementById(buttonId);
    let img = document.getElementById(imgId)
    lastClickedPrio = button;

    let buttons = document.querySelectorAll('.prio-buttons button');
    buttons.forEach(function (btn,) {
        btn.classList.remove('active');
    });

    let images = document.querySelectorAll('.prio-buttons button img');
    images.forEach(function (imag,) {
        imag.classList.remove('active');
    });

    button.classList.add('active');
    img.classList.add('active')
}

function getValues() {
    let title = document.getElementById('title-input');
    let description = document.getElementById('description-textarea');
    let assignTo = document.getElementById('assignedTo');
    let assignedText = assignTo.options[assignTo.selectedIndex].text;
    let date = document.getElementById('date-input');
    let category = document.getElementById('select-category');
    let categoryText = category.options[category.selectedIndex].text;
    let subtask = document.getElementById('subtask-input');
    let prioValue = lastClickedPrio ? lastClickedPrio.value : '';

    let tasks = {
        "title": title.value,
        "description": description.value,
        "assigned": assignedText,
        "date": date.value,
        "prio": prioValue,
        "category": categoryText,
        "subtask": subtask.value,
    };
    addedTasks.push(tasks);
    console.log(addedTasks)
}