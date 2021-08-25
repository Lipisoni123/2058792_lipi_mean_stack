let fs = require('fs');
let readline = require("readline-sync");
let data = require('./data.json');
debugger;
let progress = "yes";
while (progress == "yes") {
    //taking input from User
    let CustomerFirstName = readline.question("Enter your Customer's First Name:\n");
    let CustomerlastName = readline.question("Enter your Customer's Last Name:\n");
    let Customergender = readline.question("Enter your Customer's Gender(male/female):\n");
    let Customeremail = readline.questionEMail("Enter your Customer's Email:\n");
    debugger;

    //store the inputs in json file
    data.push({ CustomerFirstname: CustomerFirstName, CustomerlastName: CustomerlastName, Customergender: Customergender, Customeremail: Customeremail });
    fs.writeFileSync("data.json", JSON.stringify(data), { flag: "a+" }, (err) => {
        if (err) {
            console.error(err);
        }
    });
    debugger;
    console.log("New data stored!!!");

    //ask user to add new data
    progress = readline.question("Continue to add new user? (yes/no)\n");
}
