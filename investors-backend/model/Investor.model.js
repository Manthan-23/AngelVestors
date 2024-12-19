import mongoose from "mongoose";

const investorSchema = new mongoose.Schema(
    {

        fullName: {
            type: String,
            required: [false, "Please provide the full Name"],
        },

        email: {
            type: String,
            required: [false, "Please rovide the email"],
        },

        password: {
            type: String,
            required: [false, "Please rovide the password"],
        },

        company: {
            type: String,
            required: [false, "Please provide the company name"],
        },

        position: {
            type: String,
            required: [false, "Please provide your position in the company"],
        },

        interestedIn: {
            type: String,
            required: [false, "Please provide the startups you are interested in"],
        },

        investmentSize: {
            type: String,
            required: [false, "Please provide the investment size"],
        },

        previousInvestments: {
            type: String,
            required: [false, "Please provide your previous investments"],
        }

}
);

export default mongoose.model("Investor", investorSchema);