const {User} = require("../../model");
const Joi = require('joi');

const joiSchema = Joi.object({
email: Joi.string().email()
})

const getUser = async (req, res) => {
    const {email} = req.body;

    const {error} = joiSchema.validate(req.body);

    if (error) {
        res.json({
            status: "error",
            code: 400,
            message: "Incorrect email"
        })
        return
    }

    const user = await User.findOne({email});

    if (user) {
        res.json({
            status: "success",
            code: 200,
            message: "email is founded"
        })
    }

    else {
        res.json({
            status: "error",
            code: 404,
            message: 'Not Found'
        })
    }


}


module.exports = getUser