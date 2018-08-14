// Load the NPM Package inquirer
var inquirer = require("inquirer");
var shoppingCart = [];
var shoppingCartTotal = 0;
var p = 0; // position of items in shopping cart

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
  console.log("\n Welcome to Bamazon! \n Please wait while our current inventory loads.\n")
  var query = "SELECT * FROM products";
  connection.query(query, function (err, result) {
    if (err) throw err;
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
  function shoppingCartReport() {
    console.log("Your cart contains the following:\n",
      shoppingCart,
      "\n Your current total is:",
      shoppingCartTotal + "."
    );
  }
  // Get the itemID and desired quantity from customer
  // Then send that request to the database
  inquirer
    .prompt([
      {
        type: "input",
        message: "\nEnter the itemID of the product you wish to purchase: ",
        name: "custItem"
      },
      {
        type: "input",
        message: "Enter the desired quantity: ",
        name: "custQty"
      }])
    .then(function (answer) {
      var query = "SELECT itemID, productNAME, itemPRICE, stockQTY FROM products WHERE ?";
      connection.query(query, { itemID: answer.custItem }, function (err, response) {
        // Check to make sure the given ID is valid
        if (err) {
          console.log("We're sorry, we cannot find an item with that ID. Please try again.");
          startSession();
        }
        // Check to make sure the item is in stock
        else if (response[0].stockQTY < answer.custQty) {
          console.log("We're sorry, we do not have enough in stock to meet your request.");
          startSession();
        }
        // set local variables to hold the current portion of the purchase
        else {
          var currentItem = response[0].productNAME;
          var currentNum = parseInt(answer.custQty);
          var currentCost = parseInt(response[0].itemPRICE);
          var subtotal = currentNum * currentCost;
          
          // Confirm the purchase 
          inquirer
            .prompt(
              {
                type: "confirm",
                message: "You would like to purchase " + currentNum +
                  " units of " + currentItem + " at $" +
                  currentCost + "each, for a total of $" + subtotal + ". Is this correct?",
                name: "custConfirm"
              })
            .then(function (answer) {
              if (answer.custConfirm) {
                console.log("Thank you for your purchase!")
                // Update shopping cart
                shoppingCart.push(
                  {
                    item: currentItem,
                    quantity: currentNum,
                    cost: currentCost,
                    subtotal: subtotal
                  }
                );
                shoppingCartTotal += subtotal;
                p++;
                shoppingCartReport();
                inquirer
                  .prompt(
                    {
                      type: "confirm",
                      message: "Would you like to purchase anything else?",
                      name: "custAddItems"
                    }
                  )
                  .then(function (answer) {
                    if (answer.custAddItems) {
                      startSession();
                    }
                    else {
                      console.log("Thanks for shopping with us today!")
                      shoppingCartReport();
                      connection.end();
                    }
                  })
              }
              else {
                console.log("We're sorry, please try again.");
                startSession();
              }
            })
        };
      });
    });
}
