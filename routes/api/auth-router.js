const express = require('express');

const authController = require('../../controllers/auth-controller');
const { isEmptyBody, authenticate } = require('../../middlewares/index');
const {upload} = require('../../middlewares/index');
const {valBody} = require('../../decorators/index')
const {userSignupSchems, userSigninShems, subscriptionSchema} = require('../../models/User')

const authRouter = express.Router();



authRouter.post('/signup',isEmptyBody, valBody(userSignupSchems),authController.signup); 
authRouter.post('/signin', isEmptyBody, valBody(userSigninShems),authController.signin); 
authRouter.get('/current', authenticate, authController.getCurrent );
authRouter.post("/signout", authenticate, authController.signout);
authRouter.patch('/users', authenticate, valBody(subscriptionSchema), authController.updateSubscription );
authRouter.patch('/user/avatars', upload.single('avatar'), authenticate, authController.addAvatar );



module.exports = authRouter;