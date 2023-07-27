import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database : 'ecommerce'
}).promise()
// await pool.query('CREATE DATABASE shoping')
// await pool.query('use shoping')
// await pool.query(
//     'CREATE TABLE `user` (   `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,   `name` varchar(255) NOT NULL,   `description` varchar(255) )'
// )
export const createUser = async (data)=>{
    let {firstname,lastname,email,password} = data

    const row = await pool.query(`
    INSERT into user (firstname, lastname, email, password)
    VALUES (?,?,?,?);
    `,[firstname,lastname,email,password])
}
export const createCatagory = async (data)=>{
    const row = await pool.query(`
    INSERT INTO catagory (name)
    VALUES (?)
    `,[data])
}
export const getCatagory = async ()=>{
    const [row] = await pool.query(`
    SELECT * from catagory
    `)

    return row
}
export const addCatagory = async (data)=>{
    const row = await pool.query(`
    INSERT INTO catagory (name)
    values (?)
    `,[data.name])
}
export const getUser = async (email)=>{
    const [row] = await pool.query(`
    SELECT * FROM ecommerce.user
    WHERE email = ?
    `,[email])

    return row
}
export const postProduct = async (data)=>{
    let {name,description,price,productimage,catagory_id} = data
    const [row] = await pool.query(`
    INSERT INTO product (name,description,price,productimage,catagory_id)
    VALUES (?,?,?,?,?)
    `,[name,description,price,productimage,catagory_id])
}
export const createPaymentType = async (data)=>{
    const [row] = await pool.query(`
    INSERT INTO payment_type (value)
    VALUES (?)
    `,[data])
}
export const createPaymentMethod = async (data) =>{
    let {payment_type_id,accountno,user_id} = data
    const [row] = await pool.query(`
    INSERT INTO payment_method (payment_type_id,accountno,user_id)
    VALUES (?,?,?),
    `,[payment_type_id,accountno,user_id])
}
export const createReview = async (data)=>{
    let {value,comment,user_id,product_id} = data
    const [row] = await pool.query(`
    INSERT INTO review (value,comment,user_id,product_id)
    VALUES (?,?,?,?);
    `,[value,comment,user_id,product_id])
}
export const createUserAddress = async (data)=>{
    let {country,region,city,address_line,user_id} = data
    const [row] = await pool.query(`
    INSERT INTO user_address (country,region,city,address_line,user_id)
    VALUES (?,?,?,?,?);
    `,[country,region,city,address_line,user_id])
}
export const getFeed = async ()=>{
    const [row] = await pool.query(`
    SELECT c.id, c.name, p.productimage from catagory c
    JOIN product p on c.id = p.catagory_id
    `)
    return row
}
export const getProductById = async (id)=>{
    const [row] = await pool.query(`
    SELECT *
    from ecommerce.product p
    where p.catagory_id = ?;
    `,[id])
    return row
}
export const addCart= async (data)=>{
    let {user_id,product_id} = data
    const [row] = await pool.query(`
    INSERT INTO cart (user_id,product_id)
    VALUES (?,?)
    `,[user_id,product_id])
}
export const getMyCart = async (data)=>{
    let {id} = data
    const [row] = await pool.query(`
    select p.id ,p.name, p.description , p.productimage ,p.price, c.user_id
    FROM product p
    JOIN cart c ON p.id = c.product_id
    WHERE user_id = ?;
    `,[id])
    return row
}
export const shop = async (data)=>{
    let {country,city,region,user_id,address_line} = data
    const [row] = await pool.query(`
    insert into user_address (country,city,region,user_id,address_line)
    VALUES (?,?,?,?,?)
    `,[country,city,region,user_id,address_line])
}
export const postRating = async (data)=>{
    let {value,comment,user_id,product_id} = data
    const [row] = await pool.query(`
    insert into review (value,comment,user_id,product_id)
    VALUES (?,?,?,?)
    `,[value,comment,user_id,product_id])
}
export const getReview = async (data)=>{
    let {id} = data
    const [row] = await pool.query(`
    SELECT * FROM review r
    JOIN user u on u.id = r.user_id
    WHERE product_id = ?;
     `,[id])
    return row
}
export const getBanks = async ()=>{
        const [row] = await pool.query(`
        SELECT * FROM payment_type
         `,)
        return row
}
export const payment = async (data)=>{
    let {user_id,payment_type_id,accountno} = data
    const [row] = await pool.query(`
    INSERT INTO payment_method (user_id,payment_type_id,accountno)
    VALUES (?,?,?)
    `,[user_id,payment_type_id,accountno])
}
// const toJSONSql = (data)=>{
//     let accounts = '{'
//     const obj = { a: 1, b: 2, c: 3 };
//     let i=0
//     for (let key in data){
//         if(i !==0){
//             accounts += ','
//         }
//         accounts+=`"${key}":"${data[key]}"`
//         i++
//     }
//     accounts +='}'
//     console.log(accounts)
//     return accounts
// }

// export const createPost = async (data)=>{
//     let {name,picturePath,price,description,catagory} = data
    
//     const [row] = await pool.query(`
//         INSERT INTO item (name,picturePath,price,description,catagory)
//         VALUE (? , ? ,?, ?,?)
//     `,[name,picturePath,price,description,catagory])
//     console.log(row)
// }
// export const getUser = async (id)=>{
//     const [row] = await pool.query(`
//         SELECT * FROM user 
//         where id = ?
//     `,[id])
//     console.log(row)
//     return row[0]
// }
// export const getUserByEmail = async (email)=>{
//     const [row] = await pool.query(`
//         SELECT * FROM user 
//         where email = ?
//     `,[email])
//     console.log(row)
//     return row[0]
// }
// export const deleteUser = async (id)=>{
//     const [row] = await pool.query(`
//         DELETE FROM user 
//         where id = ?
//     `,[id])
    
// }

// export const addUserAccount = async (data,id)=>{
//     await pool.query('use shoping')
//     const user = await getUser(id)
//     const acc = user.accounts
//     const newAcc = {...acc,...data}
//     const accounts =  toJSONSql(newAcc)
//     const [row] = await pool.query(`
//         UPDATE user 
//         SET accounts = ?
//         WHERE id = ?
//     `,[accounts,id])
//     console.log(acc)
//     console.log(newAcc)
// }
// const dataacc = {"CBE":"1000","COOP":"2509"}
// const data = [
//     'yigermal',
//     '+251931770081',
//     '{"CBE":"1000","COOP":"25090149234"}'
// ]
// // addUserAccount(dataacc,1)
// // getUser(1)
