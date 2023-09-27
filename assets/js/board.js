// Zum Testen hier eingefügt, das Script ist aus der addTask.js
async function getTaskStorage() {
    addedTasks = [];
    let currentTasks = await getItem('tasks');
    currentTasks = JSON.parse(currentTasks['data']['value']);

    for (let i = 0; i < currentTasks.length; i++) {
        let tasks = currentTasks[i];
        addedTasks.push(tasks);

        loadTasksForBoard(i);
    }
}


function getTaskFromArray() {
    clearBuckets();

    for (let i = 0; i < addedTasks.length; i++) {
        loadTasksForBoard(i);
    }
}


function loadTasksForBoard(i) {
    let bucket = addedTasks[i]['bucket'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let assigned = addedTasks[i]['assigned'];
    let category = addedTasks[i]['category'];
    let subtask = addedTasks[i]['subtask'];
    let prio = addedTasks[i]['prio'];

    // Kann nicht mehr vorkommen wenn der Code final ist
    // gesamte Funktion dann ausbauen
    if (bucket === undefined) {
        bucket = 'todo';
    }

    categoryClassPicker(category);
    renderByBucket(i, bucket, title, description, assigned, category, categoryCssClass, subtask, prio);
}


function categoryClassPicker(category) {
    if (category === 'Technical Task') {
        categoryCssClass = 'category-technical-task';
    } else {
        categoryCssClass = 'category-user-story';
    }
}


function renderByBucket(i, bucket, title, description, assigned, category, categoryCssClass, subtask, prio) {
    document.getElementById(bucket).innerHTML += renderBuckets(i, bucket, title, description, assigned, category, categoryCssClass, subtask, prio);
}


function loadTask(i) {
    let category = addedTasks[i]['category'];
    let title = addedTasks[i]['title'];
    let description = addedTasks[i]['description'];
    let duedate = addedTasks[i]['duedate'];
    let prio = addedTasks[i]['prio'];
    let assigned = addedTasks[i]['assigned'];
    let subtask = addedTasks[i]['subtask'];

    categoryClassPicker(category);
    openTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtask);
}


function openTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtask) {
    document.getElementById('slider-container').innerHtml = '';
    document.getElementById('slider-container').innerHTML = renderOpenTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtask);
    openSlider();
}


function startDragging(i) {
    currentDraggedElement = i;
}


function allowDrop(event) {
    event.preventDefault();
}


function moveTo(bucket) {
    addedTasks[currentDraggedElement]['bucket'] = bucket;
    getTaskFromArray();
    addTaskToStorage();
}


function clearBuckets() {
    let todoTasks = document.getElementById('todo');
    todoTasks.innerHTML = '';
    let inProgressTasks = document.getElementById('in-progress');
    inProgressTasks.innerHTML = '';
    let awaitFeedbackTasks = document.getElementById('await-feedback');
    awaitFeedbackTasks.innerHTML = '';
    let doneTasks = document.getElementById('done');
    doneTasks.innerHTML = '';
}


function addTaskSlider() {
    document.getElementById('slider-container').innerHtml = '';
    document.getElementById('slider-container').innerHTML = addTaskHtml();
    openSlider();
}


/* move to slider.js
function openSlider() {
    document.getElementById('slider-container').classList.remove('slide-to-right');
    document.getElementById('slider-bg').classList.remove('fadeOut');
    document.getElementById('screen-center').classList.add('screen-center');
    document.getElementById('slider-bg').classList.add('slider-bg');
    document.getElementById('screen-center').classList.remove('d-none');
    document.getElementById('slider-bg').classList.remove('d-none');
    document.getElementById('slider-container').classList.add('slider-container');
    document.getElementById('slider-bg').classList.add('fadeIn');
    document.getElementById('slider-container').classList.add('slide-from-right');
    document.getElementById('slider-container').classList.remove('d-none');
}


function closeSlider() {
    document.getElementById('slider-container').classList.remove('slide-from-right');
    document.getElementById('slider-bg').classList.remove('fadeIn');
    document.getElementById('slider-container').classList.add('slide-to-right');
    document.getElementById('slider-bg').classList.add('fadeOut');
    setTimeout(function () {
        document.getElementById('slider-container').classList.add('d-none');
        document.getElementById('slider-container').classList.remove('slider-container');
    }, 120);
    setTimeout(function () {
        document.getElementById('slider-bg').classList.add('d-none');
        document.getElementById('slider-bg').classList.remove('slider-bg');
        document.getElementById('screen-center').classList.add('d-none');
        document.getElementById('screen-center').classList.remove('screen-center');
    }, 200);
}
*/


function renderBuckets(i, bucket, title, description, assigned, category, categoryCssClass, subtask, prio) {
    return `
        <div class="task-container" onclick="loadTask(${i})" ondragstart="startDragging(${i})" draggable="true">
            <div class="${categoryCssClass}">${category}</div>
            <h4 class="task-title-container">${title}</h4>
            <div class="task-description-container">${description}</div>
            <div class="task-subtasks-container">${subtask}</div>
            <div class="task-assignment-container">${assigned} ${prio}</div>
        </div>
    `
}


function renderOpenTask(i, category, categoryCssClass, title, description, duedate, prio, assigned, subtask) {
    return `
        <div id="slider" class="open-task-container">
            <div class="${categoryCssClass}">${category}</div>
            <div class="open-task-title">${title}</div>
            <div class="open-task-description">${description}</div>
            <div class="open-task-duedate">Due date: ${duedate}</div>
            <div class="open-task-prio">Priority: ${prio}</div>
            <div class="open-task-assigned">Assigned To:<br />${assigned}</div>
            <div class="open-task-subtask">
                <span>Subtasks</span>
                <div class="open-task-subtask-list">${subtask}</div>
            </div>
            <div class="open-task-buttons">
                <button onclick="deleteTask(${i})">Delete</button>
                <button onclick="editTask(${i})">Edit</button>
            </div>
        </div>
    `;
}


function addTaskHtml() {
    return `
        <div id="slider">
            <div>
                <h1>Add Task</h1>
            </div>
            <form onsubmit="getValues(); ">
                <div style="display: flex;">
                    <div class="left-side">

                        <div class="title-content">

                            <span class="span-style">Title</span>
                            <input required placeholder="Enter a title" id="title-input" type="text">
                        </div>
                        <div class="description">
                            <span class="span-style">Description</span>
                            <textarea placeholder="Enter a Description" name="" id="description-textarea" cols="20"
                                rows="10"></textarea>
                        </div>
                        <div class="assigned">
                            <span class="span-style">Assigned to</span>
                            <select name="Select contacts to assign" id="assignedTo">
                                <option value="1">Hello World</option>
                                <option value="2">Test</option>
                            </select>
                        </div>
                    </div>

                    <div class="right-side">
                        <div class="date-container">
                            <span class="span-style">Due date</span>
                            <input onfocus="(this. type='date')" id="date-input"  required placeholder="dd/mm/yyyy">
                        </div>
                        <div class="prio">
                            <span class="span-style">Prio</span>
                            <div class="prio-buttons">
                                <button value="urgent" onclick=" ChangeButtonColor('urgent-btn', 'urgent-img')"
                                    type="button" id="urgent-btn">Urgent
                                    <img id="urgent-img" src="./assets/img/urgentimg.svg" alt="">
                                </button>
                                <button value="medium" onclick=" ChangeButtonColor('medium-btn', 'medium-img')"
                                    type="button" id="medium-btn">Medium
                                    <img id="medium-img" src="./assets/img/mediumimg.svg" alt="">
                                </button>
                                <button value="low" onclick=" ChangeButtonColor('low-btn', 'low-img')" type="button"
                                    id="low-btn">Low
                                    <img id="low-img" src="./assets/img/Prio baja.svg" alt="">
                                </button>
                            </div>
                        </div>
                        <div class="category-container">
                            <span class="span-style">Category</span>
                            <select name="Select contacts to assign" id="select-category">
                                <option value="" disabled selected hidden>Select task category</option>
                                <option value="1">Technical Task</option>
                                <option value="2">User Story</option>
                            </select>
                        </div>
                        <div id="subtask-container" class="subtask-container">
                            <span class="span-style">Subtasks</span>
                            <div class="subtask-input-btn">
                                <input onkeydown="handleEnterKeyPress(event , 'subtask-input')"  id="subtask-input" placeholder="Add new subtask" type="text">
                                <button onclick="addSubTask()" type="button" class="subtask-button"><img
                                        src="./assets/img/addSub.svg" alt=""></button>
                            </div>
                            <div id="subtask-lists"></div>
                            <div class="create-buttons">
                                <button onclick="clearTasks()" type="button" id="clear-btn"> Clear <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.2496 11.9998L17.4926 17.2428M7.00659 17.2428L12.2496 11.9998L7.00659 17.2428ZM17.4926 6.75684L12.2486 11.9998L17.4926 6.75684ZM12.2486 11.9998L7.00659 6.75684L12.2486 11.9998Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                                </button>
                                <button onsubmit="getValues()" type="submit" id="create-btn">Create Task <img
                                        src="./assets/img/check.svg" alt=""></button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `
}


////////////////////////// TESTDATA ///////////////////////////////
/******************************************************************


addedTasks = [{
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Emanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    "duedate": "20230510",
    "prio": "medium",
    "category": "User Story",
    "subtask": [
        {
            "subtitle": "Implement Recipe Recommendation",
            "subdone": true
        },
        {
            "subtitle": "Start Page Layout",
            "subdone": false
        }
    ]
},
{
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Sofia Müller (You)", "Benedikt Ziegler"],
    "duedate": "20230902",
    "prio": "urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "title": "Establish CSS Methodology",
            "done": true
        },
        {
            "title": "Setup Base Styles",
            "done": true
        },
        {
            "subtitle": "Subtaks 3",
            "subdone": false
        }
    ]
}];


******************************************************************/