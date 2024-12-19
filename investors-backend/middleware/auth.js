import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


export default async function Auth(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        
        // retrive the user details logged in
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.investor = decodedToken;
        // console.log("Request User: ", decodedToken);

        req.user = decodedToken;

       

        next()

    } catch(error) {
        res.status(401).send({error: "Authentication Failed. Try Again!"})
    }
}


export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession: false
    }

    next()
}