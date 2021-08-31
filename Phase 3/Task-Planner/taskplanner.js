let fs = require("fs");
let http = require("http");
let url = require("url");

let tasks = require("./taskplanner.json");

let addpage = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Home</title>
                    <style>

                    div {
                      margin-bottom: 10px;
                    }

                    label {
                      display: inline-block;
                      width: 700px;
                      text-align: right;
                    }

                    table{
                        text-align:center;}
                    }
                  </style>
                </head>
                <body style="background-color:lightorange;">
                <h1 style="text-align: center;background-color: lightpink;">Add Task Section</h1>
                    <form action="taskadd">
                    <div>
                        <label for="Idemployee">Emp Id:</label>
                        <input type="number" name="Idemployee"> </div><br>
                    <div>    
                        <label for="IdTask">Task Id:</label>
                        <input type="text" name="IdTask"> </div><br>
                    <div>    
                        <label for="task">Task: </label>
                        <input type="text" name="task"> </div><br>
                    <div>        
                        <label for="deadline">Deadline: </label>
                        <input type="date" name="deadline"> </div><br>
                       <input style="margin-left: 47%;" type="submit" value="Click to Add">
                       <input type="reset"value="Reset"></div>
                    </form>
                    <hr style=" border: 2px solid blue; ">

                    <h1 style="text-align: center;background-color: lightpink;">Delete Task Section</h1>
                    <form action="removetask">
                        <label for="IdTask">Task Id:</label>
                        <input type="text" name="IdTask"> <br><br>
                        <input style="margin-left: 50%;" type="submit" value="Delete">
                    </form>
                    <hr style=" border: 2px solid blue; ">
                    <h1 style="text-align: center;background-color: lightpink;">List Task Section</h1>
                    <form action="displayTable">
                       
                    </form>
                </body>
                </html>`;

function taskadd(input) {
    let newTask = { Idemployee: input.Idemployee, IdTask: input.IdTask, task: input.task, deadline: input.deadline };
    tasks.push(newTask);

    fs.writeFileSync('taskplanner.json', JSON.stringify(tasks), (err) => {
        if (!err) {
            console.log("Task added successfully");
            return true;
        }
    })
}

function removetask(input) {
    let focustid = input.IdTask;
    let index = tasks.findIndex(item => item.IdTask == focustid);
    if (index != -1) {
        tasks.splice(index, 1); ``

        fs.writeFileSync('taskplanner.json', JSON.stringify(tasks), (err) => {
            if (!err) {
                console.log("The task id " + focustid + " deleted!!!");
            }
        });
        return true;
    } else {
        return false;
    }
}
function displayTaskTable() {
    let tablemat = "";
    let tablestart = `<table align='center' width='100%'  border = '3' >
                            <thead>
                            <tr>
                                <th scope="col">Emp ID</th>
                                <th scope="col">Task ID</th>
                                <th scope="col">Task</th>
                                <th scope="col">Deadline</th>
                            </tr>
                            </thead>`;

    for (let i = 0; i < tasks.length; i++) {
        let item = tasks[i];
        tablemat += "<tbody><tr><td>" + item.Idemployee
            + "</td><td>" + item.IdTask
            + "</td><td>" + item.task
            + "</td><td>" + item.deadline
            + "</td></tr></tbody>";
    }

    let tableend = "</table>";
    tablemat = tablestart + tablemat + tableend;
    return tablemat;
}

let server = http.createServer((require, response) => {
    let urlInfo = url.parse(require.url, true);
    if (urlInfo.path != "/favicon.ico") {
        response.writeHead(200, { "content-type": "text/html" });

        if (urlInfo.pathname == "/taskadd") {
            let newTask = urlInfo.query;
            let result = tasks.find(item => item.IdTask == newTask.IdTask);

            if (result == undefined) {
                taskadd(newTask);
                response.write(" <p style= 'text-align:center; color:green'><b>Task saved successfully.</b></p>");
            } else {
                response.write(" <p style= 'text-align:center; color:red'><b>This task already assigned to that Employee Id, assign a new task.</b></p>");
            }
            let tableHTML = displayTaskTable();
            response.write(addpage);
            response.write(tableHTML);
        }

        else if (urlInfo.pathname == "/removetask") {
            let targetTask = urlInfo.query;
            let result = removetask(targetTask);
            if (result) {
                response.write(" <p style= 'text-align:center; color:red'><b>The task id " + "[" + targetTask.IdTask + "]" + " deleted!!!</b></p>");
            } else {
                response.write(" <p style= 'text-align:center; color:red'><b><b>The task id " + "[" + targetTask.IdTask + "]" + " did not exist!!!</b></p>");
            }
            let tableHTML = displayTaskTable();
            response.write(addpage);
            response.write(tableHTML);
        }

        else if (urlInfo.pathname == "/displayTable") {
            let tableHTML = displayTaskTable();
            response.write(addpage);
            response.write(tableHTML);
        }
        else {
            let tableHTML = displayTaskTable();
            response.write(addpage);
            response.write(tableHTML);
        }
    }
    response.end();
});

server.listen(9090, () => console.log("Server is running on port number 9090"));