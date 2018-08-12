// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Create connection to database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'memph15NY',
  database: 'bamazon_db'
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  productDisplay();
});

// Display available items
function productDisplay() {

  var query = "SELECT * FROM products";
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.log(result);
    for (var i = 0; i < result.length; i++) {
      console.log(
        "Item ID: ", result[i].itemID,
        "|| Product Name:", result[i].productNAME,
        "|| Department:", result[i].departmentNAME,
        "|| Price:", result[i].itemPRICE,
        "|| # Available:", result[i].stockQTY);
    }
    startSession();
  });
};

// Create a "Prompt" with a series of questions.
function startSession() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the itemID of the product you wish to purchase: ",
        name: "custItem"
      },
      {
        type: "input",
        message: "Enter the desired quantity: ",
        name: "custQty"
      }])
    .then(function (err, res) {
      // if (err) throw err;
      console.log(res);
    });
}
