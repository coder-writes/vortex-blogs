import mongoose from "mongoose";
import  isEmail  from "validator/lib/isEmail.js";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: 'The given email is not a valid email!'
        }
    }
}, {
    timestamps: true
});


const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;
