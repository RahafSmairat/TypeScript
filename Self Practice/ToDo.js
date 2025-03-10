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
var tasksList = JSON.parse(localStorage.getItem("Tasks") || "[]");
function addTask(event) {
    event.preventDefault();
    var taskName = document.getElementById("name").value;
    var taskDescription = document.getElementById("description").value;
    var taskID = tasksList.length + 1;
    var task = {
        id: taskID,
        name: taskName,
        description: taskDescription,
        status: "To Do"
    };
    tasksList.push(task);
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    document.getElementById("successMessage").innerHTML =
        "<div class=\"alert alert-success\" role=\"alert\">\n    Task Added successfully!\n</div>";
    document.getElementById("name").value = '';
    document.getElementById("description").value = '';
    displayTasks();
}
function displayTasks() {
    var tasksContainer = document.getElementById("tasksContainer");
    if (tasksContainer) {
        tasksContainer.innerHTML = "";
        tasksList.forEach(function (task) {
            tasksContainer.innerHTML +=
                "\n            <tr>\n                <th scope=\"row\">".concat(task.id, "</th>\n                    <td>").concat(task.name, "</td>\n                    <td>").concat(task.description, "</td>\n                    <td>").concat(task.status, "</td>\n                    <td id=\"btns").concat(task.id, "\" class=\"btns\">\n                    <a onclick=\"deleteTask(").concat(task.id, ")\" class=\"text-danger\" data-mdb-tooltip-init title=\"Delete\">\n                      <i class=\"fas fa-trash-alt\"></i>\n                    </a>\n                    </td>\n            </tr>\n            ");
            if (task.status == "To Do") {
                document.getElementById("btns".concat(task.id)).innerHTML +=
                    "\n                <a onclick=\"completed(".concat(task.id, ")\" class=\"text-success\" data-mdb-tooltip-init title=\"Completed\">\n                    <i class=\"far fa-square\"></i>\n                </a>\n                ");
            }
            else {
                document.getElementById("btns".concat(task.id)).innerHTML +=
                    "\n                <a onclick=\"toDo(".concat(task.id, ")\" class=\"text-success\" data-mdb-tooltip-init title=\"Completed\">\n                    <i class=\"fas fa-check-square\"></i>\n                </a>\n                ");
            }
        });
    }
}
displayTasks();
function deleteTask(id) {
    tasksList = tasksList.filter(function (task) { return task.id !== id; });
    tasksList = tasksList.map(function (task, index) { return (__assign(__assign({}, task), { id: index + 1 })); });
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    displayTasks();
}
function completed(id) {
    tasksList.forEach(function (task) {
        if (task.id == id) {
            task.status = "Completed";
        }
    });
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    displayTasks();
}
function toDo(id) {
    tasksList.forEach(function (task) {
        if (task.id == id) {
            task.status = "To Do";
        }
    });
    localStorage.setItem("Tasks", JSON.stringify(tasksList));
    displayTasks();
}
