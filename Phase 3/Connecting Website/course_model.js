let mongoose = require("mongoose");

mongoose.pluralize(null);

let courseSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String,
    amount: Number,
});


let courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;