// Initialize the MySQL database
var mysql = require('mysql');

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var inventory;
var inventoryNames = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    managerPrompt();
});

// function updateItems(managerChoice) {
//     console.log("Updating our inventory...\n");
//     var query = connection.query(
//         "UPDATE products SET stockQTY += managerChoice.amount' WHERE productNAME = managerChoice.name"
//     )
// }


function managerPrompt() {
    console.log("\n Welcome to Bamazon Manager. Which task would you like to perform?");
    inquirer
        .prompt(
            {
                type: "list",
                choices: [
                    "View Current Inventory",
                    "View Low Inventory",
                    "Add to Current Inventory",
                    "Add New Product",
                    "Exit"
                ],
                name: "managerChoice"
            }).then(function (answer) {
                switch (answer.managerChoice) {
                    case "View Current Inventory":
                        productDisplay();
                        break;
                    case "View Low Inventory":
                        lowInventory();
                        break;
                    case "Add to Current Inventory":
                        addInventory();
                        break;
                    case "Add New Product":
                        addProduct();
                        break;
                    case "Exit":
                        console.log("Thank you for your service. Have a nice day!");
                        connection.end();
                }
            });
}

function productDisplay() {
    console.log("\n Please wait while our current inventory loads.\n")
    var query = "SELECT * FROM products";
    connection.query(query, function (err, result) {
        if (err) throw err;
        inventory = result;
        for (var i = 0; i < result.length; i++) {
            inventoryNames.push(inventory[i].productNAME);
            console.log(
                "Item ID: ", result[i].itemID,
                "|| Product Name:", result[i].productNAME,
                "|| Department:", result[i].departmentNAME,
                "|| Price:", result[i].itemPRICE,
                "|| # Available:", result[i].stockQTY);
        }
        // console.log(inventoryNames);
        managerPrompt();
    });
};

function lowInventory() {
    console.log("The inventory is low on the following items: ");
    var query = "SELECT * FROM products WHERE stockQTY < 4";
    connection.query(query, function (err, result) {
        if (err) throw err;
        inventory = result;
        for (var i = 0; i < result.length; i++) {
            console.log(
                "Item ID: ", result[i].itemID,
                "|| Product Name:", result[i].productNAME,
                "|| # Available:", result[i].stockQTY
            );
        }
        managerPrompt();
    });
}
function updateItems(managerChoice) {
    console.log("Updating our inventory...\n");
    var query = connection.query(
        `UPDATE products SET stockQTY = '${parseInt(managerChoice.stockQTY) + parseInt(managerChoice.answer.mgrQty)}' WHERE productNAME = '${managerChoice.productNAME}'`,
    );
    console.log("Inventory updated!");
    managerPrompt();
}

function addInventory() {
    // productDisplay();
    inquirer
        .prompt([
            {
                type: "list",
                message: "\nSelect the item you wish to add: ",
                choices: inventoryNames,
                name: "mgrItem"
            },
            {
                type: "input",
                message: "Enter the desired quantity: ",
                name: "mgrQty"
            }])
        .then(function (answer) {
            var managerChoice = inventory.find(function(item) {
                return item.productNAME === answer.mgrItem;
            });
            managerChoice.answer = { ...answer };
            updateItems(managerChoice);
        });
        
}

function addProduct() {
    console.log("Functionality under Construction. Please try again later.");
    managerPrompt();
}
