use ecommerce;
CREATE TABLE address (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    country varchar(50) not null,
    region varchar(50),
    city varchar(50),
    address_line varchar(50) not null
);
USE ecommerce;
-- DROP TABLE user_address;
CREATE TABLE user_address (
    
    id int not null PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    country varchar(50) not null,
    region varchar(50),
    city varchar(50),
    address_line varchar(50) not null,
    FOREIGN KEY(user_id) REFERENCES user(id)
);
create TABLE user (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(50) UNIQUE not null,
    password varchar(500)
);
drop TABLE catagory;
CREATE TABLE catagory (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    parent_catagory int,
    name varchar(50) not null,
    FOREIGN KEY (parent_catagory) REFERENCES catagory(id)
);
CREATE TABLE product (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    name varchar(50) not null,
    catagory_id int,
    description varchar(600),
    productimage varchar(200),
    price decimal(10, 2),
    FOREIGN KEY (catagory_id) REFERENCES catagory(id)
);

CREATE TABLE payment_id (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    value varchar(50) not null
);
USE ecommerce;
-- DROP TABLE payment_method;
CREATE TABLE payment_method (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    payment_type_id varchar(50) not null,
    provider varchar(200),
    accountno varchar(200) not null,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
CREATE TABLE orders (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    user_id int not null,
    order_date DATE,
    shipping_address varchar(50) not null,
    payment_method_id int not null,
    order_total varchar(50) not null,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_id(id)
);
CREATE TABLE payment_id (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    value varchar(50) not null
);
CREATE TABLE payment_method (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(50) not null,
    payment_type_id varchar(50) not null,
    provider varchar(200),
);
USE ecommerce;
-- DROP TABLE review;
CREATE TABLE review (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    value int not null,
    comment varchar(1000),
    user_id int not null,
    product_id int not null,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    -- Add other columns as needed
);
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
INSERT INTO Customers (customer_id, customer_name, email)
VALUES (1, 'John Doe', 'john@example.com'),
    (2, 'Jane Smith', 'jane@example.com'),
    (3, 'Bob Johnson', 'bob@example.com');
INSERT INTO Orders (order_id, order_date, total_amount, customer_id)
VALUES (101, '2023-07-22', 150.00, 1),
    (102, '2023-07-22', 200.00, 1),
    (103, '2023-07-21', 50.00, 2),
    (104, '2023-07-21', 300.00, 3);
CREATE TABLE Products (
    product_id INT IDENTITY(1, 1) PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    -- Add other columns as needed
);
INSERT INTO Products (product_name, price)
VALUES ('Product A', 19.99);
INSERT INTO Products (product_name, price)
VALUES ('Product B', 29.99);