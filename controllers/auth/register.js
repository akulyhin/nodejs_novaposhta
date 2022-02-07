const {User} = require('../../model');
const {Conflict} = require("http-errors");
const bcrypt = require('bcryptjs');
const {SECRET_KEY} = process.env;
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user) {
        throw new Conflict("Already register");
    }
    const hashPassword  = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

   const newUser = await User.create({email, password: hashPassword});

   const payload = {
        id: newUser._id
    }

    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, {token}, {new: true});
    

    res.status(201).json({
        status: "success",
        code: 201,
        message: "Register success",
        user: {
            token,
            email: newUser.email
        }
    })
};

module.exports = register;