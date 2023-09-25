let testTasks = [{}];


async function loadTestTasks() {
    testTasks = [];
    let testTask = await getItem('test');
    testTask = JSON.parse(testTask['data']['value']);

    for (let i = 0; i < testTask.length; i++) {
        let loadedTask = testTask[i];
        testTasks.push(loadedTask);
    }

    renderTestTasks();
}


function renderTestTasks() {
    for (let i = 0; i < testTasks.length; i++) {
        let id = testTasks[i]['id'];
        console.log(id);

        let bucket = testTasks[i]['bucket'];
        console.log(bucket);

        let title = testTasks[i]['title'];
        console.log(title);

        let description = testTasks[i]['description'];
        console.log(description);

        let assigned = testTasks[i]['assigned'];
        console.log(assigned);

        let duedate = testTasks[i]['duedate'];
        console.log(duedate);

        let prio = testTasks[i]['prio'];
        console.log(prio);

        let category = testTasks[i]['category'];
        console.log(category);

        let subtask = testTasks[i]['subtask'];
        console.log(subtask);
    }
}


async function addTestTask() {
    //let taskCounter;
    let addTestTask = {
        "id": 2,            // sollte durch einen Zähler ermittelt werden
        "bucket": "done",
        "title": "HTML Base Template Creation",
        "description": "Create reusable HTML base templates...",
        "assigned": ["Benedikt Ziegler"],
        "duedate": "20231007",
        "prio": "low",
        "category": "Technical Task",
        "subtask": []
    };
    testTasks.push(addTestTask);
}


async function saveTestTasks() {
    await setItem('test', JSON.stringify(testTasks));
}


// TESTDATA

/*
let testTasks = [{
    "id": 0,
    "bucket": "in-progress",
    "title": "Kochwelt Page & Recipe Recommender",
    "description": "Build start page with recipe recommendation.",
    "assigned": ["Emanuel Mauer", "Marcel Bauer", "Anton Mayer"],
    "duedate": "20230510",
    "prio": "medium",
    "category": "User Story",
    "subtask": [
        {
            "subid": 0,
            "subtitle": "Implement Recipe Recommendation",
            "subdone": true
        },
        {
            "subid": 1,
            "subtitle": "Start Page Layout",
            "subdone": false
        }
    ]
},
{
    "id": 1,
    "bucket": "done",
    "title": "CSS Architecture Planning",
    "description": "Define CSS naming conventions and structure.",
    "assigned": ["Sofia Müller (You)", "Benedikt Ziegler"],
    "duedate": "20230902",
    "prio": "urgent",
    "category": "Technical Task",
    "subtask": [
        {
            "subid": 0,
            "title": "Establish CSS Methodology",
            "done": true
        },
        {
            "subid": 1,
            "title": "Setup Base Styles",
            "done": true
        },
        {
            "subid": 2,
            "subtitle": "Subtaks 3",
            "subdone": false
        }
    ]
}];
*/