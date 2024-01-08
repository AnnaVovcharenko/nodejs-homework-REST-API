const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, addUpdateSettings } = require('./hooks');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



const userSchema = new Schema({

    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 6,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: String


}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);
userSchema.pre("findOneAndUpdate", addUpdateSettings);
userSchema.post("findOneAndUpdate", handleMongooseError);

const userSignupSchems = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})
const userSigninShems = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})
  
const subscriptionType = ['starter', 'pro', 'business'];

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionType).required(),
})
const User = model('user', userSchema);

module.exports = {
    userSignupSchems,
    userSigninShems,
    subscriptionSchema,
    User
}