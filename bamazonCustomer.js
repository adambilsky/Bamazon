var mysql = require('mysql');
// Load the NPM Package inquirer
var inquirer = require("inquirer");
var shoppingCart = [];
var inventory;
var shoppingCartTotal = 0;
var p = 0; // position of items in shopping cart

// Create connection to database
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
  productDisplay();
});

function updateItems(customerPick) {
  console.log("Updating our inventory...\n");
  var query = connection.query(
    `UPDATE products SET stockQTY = '${customerPick.stockQTY - customerPick.answer.custQty}' WHERE itemID = '${customerPick.itemID}'`,
  )
}
// Display available items
function productDisplay() {
  console.log("\n Welcome to Bamazon! \n Please wait while our current inventory loads.\n")
  var query = "SELECT * FROM products";
  connection.query(query, function (err, result) {
    if (err) throw err;
    inventory = result;
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
      //var customerPick = inventory.find(item => item.itemID === parseInt(answer.custItem));
      // find method essentially loops over the array
      var customerPick = inventory.find(function (item) {
        return item.itemID === parseInt(answer.custItem);
      });

      customerPick.answer = { ...answer }; // spread operator
      //   if (err) {
      //     console.log("We're sorry, we cannot find an item with that ID. Please try again.");
      //     startSession();
      //   }

      // Check to make sure the item is in stock
      if (customerPick.stockQTY < answer.custQty) {
        console.log("\n We're sorry, we do not have enough in stock to meet your request.");
        startSession();
      }
      // set local variables to hold the current portion of the purchase
      else {
        var currentItem = customerPick.productNAME;
        var currentNum = parseInt(answer.custQty);
        var currentCost = parseInt(customerPick.itemPRICE);
        var subtotal = currentNum * currentCost;

        // Confirm the purchase 
        inquirer
          .prompt(
            {
              type: "confirm",
              message: "\n You would like to purchase " + currentNum +
                " units of " + currentItem + " at $" +
                currentCost + " each, for a total of $" + subtotal + ". \n Is this correct?",
              name: "custConfirm"
            })
          .then(function (answer) {
            if (answer.custConfirm) {
              console.log("\n Thank you for your purchase!")

              // Update shopping cart and database
              updateItems(customerPick);
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
                    message: "\n Would you like to purchase anything else?",
                    name: "custAddItems"
                  }
                )
                .then(function (answer) {
                  if (answer.custAddItems) {
                    productDisplay();
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
}
