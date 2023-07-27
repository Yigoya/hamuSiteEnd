import jwt from "jsonwebtoken";

export const varifyToken = async (req,res,next) =>{
    try{
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied");
          }
          if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
          }
          const verified = jwt.verify(token, process.env.JWT_SECRET);
          req.user = verified;
          console.log(token)
          console.log(req.user)
          next();
        } catch (err) {
          console.log('sdfevrqwr qt')
          res.status(500).json({ error: err.message });
        }
}