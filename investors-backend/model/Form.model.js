import mongoose from "mongoose";

const formSchema = new mongoose.Schema(

    {

    startupName: {
        type: String,
        required: [false, "Please provide the Startup Name"],

    },

    companyType: {
        type: String,
        required: [false, "Please provide your Company Type"],

    },

    emailAgain: {
        type: String,
        required: [false, "Please provide the email"],
    },
    
    companyLocation: {
        type: String,
        required: [false, "Please provide your Company Location"],

    },

    companyWebsite: {
        type: String,
        required: [false, "Please provide your Website Url"],

    },

    companyYear: {
        type: String,
        required: [false, "Please provide the year's your company is Active"],

    },

    companySize: {
        type: String,
        required: [false, "Please provide your Company Size"],

    },

    companyDesc: {
        type: String,
        required: [false, "Please provide your Company description"],

    }, 

    // email: {
    //     type: String,
    //     required: [false],
    // }

}

)

export default mongoose.model("Form", formSchema);