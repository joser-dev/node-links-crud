const passport = require("passport")
const LocalStrategy = require("passport-local")

const db = require("../database")
const { encryptPassword, verifyPassword } = require("./helpers")

passport.use("local.signin", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {

    console.log(req.body)
    const rows = await db.query("SELECT * FROM users WHERE username = ?;", [username])
    
    if( !rows.length ) {
        return done(null, false, req.flash("message", "El nombre de usuario no existe"))
    }

    const user = rows[0]
    const verify = await verifyPassword(password, user.password)
        
    if (verify) {
        done(null, user, req.flash("success", `Bienvenido ${user.username}`))
    } else {
        done(null, false, req.flash("message", "Contraseña inválida"))
    }
}))

passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { firstname, lastname } = req.body

    const data = {
        username,
        password: await encryptPassword(password),
        firstname,
        lastname
    }

    const result = await db.query("INSERT INTO users SET ?", [data])
    data.id = result.insertId
    return done(null, data)
}))

passport.serializeUser( (user, done) => {
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    const rows = await db.query("SELECT * FROM users WHERE id = ?;", [id])
    done(null, rows[0])
})
