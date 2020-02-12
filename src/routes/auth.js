const express = require("express")
const router = express.Router()

const passport = require("passport")

const { isLoggedIn, isNotLoggedIn } = require("../lib/auth")

const { check, validationResult } = require("express-validator")

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render("auth/signup")
})

router.post('/signup', isNotLoggedIn, 
[
    check("firstname").isLength({ min: 3 })
    .withMessage("El nombre debe tener mínimo 3 carácteres."),
    check("username").isAlphanumeric()
    .withMessage("El nombre de usuario debe ser alfanumérico")
],
(req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const { msg } = errors.errors[0]
        req.flash("message", msg)
        return res.redirect("/signup")
    }
    next()
},
passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}))

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render("auth/signin")
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next)
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render("profile")
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/signin')
})

module.exports = router