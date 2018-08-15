DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    itemID INTEGER(9) AUTO_INCREMENT NOT NULL,
    productNAME VARCHAR(100),
    departmentNAME VARCHAR(40),
    itemPRICE INTEGER(9),
    stockQTY INTEGER(9),
    PRIMARY KEY(itemID)
);

INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Sweet Home Alabama', 'Songs', 5, 99);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Alabama Getaway', 'Songs', 5, 99);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('La Bamba', 'Songs', 5, 99);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Barack Obama', 'People', 99, 1);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bam Morris', 'People', 9, 1);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bam', 'Songs', 5, 99);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Disney: Bambi', 'Movies', 10, 49);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Curse of the Bambino', 'Movies', 5, 2);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bambi', 'Songs', 5, 99);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bam!', 'Comic Book Sound Effects', 1, 199);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bam!!!', 'Celebrity Chef Idiocyncrasies', 1, 199);
INSERT INTO products (productNAME, departmentNAME, itemPRICE, stockQTY) VALUES ('Bam Margera', 'People', 9, 1);
