import UserModel from "../model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

import InvestorModel from "../model/Investor.model.js";
import BookmarkModel from "../model/Bookmark.model.js";
import ChatRoomModel from "../model/ChatRoom.model.js";
import dotenv from "dotenv";

dotenv.config();


export async function verifyUser(req, res, next){
    try{
        const { email } = req.method == "GET" ? req.query : req.body;

        let exist = await UserModel.findOne({email});
        if(!exist) return res.status(404).send({error: "Can't find the User!"});
        next();

    } catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}

export async function verifyUser2(req, res, next){
    try{
        const { email } = req.method == "GET" ? req.query : req.body;

        let exist = await InvestorModel.findOne({email});
        if(!exist) return res.status(404).send({error: "Can't find the User!"});
        next();

    } catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}


export async function register(req, res){
    
    try{
        const {name, email, companyName, password} = req.body;

        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({email}).then(function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error: "Please provide unique email" });

                resolve();
            })
        });

        Promise.all([existEmail])
        .then(() => {
            if(password){
                bcrypt.hash(password, 10)
                .then(hashedPassword => {

                    const user = new UserModel({
                        name,
                        companyName,
                        email,
                        password: hashedPassword,
                        
                    })

                    user.save()
                    .then(result => res.status(201).send({msg: "User registered Successfully"}))
                    .catch(error => res.status(500).send(console.log(error)))

                })
                .catch((error) => {
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })
            })
        }
    })
    .catch((error) => {
            return res.status(500).send({
                error
            })
        })

    } catch (error) {
        return res.status(500).send({error});
    }


}


export async function login(req, res){
    const {email, password} = req.body;

    try{
        UserModel.findOne({email})
        .then( user => {
            bcrypt.compare(password, user.password)
                .then(passwordCheck => {
                    if(!passwordCheck) return res.status(400).send({error: "Dont have Password!!!"}); 

                // create jwt token 
             const token = jwt.sign({
                    userId: user._id,
                    name: user.name,
                }, process.env.JWT_SECRET, {}, (err, token) => {

                  if(err) throw err;
                    res.cookie('startupToken', token, { domain: 'localhost', sameSite:'none', secure:true, httpOnly: true}).status(200).json({
                        message: "Login Successful",
                        name: user.name,
                        companyName: user.companyName,
                        token,
                        email,
                        userId: user._id
                    });
                    

                });
                
            })
            .catch(error => {
                return res.status(400).send({error: "Password not match!!"})
            })
        })
        .catch( error => {
            return res.status(404).send({error: "Email Not Found"});
        })
    } catch (error) {
        return res.status(500).send({error});
    }
}


export async function getUser(req, res){
    
    const {email} = req.params;

    try {

        if(!email) return res.status(501).send({error: "Invalid User"}); 
        
        UserModel.findOne({ email }, function(err, user) {
            if(err) return res.status(500).send({err});
            if(!user) return res.status(501).send({err: "Couldn't find the user!"})

            return res.status(201).send(user);
        })
      
         } catch (error) {

        return res.status(404).send({error : "Cannot Find User Data"});
    }

}


export async function updateuser(req, res){
    try{

        // const id = req.query.id;

        const {investorId} = req.investor;

        if(investorId){
            const body = req.body;

            // update data
            InvestorModel.updateOne({_id : investorId}, body).then(function(data, err){
                // if(err) throw err;
                if(data){
                    return res.status(201).send({message: "Record Updated!"});
                }else(err)
                    throw err;
                

            
            })
        }else{
            return res.status(401).send({error: "User not found"});
        }

    } catch(error){
        return res.status(401).send({error: "Not allowed"});
}
}


export async function generateOTP(req, res){
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(201).send({code: req.app.locals.OTP});
}


export async function verifyOTP(req, res){
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({message: "Verify Successfully!!"})
    }
    return res.status(400).send({error: "Invalid OTP"});
}


export async function createResetSession(req, res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession = false; //allow accesss to this route only once
        return res.status(201).send({message: "Access granted!"})
    }
    return res.status(440).send({error: "Session expired"});
}


export async function resetPassword(req, res){
    try{
        if(!req.app.locals.resetSession) return res.status(440).send({error: "Session expired"});
        
        const {email, password} = req.body;

        try{
            UserModel.findOne({email})
            .then(function(user){
                bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    UserModel.updateOne({email: user.email},
                        {password : hashedPassword}).then(function(err, data){
                            if(err) throw err;
                            req.app.loacals.resetSession = false;
                            return res.status(201).send({msg: "Record Updated!!"})
                        });
                })
                .catch( e => {
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })
                })
            })
            .catch(error => {
                return res.status(404).send({error: "Email not found"});
            })
        } catch(error){
            return res.status(500).send({error})
        }

    } catch (error) { 
       return res.status(401).send({error});
    }
}


export async function form(req, res){

    try{

        // const id = req.query.id;

        const {userId} = req.user;
        console.log("User Id: ", userId);

        if(userId){
            const body = req.body;
            console.log({body});

            // update data
            UserModel.updateOne({_id : userId}, body).then(function(data, err){
                // if(err) throw err;
                if(data){
                    return res.status(201).send({message: "Record Updated!"});
                }else(err)
                    throw err;
                

            
            })
        }else{
            return res.status(401).send({error: "User not found"});
        }

    } catch(error){
        return res.status(401).send({error: "Not allowed"});
}
}


export async function getStartupFormData(req, res){

    try {
        // Access the authenticated user's ID from the request
        const {userId} = req.user; // Assuming your authentication middleware sets this property
        console.log(userId);
        // Use the user ID to query the database for the startup's saved form data
        const startupData = await UserModel.findById({_id : userId}, 'startupType startupLocation startupDesc startupWebsite startupYear startupSize startupName');
    
        if (!startupData) {
          return res.status(404).json({ message: 'Startup data not found' });
        }
    
        // Return the retrieved startup data as a JSON response
        res.status(200).json(startupData);
      } catch (error) {
        console.error('Error fetching startup form data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

}
    // const userData = new FormModel({
    //     startupName: req.body.startupName,
    //     companyType: req.body.companyType,
    //     companyLocation: req.body.companyLocation,
    //     companyWebsite: req.body.companyWebsite,
    //     companyYear: req.body.companyYear,
    //     companySize: req.body.companySize,
    //     companyDesc: req.body.companyDesc,
    // });

    // userData.save()
    // .then( 
    //   res.status(201).send({message: "Form Data added successfully"})
      
    // )
    // .catch(
    //     error => res.status(500).send(console.log(error))
    // );
    // .then(function(res, err){
    //     if (err) {
    //       console.log(err);
    //       res.status(500).send('Error saving data to database');
    //     } else {
    //       res.send(result);
    //     }
    //   });

export async function getFormData(req, res){

    try{
        const formData = await UserModel.find();
        res.json(formData);
    }catch(err) {
        res.status(500).json({message: "Not Added!"});
    }

    // try {
    //     const startupId = req.params.id;
    //     const startupDetails = await UserModel.findById(startupId);
    //     if (!startupDetails) {
    //       return res.status(404).json({ message: "Startup not found" });
    //     }
    //     res.json(startupDetails);
    //   } catch (err) {
    //     res.status(500).json({ message: "Error fetching startup details" });
    //   }
    
    }

export async function getInvestorFormData(req, res){

    try{
        const investorFormData = await InvestorModel.find();
        res.json(investorFormData);
    }catch(err) {
        res.status(500).json({message: "Not Added!"});
    }
        
}


//INVESTOR SIGNUP

export async function registerInv(req, res){

    try{
        const {fullName, email, password} = req.body;

        const existEmail = new Promise((resolve, reject) => {
            InvestorModel.findOne({email}).then(function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({ error: "Please provide unique email" });

                resolve();
            })
        });

        Promise.all([existEmail])
        .then(() => {
            if(password){
                bcrypt.hash(password, 10)
                .then(hashedPassword => {

                    const investor = new InvestorModel({
                        fullName,
                        email,
                        password: hashedPassword,
                        
                        
                    })

                    investor.save()
                    .then(result => res.status(201).send({msg: "Registered Successfully"}))
                    .catch(error => res.status(500).send(console.log(error)))

                })
                .catch((error) => {
                    return res.status(500).send({
                        error: "Enable to hashed password"
                    })
            })
        }
    })
    .catch((error) => {
            return res.status(500).send({
                error
            })
        })

    } catch (error) {
        return res.status(500).send({error});
    }


}

export async function loginin(req, res){
    const {email, password} = req.body;

    try{
        InvestorModel.findOne({email})
        .then( investor => {
            bcrypt.compare(password, investor.password)
                .then(passwordCheck => {
                    if(!passwordCheck) return res.status(400).send({error: "Dont have Password!!!"}); 

                // create jwt token 
             const token1 = jwt.sign({
                    investorId: investor._id,
                    fullName: investor.fullName
                }, process.env.JWT_SECRET, {}, (err, token1) => {

                    if(err) throw err;

                    res.cookie('investorToken', token1, { domain: 'localhost', sameSite:'none', secure:true, httpOnly: true}).status(200).json({
                        message: "Login Successful",
                        fullName: investor.fullName,
                        email: investor.email,
                        token1,
                        investorId: investor._id,
                    });

                });


            })
            .catch(error => {
                return res.status(400).send({error: "Password not match!!"})
            })
        })
        .catch( error => {
            return res.status(404).send({error: "Email Not Found"});
        })
    } catch (error) {
        return res.status(500).send({error});
    }
}

export async function investorForm(req, res){

    const investorData = new InvestorModel({
        company: req.body.company,
        position: req.body.position,
    });

    investorData.save()
    .then( 
      res.status(201).send({message: "Investors Form Data added successfully"})
      
    )
    .catch(
        error => res.status(500).send(console.log(error))
    );
    
}


export async function bookmarks(req, res){

    const { startupId, investorId } = req.body;
  
    try {
      const bookmark = await BookmarkModel.create({ startupId, investorId });
      res.status(201).json(bookmark);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create bookmark' });
    }

}


export async function getBookmarks(req, res){

        const { startupId } = req.query;
      
        try {
          const bookmarks = await BookmarkModel.find({ startupId }).populate('investorId');
          res.status(200).json(bookmarks);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to retrieve bookmarks' });
        }
}

export async function deleteBookmark(req, res){
    const { bookmarkId } = req.params;

  try {
    const deletedBookmark = await BookmarkModel.findByIdAndDelete(bookmarkId);

    if (!deletedBookmark) {
      return res.status(404).send({ message: 'Bookmark not found' });
    }

    return res.status(200).send({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: 'Error deleting bookmark', error });
  }
}


export async function connect(req, res){
    const { startupId, investorId } = req.body;

    try {
      const startup = await UserModel.findById(startupId);
      const investor = await InvestorModel.findById(investorId);
  
      // Create a new chat room document in the database
      const chatRoom = await ChatRoomModel.create({
        name: `${startup.name} and ${investor.fullName}'s chat room`,
        participants: [{startupId, investorId}]
      });

  
      res.status(200).json({ chatRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
        
}


export async function getChats(req, res){

    const { startupId } = req.query;
    const {token} = req.cookies;

  try {
    const chats = await ChatRoomModel.find({ 'participants.startupId': startupId })
      .populate('participants.investorId', 'fullName')
      
      .exec();

      res.json(chats);

      

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve chats' });
  }
}

export async function getInvestorChats(req, res){

    const { investorId } = req.query;
    const {token} = req.cookies;
    

  try {
    const invChats = await ChatRoomModel.find({ 'participants.investorId': investorId })
      .populate('participants.startupId', 'name')
      
      .exec();

      res.json(invChats);

      

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve chats' });
  }
}


export async function deleteChat(req, res){
    const { chatId } = req.params;

  try {
    const deletedChat = await ChatRoomModel.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).send({ message: 'Chat not found' });
    }

    return res.status(200).send({ message: 'Chat deleted successfully' });
  } catch (error) {
    return res.status(500).send({ message: 'Error deleting chat', error });
  }
}

