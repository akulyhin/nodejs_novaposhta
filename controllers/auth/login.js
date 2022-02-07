const {User} = require("../../model");
const {Unauthorized} = require("http-errors");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = process.env;
const jwt = require('jsonwebtoken');



const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (!user) {
        throw new Unauthorized("Email or password is wrong");
    }

    const isCorrectPassword = bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
        throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, {token}, {new: true});


    res.status(200).json({
        status: "success",
        code: 200,
        token,
        user: {
            email,
            token
        }
    })
};


module.exports = login;