
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, getUser } from '../model/index.js'
export const registerUser=async(req,res)=>{
    try{
        var data = req.body
        console.log(data)
        let user = await getUser(data.email)
        console.log(user)
        if(user.length !== 0) return res.status(400).json({msg:"user already exist"})
        const salt = await bcrypt.genSalt();
        const hassPass = await bcrypt.hash(data.password,salt)

        data.password = hassPass
        const responce = await createUser(data)
        user = await getUser(data.email)
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:'1m'
        })
        res.status(200).json({token,user})
    }catch(e){
        throw e
    }
}
export const loginUser= async (req,res)=>{
    try{
        const { email, password } = req.body;
        
        const user = await getUser(email)
        console.log(user,'tototoy')
        if(!user) return res.status(400).json({msg:"user does not exist"})
        const isMatch = await bcrypt.compare(password,user[0].password)
        if(!isMatch) return res.status(400).json({ msg: "invalid password"})

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{
            expiresIn:'1m'
        })
        res.status(200).json({token,user})
    }catch(e){
        throw e
    }
}