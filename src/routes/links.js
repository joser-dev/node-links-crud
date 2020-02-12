const express = require("express")
const router = express.Router()

const db = require("../database")

const { isLoggedIn } = require("../lib/auth")

const { getIcon } = require("../lib/helpers")

router.use(isLoggedIn)

router.get("/", async (req, res) => {

    const columns = [
        "id",
        "title",
        "url",
        "icon",
        "description",
        "created_at"
    ]

    const links = await db.query(`
        SELECT ?? 
        FROM links
        WHERE
        user_id = ?
    `, [columns, req.user.id])
    res.render("links/list", {links})
})

router.get('/add', (req, res) => {
    res.render("links/add")
})

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body

    const newLink = {
        title,
        url,
        icon: await getIcon(url),
        description,
        user_id: req.user.id
    }

    await db.query('INSERT INTO links set ?', [newLink])
    req.flash("success", "Link guardado correctamente")
    res.redirect('/links')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params

    await db.query("DELETE FROM links WHERE id = ?", [id])

    req.flash("success", "Link eliminado correctamente")
    res.redirect("/links")
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params

    const columns = [
        "id", 
        "title", 
        "url", 
        "description"
    ]

    const data = await db.query("SELECT ?? FROM links WHERE id = ?", [columns, id])

    res.render("links/edit", data[0])
})

router.post('/update/:id', async (req, res) => {
    const { id } = req.params
    const { title, url, description } = req.body

    const data = {
        title,
        url,
        description,
        icon: await getIcon(url)
    }

    await db.query("UPDATE links set ? WHERE id = ?;", [data, id])

    req.flash("success", "Link actualizado correctamente")
    res.redirect("/links")
})

module.exports = router