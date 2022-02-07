const {Schema, model} = require("mongoose");
const Joi = require("joi");

const joiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string()
});


const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required()
  })
  
  const usersSchema = Schema({
      password: {
        type: String,
        required: [true, 'Password is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
      },
      token: {
        type: String,
        default: null,
      }
    }, {versionKey: false, timestamps: true})
  
    const User = model("user", usersSchema);
  
    module.exports = {
      joiSchema,
      loginSchema,
      User
  };