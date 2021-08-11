var count = 1;
function addData() {
    var title = document.getElementById("title").value;
    var blog = document.getElementById("blog").value;
    var image = document.getElementById("image").value;



    //create tags

    var myHTag = document.createElement("h3");
    var myPTag = document.createElement("p");
    var imgElement = document.createElement("img");


    //attach the id elements to tags


    var myPTagContent = document.createTextNode(blog);
    var myHTagContent = document.createTextNode(title);
    imgElement.src = image





    // Adding the attribute for tag
    myPTag.setAttribute("style", "color:white;font-size:15px;font-style: italic;text-align: left;");

    myHTag.setAttribute("style", "color:white;font-size:24px;font-style: bold;text-align: center;");


    imgElement.setAttribute("class", "float-none");
    imgElement.setAttribute("width", "100%");
    imgElement.setAttribute("height", "100%");





    myHTag.setAttribute("id", count);
    myPTag.setAttribute("id", count);
    imgElement.setAttribute("id", count);

    //creating delete button

    var deleteNode = document.createElement("input");

    deleteNode.setAttribute("class", "btn btn-dark");
    deleteNode.setAttribute("type", "button");
    deleteNode.setAttribute("value", "X");
    deleteNode.setAttribute("style", "float: none");
    deleteNode.setAttribute("onClick", "deleteInfo(" + count + ")");



    //Add the cotent to  tag;


    myHTag.appendChild(myHTagContent);
    myPTag.appendChild(myPTagContent);
    myHTag.appendChild(myPTag);
    myHTag.appendChild(imgElement);


    myHTag.appendChild(deleteNode);







    count++;
    document.getElementById("main").appendChild(myHTag);

    reset();



}

function deleteInfo(count) {
    console.log("delete fun called.." + count);
    document.getElementById(count).remove();
}

function reset() {
    document.getElementById("title").value = "";
    document.getElementById("blog").value = "";
    document.getElementById("image").value = "";


}


