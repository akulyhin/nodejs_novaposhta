const express = require('express');

const {controllerWrapper, validation, authToken} = require('../middleware');
const {joiSchema, loginSchema} = require('../model/users');
const {auth:ctrl} = require('../controllers');

const router = express.Router();

router.post("/register", validation(joiSchema), controllerWrapper(ctrl.register));

router.post("/login", validation(loginSchema), controllerWrapper(ctrl.login))

router.get("/logout", authToken(), controllerWrapper(ctrl.logout))

router.get('/auth', authToken(), async (req, res) => {
    res.json({
        status: 'success',
    })
})


module.exports = router;