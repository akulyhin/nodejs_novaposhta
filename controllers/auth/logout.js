const {User} = require("../../model");

const logout = async (req, res) => {
    const {_id} = req.user;

   await User.findByIdAndUpdate(_id, {token: null});

   res.status(204).json({
       status: "success",
       code: 204,
       data:{
        message: "logout success"
       }
       
   });

};


module.exports = logout;