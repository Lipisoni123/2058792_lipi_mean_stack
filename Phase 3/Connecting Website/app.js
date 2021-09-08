let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let coursesModel = require("./course_model.js");

//creating the reference of express module
let app = express();

// which is use to enable post data receving from normal html form.
app.use(bodyParser.urlencoded({ extended: true }));

var tableContent = "";
var startTable =
    "<table border=1><tr><th>Course ID</th><th>Course Name</th><th>Description</th><th>Amount</th></tr>";
var endTable = "</table>";

let coursesPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>List of Courses</h2>
    <a href="/">Back</a>
</body>
</html>
`;

app.get("/", (request, response) => {
    response.sendFile(__dirname + "\\index.html");
});

app.get("/addcourse", (request, response) => {
    response.sendFile(__dirname + "\\add_course.html");
});

app.get("/insertCourse", (request, response) => {
    let c_id = request.query["course_id"];
    let c_name = request.query["course_name"];
    let desc = request.query["description"];
    let amt = request.query["amount"];

    //url
    let url = "mongodb://localhost:27017/tcsmean";
    mongoose.pluralize(null); // to avoid lower case collection creation and adding s.

    // connect the database it return promise object
    mongoose
        .connect(url)
        .then((res) => console.log("connected"))
        .catch((err) => console.log(err));

    //to use this db connection we have to call function
    let db = mongoose.connection;
    db.once("open", () => {
        // using model we have to create the reference.
        let c1 = new coursesModel({
            _id: c_id,
            name: c_name,
            description: desc,
            amount: amt,
        });

        coursesModel.create(c1, (err, result) => {
            if (!err) {
                console.log(result);
            } else {
                console.log(err);
            }
            mongoose.disconnect();
        });
    });

    response.sendFile(__dirname + "\\index.html");
});

app.get("/updatecourse", (request, response) => {
    response.sendFile(__dirname + "\\update_course.html");
});

app.get("/upCourse", (request, response) => {
    let c_id = request.query["course_id"];
    let amt = request.query["amount"];

    let url = "mongodb://localhost:27017/tcsmean";
    mongoose.pluralize(null); // to avoid lower case collection creation and adding s.

    // connect the database it return promise object
    mongoose
        .connect(url)
        .then((res) => console.log("connected"))
        .catch((err) => console.log(err));

    //to use this db connection we have to call function
    let db = mongoose.connection;
    db.once("open", () => {
        coursesModel.updateOne(
            { _id: c_id },
            { $set: { amount: amt } },
            (err, result) => {
                if (!err) {
                    console.log(result);
                    if (result.modifiedCount > 0 || result.matchedCount > 0) {
                        console.log("Course updated successfully");
                    } else {
                        console.log("Course didn't update");
                    }
                } else {
                    console.log(err);
                }
                mongoose.disconnect();
            }
        );
    });
    response.sendFile(__dirname + "\\index.html");
});

app.get("/deletecourse", (request, response) => {
    response.sendFile(__dirname + "\\delete_course.html");
});

app.get("/delCourse", (request, response) => {
    let c_id = request.query["course_id"];

    let url = "mongodb://localhost:27017/tcsmean";
    mongoose.pluralize(null); // to avoid lower case collection creation and adding s.

    // connect the database it return promise object
    mongoose
        .connect(url)
        .then((res) => console.log("connected"))
        .catch((err) => console.log(err));

    //to use this db connection we have to call function
    let db = mongoose.connection;
    db.once("open", () => {
        coursesModel.deleteOne({ _id: c_id }, (err, result) => {
            if (!err) {
                if (result.deletedCount > 0) {
                    console.log("Record deleted successfully");
                } else {
                    console.log("Record not present");
                }
            } else {
                console.log(err);
            }
            mongoose.disconnect();
        });
    });
    response.sendFile(__dirname + "\\index.html");
});

app.get("/fetchcourse", (request, response) => {
    tableContent = "";

    let url = "mongodb://localhost:27017/tcsmean";
    mongoose.pluralize(null); // to avoid lower case collection creation and adding s.

    // connect the database it return promise object
    mongoose
        .connect(url)
        .then((res) => console.log("connected"))
        .catch((err) => console.log(err));

    //to use this db connection we have to call function
    let db = mongoose.connection;
    db.once("open", () => {
        coursesModel.find({}, (err, doc) => {
            if (!err) {
                doc.forEach((rec) => {
                    //console.log(rec);
                    console.log(
                        "Course: " +
                        rec._id +
                        " Course Name " +
                        rec.name +
                        " Description: " +
                        rec.description +
                        " Amount: " +
                        rec.amount
                    );
                    tableContent +=
                        "<tr><td>" +
                        rec._id +
                        "</td><td>" +
                        rec.name +
                        "</td><td>" +
                        rec.description +
                        "</td><td>" +
                        rec.amount +
                        "</td></tr>";
                });
            } else {
                console.log(err);
            }
            mongoose.disconnect();
            response.send(coursesPage + startTable + tableContent + endTable);
        });
    });
});

app.listen(9090, () => console.log("Server running on port number 9090"));