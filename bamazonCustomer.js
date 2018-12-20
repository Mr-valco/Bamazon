// import required dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'lightforge',
    database: 'bamazon'
});

/** Function: validnumber 
 * Purpose: checks for the iput numbers to pe positive numbers
 * Parameters: 
 *          intNumber - checks if number is an int
 *          sign - checks if it is a positive number
 * Returns: true or asks to input a specified number
*/
function validNumber(value) {
    const intNumber = Number.isInteger(parseFloat(value));
    const sign = Math.sign(value);

    if (intNumber && (sign === 1)) {
        return true;
    } else {
        return 'Please use whole non-zero numbers only.';
    }
}

/** Function: promptBuyer 
 * Purpose: will prompt the user for the item_id and quantity of the desired product
 * Parameters: 
 *          item - holds the item_id of the item
 *          quantity - holds the data from the quantity field
 *          querySelect - has the mysql base select statement
 * Returns: 
 *         performs the transaction and updates the database 
 *          denies the transaction and prints a message
*/
function promptBuyer() {

    // Prompt buyer to select an item by id
    console.log(` 
    ______                                     
    (____  \                                    
     ____)  ) ____ ____   ____ _____ ___  ____  
    |  __  ( / _  |    \ / _  (___  ) _ \|  _ \ 
    | |__)  | ( | | | | ( ( | |/ __/ |_| | | | |
    |______/ \_||_|_|_|_|\_||_(_____)___/|_| |_| \n
    \n-------------------------------------------------------------------\n`);

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID of the Desired Item.',
            validate: validNumber,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many such items do you require?',
            validate: validNumber,
            filter: Number
        }
    ]).then(function (input) {

        const item = input.item_id;
        const quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        let querySelect = 'SELECT * FROM products WHERE ?';

        connection.query(querySelect, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                const productData = data[0];

                // If the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log('Success, the product is available in this quantity! << Order Confirmed! >>');

                    // Construct the updating query string
                    const updatequerySelect = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // Update the inventory
                    connection.query(updatequerySelect, function (err, data) {
                        if (err) throw err;

                        console.log('\n---------------------------------------------------------------------\n'
                            + 'Order Placed! Your total is $' + productData.price * quantity
                            + '\n---------------------------------------------------------------------\n'
                            + '\n Thank you for choosing Bamazon! \n');
                        // End the db connection
                        connection.end();
                    })
                } else {
                    console.log('\n---------------------------------------------------------------------\n'
                        + 'Sorry, there is not enough product in stock, your order can not be placed as is. \n Please modify your order.'
                        + '\n---------------------------------------------------------------------\n');
                    //display inventory again
                    displayInventory();
                }
            }
        })
    })
}


/** Function: displayInventory 
 * Purpose: will retrieve the current inventory from the database and output it to the console
 * Parameters: 
 *          inventory - builds the query
 * Returns: 
 *          the data from mysql tqble in readable format
*/
function displayInventory() {

    //  // Query db for all items
    querySelect = 'SELECT * FROM products';

    // build the db query
    connection.query(querySelect, function (err, data) {
        if (err) throw err;

        console.log(` 
        ______                                     
        (____  \                                    
         ____)  ) ____ ____   ____ _____ ___  ____  
        |  __  ( / _  |    \ / _  (___  ) _ \|  _ \ 
        | |__)  | ( | | | | ( ( | |/ __/ |_| | | | |
        |______/ \_||_|_|_|_|\_||_(_____)___/|_| |_| \n 
        \n-------------------------------------------------------------------\n`);
        console.log('Existing Inventory: ');
        console.log('<___________________>\n');

        let inventory = '';
        for (let i = 0; i < data.length; i++) {
            inventory = '';
            inventory += 'Item ID: ' + data[i].item_id + '     |     ';
            inventory += 'Product Name: ' + data[i].product_name + '     |     ';
            inventory += 'Department: ' + data[i].department_name + '     |     ';
            inventory += 'Price: $' + data[i].price + '     |     ';
            inventory += 'In Stock: ' + data[i].stock_quantity + '\n';

            console.log(inventory);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity
        promptBuyer();
    })
}

// runBamazon will execute the main application 
function runBamazon() {
    // Display the available inventory
    displayInventory();
}

// Run the application
runBamazon();