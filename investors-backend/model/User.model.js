import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
    name : {
        type: String,
        required : [false, "Please provide the Name"],
        
    },

    companyName : {
        type: String,
        required : [false, "Please provide the CompanyName"],
        
    },

    email : {
        type: String,
        required : [false, "Please provide the Email"],
        unique: true,
       
    },

    password: {
        type: String,
        required: [false, "Please provide the Password"],
    },




    

    startupName: {
        type: String,
        required: [false, "Please provide the Startup Name"],

    },

    startupType: {
        type: String,
        required: [false, "Please provide your Startup Type"],

    },

    // emailAgain: {
    //     type: String,
    //     required: [false, "Please provide the email"],
    // },
    
    startupLocation: {
        type: String,
        required: [false, "Please provide your Startup Location"],

    },

    startupWebsite: {
        type: String,
        required: [false, "Please provide your Website Url"],

    },

    startupYear: {
        type: String,
        required: [false, "Please provide the year's your startup is Active"],

    },

    startupSize: {
        type: String,
        required: [false, "Please provide your Startup Size"],

    },

    startupDesc: {
        type: String,
        required: [false, "Please provide your Startup description"],

    }, 


}
);

export default mongoose.model("User", userSchema);