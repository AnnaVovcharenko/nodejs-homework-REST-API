const bcrypt = require('bcrypt');

require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { ctrlWrapper } = require('../decorators/ctrlWrapper');
const { HttpError } = require('../helpers/index');
const path = require('path');
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");

const postersPath = path.join(__dirname, "../", "public", "avatars");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword }, avatarURL);
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })

}
const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const { _id: id } = user;
    const payload = {
        id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    res.json({
        token,
        user: { email: email, subscription: user.subscription, },
    })


}
const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription
    })
}

const signout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.json(204, {
        message: "Logout success"
    })
}

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.json(result);
}
 const addAvatar = async (req, res) => {
     const {_id: owner} = req.user;
     const {path: oldPath, filename} = req.file;
     const newPath = path.join(postersPath, filename);
     await fs.rename(oldPath, newPath);
     const avatarURL = path.join('avatars', filename);

     Jimp.read(newPath, (error, image) => {
        if (error) throw HttpError(404, "Avatar not found");
        image.resize(250, 250).write(newPath);
      });

      await User.findByIdAndUpdate(owner, { avatarURL });

     res.json({
        avatarURL,
     })


 }

module.exports = {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateSubscription: ctrlWrapper(updateSubscription),
    addAvatar: ctrlWrapper(addAvatar)

}