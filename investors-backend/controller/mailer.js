
import nodemailer from "nodemailer"

import Mailgen from "mailgen"
import CRD from "../env.js"


let config = {
            service : 'gmail',
            auth: {
                email: CRD.EMAIL,
                password: CRD.PASSWORD
            }
        }
    
let transporter = nodemailer.createTransport(config)

    let MailGenerator = new Mailgen({
                    theme: "default",
                    product: {
                        name: "Mailgen",
                        link : "https://mailgen.js/"
                    }
                })


export const registerMail = async (req, res) => {

    const {name, email, text, subject} = req.body;
     
    
    let response = {
        body: {
            // name: name,
            // intro: text || "Your Bill",
            // table: {
            //     data: [
            //         {
            //             item: "Nodemailer Stack",
            //             description: "Angelvestors",
            //             price: "22",
            //         }
            //     ]
            // },
            // outro: "Looking forward"
            name: name,
            intro : text || "Your Bill",
            outro: "Hello Outro!!"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from: CRD.EMAIL,
        to: email,
        subject: subject || "PLACE ORDER",
        html: mail
    }

    transporter.sendMail(message)
    .then(() => {
        return res.status(200).send({message: "You have received the email!"})
    })
    .catch(error => res.status(500).send({error: "Not"}))

    // res.status(201).json("Mail Successfully!");

}