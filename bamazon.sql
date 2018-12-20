-- Create and and access a database named 'bamazon' --
CREATE DATABASE bamazon;
USE bamazon;

-- Create a table named 'products' that will hold the inventory --
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Dell Lattitude', 'PC', 2100.99, 25),
		('Macbook Pro 15', 'PC', 2800.99, 25),
		('Apple Mouse', 'Accessories', 60.99, 97),
		('Keyboard USB', 'Accessories', 30.99, 145),
		('Apple Dongle', 'Accessories', 69.50, 500),
		('Mouse USB', 'Accessories', 25.30, 300),
		('IPad Pro', 'Mobile', 300.99, 250),
		('Iphone X', 'Mobile', 1499.99, 600),
		('OnePlus 6', 'Mobile', 600.50, 100),
		('HP Laser', 'Printers', 299.75, 50),
		('Samsung 3 in 1', 'Printers', 399.99, 33),
		('Canon Industrial', 'Printers', 700.50, 13),
		('Davinci 3D', 'Printers', 1500.70, 5),
		('Paper 400pc', 'Office', 4.99, 10),
		('toner universal', 'Office', 20.66, 180),
		('Ball Pen', 'Office', 5.80, 1000),
		('Logo Shirt', 'Clothing', 50.95, 7),
		('Flogo Hat', 'Clothing', 12.99, 250),
		('Nerf gun', 'Toys', 44.44, 94),
		('Ping Pong Table', 'Toys', 375.87, 15),
		('Goku Action Figure', 'miscellaneous', 7.99, 567);
