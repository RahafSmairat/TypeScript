
interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
}

//To initialize the tasks list from the local storage
let tasksList: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

//Function to add a task
function addTask(event) {

    //Prevent page load
    event.preventDefault();

    //Get data from the form
    let taskName = (document.getElementById("name") as HTMLInputElement).value
    let taskDescription = (document.getElementById("description") as HTMLInputElement).value
    let taskStartDate = (document.getElementById("startDate") as HTMLInputElement).value
    let taskEndDate = (document.getElementById("endDate") as HTMLInputElement).value
    let taskID = tasksList.length + 1;

    //Warning message if inputs are empty
    if (taskName.trim() == "" || taskDescription.trim() == "" || taskStartDate.trim() == "" || taskEndDate.trim() == "") {
        (document.getElementById("message") as HTMLInputElement).innerHTML =
            `<div class="alert alert-danger" role="alert">
                 Please Fill All Feilds!
             </div>`;
        return
    }

    //Assign the data from the form to an object
    let task: Task = {
        id: taskID,
        name: taskName,
        description: taskDescription,
        status: "To Do",
        startDate: taskStartDate,
        endDate: taskEndDate
    }

    //Add the task to the array
    tasksList.push(task)

    //Save the task to local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList));

    //Display success message
    (document.getElementById("message") as HTMLInputElement).innerHTML =
        `<div class="alert alert-success" role="alert">
            Task Added successfully!
         </div>`;

    //Empty form inputs
    (document.getElementById("name") as HTMLInputElement).value = '';
    (document.getElementById("description") as HTMLInputElement).value = '';
    (document.getElementById("startDate") as HTMLInputElement).value = '';
    (document.getElementById("endDate") as HTMLInputElement).value = '';

    //Display all tasks
    displayTasks()
}

//Function to display all tasks
function displayTasks() {

    //Get the container that will have the tasks
    let tasksContainer = document.getElementById("tasksContainer");

    if (tasksContainer) {
        //Empty the container
        tasksContainer.innerHTML = "";

        //Print each task in the array
        tasksList.forEach(task => {
            tasksContainer.innerHTML +=
                `
            <tr>
                <th scope="row">${task.id}</th>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td>${task.startDate}</td>
                    <td>${task.endDate}</td>
                    <td>${task.status}</td>
                    <td id="btns${task.id}" class="btns">
                    <a onclick="deleteTask(${task.id})" class="text-danger" data-mdb-tooltip-init title="Delete">
                      <i class="fas fa-trash-alt"></i>
                    </a>
                    </td>
            </tr>
            `

            //Change status button based on the task status
            if (task.status == "To Do") {
                (document.getElementById(`btns${task.id}`) as HTMLTableCellElement).innerHTML +=
                    `
                <a onclick="changeStatus(${task.id})" class="text-success" data-mdb-tooltip-init title="Completed">
                    <i class="far fa-square"></i>
                </a>
                `
            }
            else {
                (document.getElementById(`btns${task.id}`) as HTMLTableCellElement).innerHTML +=
                    `
                <a onclick="changeStatus(${task.id})" class="text-success" data-mdb-tooltip-init title="Completed">
                    <i class="fas fa-check-square"></i>
                </a>
                `
            }
        })
    }
}

displayTasks();

//Function to delete a task
function deleteTask(id: number) {

    //Add the tasks except the target id to be deleted
    tasksList = tasksList.filter(task => task.id !== id);

    //Reset the ID 
    tasksList = tasksList.map((task, index) => ({
        ...task,
        id: index + 1,
    }));

    //Reasssign the tasks list to the local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList));

    //Display all tasks
    displayTasks()
}

//Change status function
function changeStatus(id: number) {

    //Search for the target id to change the status
    tasksList.forEach(task => {
        if (task.id == id) {
            
            //Toggle the status
            if(task.status == "To Do"){
                task.status = "Completed"
            }
            else{
                task.status = "To Do"
            }
        }
    })

    //Reasssign the tasks list to the local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList))

    //Display all tasks
    displayTasks()
}