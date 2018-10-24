# Bamazon
This is the NU Bootcamp assignment for weeks 12-13 using node.js and MySQL.

On opening **BamazonCustomer** , the user is shown the current inventory via the productDisplay function,
and prompted to make a purchase by typing the desired itemID. 

https://github.com/adambilsky/Bamazon/blob/master/images/bamCustomer-main.png
![alt text]relative/Bamazon/blob/master/images/bamCustomer-main.png?raw=true"Main Customer Page"

After entering an item ID, the "find" method matches the entered itemID against the inventory ID's to validate the entry,
then ensures sufficient stock quantity before allowing the purchase.

https://github.com/adambilsky/Bamazon/blob/master/images/bamCustomerInsufficientQuantity.png

The user is prompted to confirm with the name, amount, unit price, and current 'subtotal.' 

On confirmation, the user is thanked and a shopping cart (essentially an array of purchased objects) is displayed, 
along with the overall total, which is increased with each purchase.

https://github.com/adambilsky/Bamazon/blob/master/images/bamCustomerPurchase1.png

When the user chooses not to make any additional purchases, the shopping cart and final total are printed.

https://github.com/adambilsky/Bamazon/blob/master/images/bamCustomerPurchase2.png

On opening **BamazonManager** , the user is given a list of options:

https://github.com/adambilsky/Bamazon/blob/master/images/bamManagerMain.png

As with **BamazonCustomer**, the user is shown the current inventory:

https://github.com/adambilsky/Bamazon/blob/master/images/bamManagerInventoryView.png

"View Low Inventory" displays the same inventory, filtered for those items with a stockQTY less than 5:

https://github.com/adambilsky/Bamazon/blob/master/images/bamManagerLowInventory.png

"Add to Inventory" generates a list prompt, with the names of each product as choices:

https://github.com/adambilsky/Bamazon/blob/master/images/bamManagerAddInventory.png

The user selects the desired item, then is prompted to enter a number of units, which are then added to the current 
inventory total:

"Add New Item" generates a four-step prompt, with inputs for the item's *name*, *department*, *price*, and *initial quantity*. (There is currently no validation setting for this section). The manager can then choose to view the updated inventory:

https://github.com/adambilsky/Bamazon/blob/master/images/bamManagerAddNewProduct.png
