import { Router } from "express";
const router = Router();

// import all componenets
import * as controller from '../controller/appController.js'
import Auth, {localVariables} from "../middleware/auth.js";

// POST METHODS


router.route("/signups").post(
    controller.register

    );


router.route("/logins").post(
    controller.verifyUser, controller.login
    
    );




router.route("/authenticate").post(controller.verifyUser, (req, res) => res.end());

router.route("/bookmarks").post(controller.bookmarks);


// GET METHODS

router.route('/user/:email').get(controller.getUser)
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)
router.route('/createResetSession').get(controller.createResetSession)
router.route('/data').get(controller.getFormData)
router.route('/investorFormData').get(controller.getInvestorFormData)

router.route('/getbookmarks').get(controller.getBookmarks);

router.route('/getchats').get(controller.getChats);

router.route('/getInvestorChats').get(controller.getInvestorChats);

router.route('/form/startup').get(Auth, controller.getStartupFormData);
// router.route('/messages/:userId').get(controller.getMessages);



// PUT METHODS

router.route("/form").put(Auth, controller.form);
router.route("/updateuser").put(Auth, controller.updateuser);
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword);

// INVESTORS POST METHODS

router.route("/signupin").post(
    controller.registerInv
);

router.route("/loginin").post(
    controller.verifyUser2, controller.loginin
);

router.route("/connect").post(
    controller.connect
)

router.route("/investorform").post(controller.investorForm);

//DELETE ROUTES

router.route("/bookmarks/:bookmarkId").delete(controller.deleteBookmark);

router.route("/connect/:chatId").delete(controller.deleteChat);





export default router;