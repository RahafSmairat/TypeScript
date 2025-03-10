interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
}

let tasksList: Task[] = JSON.parse(localStorage.getItem("Tasks") || "[]");

function addTask(event) {
    event.preventDefault();
    let taskName = (document.getElementById("name") as HTMLInputElement).value
    let taskDescription = (document.getElementById("description") as HTMLInputElement).value
    let taskID = tasksList.length + 1;

    let task: Task = {
        id: taskID,
        name: taskName,
        description: taskDescription,
        status: "To Do"
    }

    tasksList.push(task)
    localStorage.setItem("Tasks", JSON.stringify(tasksList));

    (document.getElementById("successMessage") as HTMLInputElement).innerHTML =
        `<div class="alert alert-success" role="alert">
    Task Added successfully!
</div>`;

    (document.getElementById("name") as HTMLInputElement).value = '';
    (document.getElementById("description") as HTMLInputElement).value = '';
    displayTasks()
}

function displayTasks(){
    let tasksContainer = document.getElementById("tasksContainer");
    if(tasksContainer){
        tasksContainer.innerHTML = "";
        tasksList.forEach(task => {
            tasksContainer.innerHTML += 
            `
            <tr>
                <th scope="row">${task.id}</th>
                    <td>${task.name}</td>
                    <td>${task.description}</td>
                    <td>${task.status}</td>
                    <td id="btns${task.id}" class="btns">
                    <a onclick="deleteTask(${task.id})" class="text-danger" data-mdb-tooltip-init title="Delete">
                      <i class="fas fa-trash-alt"></i>
                    </a>
                    </td>
            </tr>
            `
            if(task.status=="To Do"){
                (document.getElementById(`btns${task.id}`) as HTMLTableCellElement).innerHTML += 
                `
                <a onclick="completed(${task.id})" class="text-success" data-mdb-tooltip-init title="Completed">
                    <i class="far fa-square"></i>
                </a>
                `
            }
            else{
                (document.getElementById(`btns${task.id}`) as HTMLTableCellElement).innerHTML += 
                `
                <a onclick="toDo(${task.id})" class="text-success" data-mdb-tooltip-init title="Completed">
                    <i class="fas fa-check-square"></i>
                </a>
                `
            }
        })
    }
}

displayTasks();

function deleteTask(id : number){
    tasksList = tasksList.filter(task => task.id !== id);

    tasksList = tasksList.map((task, index) => ({
        ...task,  
        id: index + 1,
    }));

    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    displayTasks()
}

function completed (id : number){
    tasksList.forEach(task => {
        if (task.id == id){
            task.status = "Completed"
        }
    })

    localStorage.setItem("Tasks", JSON.stringify(tasksList))
    displayTasks()
}

function toDo (id : number){
    tasksList.forEach(task => {
        if (task.id == id){
            task.status = "To Do"
        }
    })

    localStorage.setItem("Tasks", JSON.stringify(tasksList))
    displayTasks()
}