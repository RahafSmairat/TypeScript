var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//To initialize the tasks list from the local storage
var tasksList = JSON.parse(localStorage.getItem("Tasks") || "[]");
//Function to add a task
function addTask(event) {
    //Prevent page load
    event.preventDefault();
    //Get data from the form
    var taskName = document.getElementById("name").value;
    var taskDescription = document.getElementById("description").value;
    var taskStartDate = document.getElementById("startDate").value;
    var taskEndDate = document.getElementById("endDate").value;
    var taskID = tasksList.length + 1;
    //Warning message if inputs are empty
    if (taskName.trim() == "" || taskDescription.trim() == "" || taskStartDate.trim() == "" || taskEndDate.trim() == "") {
        document.getElementById("message").innerHTML =
            "<div class=\"alert alert-danger\" role=\"alert\">\n                 Please Fill All Feilds!\n             </div>";
        return;
    }
    //Assign the data from the form to an object
    var task = {
        id: taskID,
        name: taskName,
        description: taskDescription,
        status: "To Do",
        startDate: taskStartDate,
        endDate: taskEndDate
    };
    //Add the task to the array
    tasksList.push(task);
    //Save the task to local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    //Display success message
    document.getElementById("message").innerHTML =
        "<div class=\"alert alert-success\" role=\"alert\">\n            Task Added successfully!\n         </div>";
    //Empty form inputs
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    document.getElementById("startDate").value = '';
    document.getElementById("endDate").value = '';
    //Display all tasks
    displayTasks();
}
//Function to display all tasks
function displayTasks() {
    //Get the container that will have the tasks
    var tasksContainer = document.getElementById("tasksContainer");
    if (tasksContainer) {
        //Empty the container
        tasksContainer.innerHTML = "";
        //Print each task in the array
        tasksList.forEach(function (task) {
            tasksContainer.innerHTML +=
                "\n            <tr>\n                <th scope=\"row\">".concat(task.id, "</th>\n                    <td>").concat(task.name, "</td>\n                    <td>").concat(task.description, "</td>\n                    <td>").concat(task.startDate, "</td>\n                    <td>").concat(task.endDate, "</td>\n                    <td>").concat(task.status, "</td>\n                    <td id=\"btns").concat(task.id, "\" class=\"btns\">\n                    <a onclick=\"deleteTask(").concat(task.id, ")\" class=\"text-danger\" data-mdb-tooltip-init title=\"Delete\">\n                      <i class=\"fas fa-trash-alt\"></i>\n                    </a>\n                    </td>\n            </tr>\n            ");
            //Change status button based on the task status
            if (task.status == "To Do") {
                document.getElementById("btns".concat(task.id)).innerHTML +=
                    "\n                <a onclick=\"changeStatus(".concat(task.id, ")\" class=\"text-success\" data-mdb-tooltip-init title=\"Completed\">\n                    <i class=\"far fa-square\"></i>\n                </a>\n                ");
            }
            else {
                document.getElementById("btns".concat(task.id)).innerHTML +=
                    "\n                <a onclick=\"changeStatus(".concat(task.id, ")\" class=\"text-success\" data-mdb-tooltip-init title=\"Completed\">\n                    <i class=\"fas fa-check-square\"></i>\n                </a>\n                ");
            }
        });
    }
}
displayTasks();
//Function to delete a task
function deleteTask(id) {
    //Add the tasks except the target id to be deleted
    tasksList = tasksList.filter(function (task) { return task.id !== id; });
    //Reset the ID 
    tasksList = tasksList.map(function (task, index) { return (__assign(__assign({}, task), { id: index + 1 })); });
    //Reasssign the tasks list to the local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    //Display all tasks
    displayTasks();
}
//Change status function
function changeStatus(id) {
    //Search for the target id to change the status
    tasksList.forEach(function (task) {
        if (task.id == id) {
            //Toggle the status
            if (task.status == "To Do") {
                task.status = "Completed";
            }
            else {
                task.status = "To Do";
            }
        }
    });
    //Reasssign the tasks list to the local storage
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    //Display all tasks
    displayTasks();
}
