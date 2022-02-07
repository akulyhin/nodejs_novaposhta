const {User} = require("../../model");


const getUser = async (req, res) => {
    const {email} = req.body;

    const user = await User.findOne({email});

    console.log(user);

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