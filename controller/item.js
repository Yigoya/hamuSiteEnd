import {  addCart, addCatagory, getBanks, getCatagory, getFeed, getMyCart, getProductById, getReview, payment, postProduct, postRating, shop } from "../model/index.js"
import nodemailer from 'nodemailer'
export const createItem = async(req,res)=>{
    try{
        
        const data = req.body
        const post = await postProduct(data)
        res.json({msg:'it work'})
    }catch(e){
        throw e
    }
}
export const getItems = async (req,res)=>{
    const response = await getFeed()
    res.status(200).json(response)
}
export const getItemsById = async (req,res)=>{
    const response = await getProductById(req.params.id)
    res.status(200).json(response)
}
export const getCatagories = async(req,res)=>{
    const response = await getCatagory()
    
    return res.status(200).json(response)
}
export const addCatagories = async (req,res)=>{
    
    await addCatagory(req.body)
    res.status(200).json({msg:"hi"})
}
export const addCarties = async (req,res)=>{
    await addCart(req.body)
    res.status(200).json({msg:"hi"})
    // const response = await addCatagory(res.body)
    // res.
}
export const getMyCarts = async (req,res)=>{
    const responce = await getMyCart(req.params)
    res.status(200).json(responce)
}
export const shopItem = async (req,res)=>{
    await shop(req.body)
    await sendEmail().catch(err => console.log(err));
    res.status(200).json({msg:"hi"})
}
export const postRate= async(req,res)=>{
    const data = req.body
    const responce = await postRating(data);
    res.status(200).json({msg:"success"})
}
export const getRate= async(req,res)=>{
    const data = req.params
    const responce = await getReview(data);
    res.status(200).json(responce)
}
export const getBank= async(req,res)=>{
    const responce = await getBanks();
    res.status(200).json(responce)
}
export const postPayment= async(req,res)=>{
    const data = req.body
    const responce = await payment(data);
    res.status(200).json({msg:"success"})
}
const sendEmail = async ()=>{

      let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com", 
        port: 587, 
        secure: false, 
        auth: {
          user: "yigoya7@gmail.com", 
          pass: "fgonfdsltonnscpk", 

        },
      });
      

      let info = await transporter.sendMail({
        from: '"You" <yigoya7@gmail.com>',
        to: "yigotry@gmail.com",
        subject: "Testing, testing, 123",
        html: `
        <h1>Hello there</h1>
        <p>Isn't NodeMailer useful?</p>
        `,
      });
    
      console.log(info.messageId);
    }

    