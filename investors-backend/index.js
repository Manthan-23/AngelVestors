import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import passport from "passport"
import session from "express-session"
import bodyParser from "body-parser"
import router from './router/route.js';
import morgan from "morgan"

import { WebSocketServer } from "ws"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken";
import MessageModel from "./model/Message.model.js"
import fs from 'fs'
import path from "path"
import { dirname } from "path"
import { Buffer } from "buffer"
import { fileURLToPath } from 'url';

// import {io} from "socket.io"

import dotenv from "dotenv";

dotenv.config();
// import auth from "auth"
// const {createTokens} = require('./JWT');
const app = express()

app.use(bodyParser.json());

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


app.use(express.json())

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
  }));


  app.use(morgan('tiny'));
  app.disable('x-powered-by');
  
  // Initialize Passport and use it for authentication
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Set up the authentication middleware
  function isAuthenticated(req, res, next) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // If the user is authenticated, call the next middleware function
      return next();
    } else {
      // If the user is not authenticated, return an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  }

app.use(cors({
    origin: 'https://angelvestors.onrender.com/',
    credentials: true,
  }));




const port = 3001;


app.get("/", (req, res) => {
    res.send("My API")
})

// api routes

app.use("/api", router);








const server = app.listen(3001, () => {
  console.log(`BE started at port : 3001`)
});




  const wss = new WebSocketServer({ server });

wss.on('connection', (connection, req) => {
  console.log("connected");
  console.log(req.headers);

  const cookies = req.headers.cookie;

  if (cookies) {
    const cookieStrings = cookies.split(';');

    const startupTokenCookieString = cookieStrings.find((str) =>
      str.trim().startsWith('startupToken=')
    );

    const investorTokenCookieString = cookieStrings.find((str) =>
      str.trim().startsWith('investorToken=')
    );

    if (startupTokenCookieString) {
      const token = startupTokenCookieString.split('=')[1];
      console.log(token);
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
          if (err) throw err;
          const { userId, name } = userData;
          connection.userId = userId;
          connection.name = name;
        });
      }
    }

    if (investorTokenCookieString) {
      const token1 = investorTokenCookieString.split('=')[1];
      console.log(token1);
      if (token1) {
        jwt.verify(token1, process.env.JWT_SECRET, {}, (err, userData) => {
          if (err) throw err;
          const { investorId, fullName } = userData;
          connection.investorId = investorId;
          connection.fullName = fullName;
        });
      }
    }
  }

  // console.log([...wss.clients].map(c => c.fullName));

  connection.on('message', async (message) => {
    const messageData = JSON.parse(message.toString());
    console.log(messageData);
    console.log('Id: ', messageData.id);
    console.log('Text: ', messageData.text);
    const {recipient, text, sender, file} = messageData;
    let filename = null;

    if(file){
      const parts = file.name.split('.');
      const ext = parts[parts.length - 1];
      filename = Date.now() + '.'+ext;
      const pathTo = path.join(process.cwd() + '/uploads/' + filename);
      const bufferData = new Buffer(file.data.split(',')[1], 'base64');
      fs.writeFile(pathTo, bufferData, () => {
        console.log('file saved:'+pathTo);
      });
    }

    if(recipient && (text || file)){
      const senderId = connection.userId || connection.investorId;
      // const senderId2 = connection.investorId;
      const recipientClients = [...wss.clients].filter(connection => connection.investorId === recipient || connection.userId === recipient);

      const senderClients = [...wss.clients].filter(
        (connection) => connection.investorId === sender || connection.userId === sender
      );

      const messageDoc = await MessageModel.create({
        sender: senderId,
        recipient,
        text,
        file: file ? filename : null,
      });
      console.log('created message');

      // const messageDoc2 = await MessageModel.create({
      //   sender: senderId2,
      //   recipient,
      //   text,
      // });

      recipientClients.forEach((client) => {
        if (client.investorId === recipient || client.userId === recipient) {
          client.send(
            JSON.stringify({
              text,
              sender: senderId,
              recipient,
              file: file ? filename : null,
              _id: messageDoc._id,
            })
          );
        }
      });

      senderClients.forEach((client) => {
        if (client.investorId === sender || client.userId === sender) {
          client.send(
            JSON.stringify({
              text,
              sender: senderId,
              recipient,
              file: file ? filename : null,
              _id: messageDoc._id,
            })
          );
        }
      });

      


    }
  });

  [...wss.clients].forEach(client => {
    client.send(JSON.stringify({
      online: [...wss.clients].map(c => ({
        userId: c.userId,
        name: c.name,
        investorId: c.investorId,
        fullName: c.fullName
      }))
  }));
  });
  
  

});

async function getUserDataFromRequest(req){
  return new Promise((resolve, reject) => {
      const token = req.cookies?.startupToken;
  if(token){
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
          if(err) throw err;
          resolve(userData);
      });
  } else {
      reject('no token');
  }
  })
  
}

app.get('/messages/:userId', async (req, res) => {
  const {userId} = req.params;
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;
    const messages = await MessageModel.find({
        sender: {$in:[userId, ourUserId]},
        recipient: {$in:[userId, ourUserId]},
    }).sort({createdAt: 1});
    res.json(messages);
})

//////////////////////////////////////////////////////////////

async function getUserDataFromRequestTwo(req){
  return new Promise((resolve, reject) => {
      const token2 = req.cookies?.investorToken;
  if(token2){
      jwt.verify(token2, process.env.JWT_SECRET, {}, (err, userData) => {
          if(err) throw err;
          resolve(userData);
      });
  } else {
      reject('no token');
  }
  })
  
}

app.get('/messagesTwo/:userId', async (req, res) => {
  const {userId} = req.params;
    const userData = await getUserDataFromRequestTwo(req);
    const ourUserId = userData.investorId;
    const messages = await MessageModel.find({
        sender: {$in:[userId, ourUserId]},
        recipient: {$in:[userId, ourUserId]},
    }).sort({createdAt: 1})
  
    res.json(messages);
})

