const { check, validationResult } = require("express-validator")

module.exports = {

    checkUserRegister(req, res, next) {
        check("username").isAlphanumeric()

        const errors = validationResult(req)
        if(!errors.isEmpty()) {

            return res.redirect("signup")
        }
        return next()
    }

}