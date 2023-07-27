INSERT into user (firstname, lastname, email, password)
VALUES (
        'yohana',
        'tesfayr',
        'yohanayesfaye7@gmail.com',
        '123456'
    );
INSERT INTO catagory (name)
values ('shoe'),
    ('food'),
    ('cloth'),
    ('feurniture'),
    ('book');
INSERT INTO product (
        name,
        description,
        price,
        productimage,
        catagory_id
    )
VALUES (
        'adidas',
        'this is the best product you will get the best shoe in reasonable price',
        1400.34,
        'adidas.png',
        1
    );
USE ecommerce;
INSERT INTO user_address (country, region, city, address_line, user_id)
VALUES ('ethiopia', 'spp', 'hawasa', 'ED1274621', 1);
INSERT INTO review (value, comment, user_id, product_id)
VALUES (4, 'wow this is amazing', 1, 1);
INSERT INTO payment_method (payment_type_id, accountno, user_id)
VALUES (1, 1000475236185, 1),
    (2, 1000475236455, 2);
INSERT INTO payment_type (value)
VALUES ('CBE'),
    ('BIRHAN'),
    ('ZEMEN');
ALTER TABLE payment_id
    RENAME to payment_type;
ALTER TABLE current_table_name
    RENAME TO new_table_name;