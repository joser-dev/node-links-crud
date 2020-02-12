const getFavicons = require("get-website-favicon")
const bcrypt = require("bcryptjs")

const helperFuncs = {

}

helperFuncs.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helperFuncs.verifyPassword =  async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch (err) {
        console.log(err)
    }
}

helperFuncs.getIcon = async (url) => {
    try {
        
        const data = await getFavicons(url) 
        let _url = data.icons[0].src
        return _url

    } catch(err) {
        return "https://cdn2.iconfinder.com/data/icons/antivirus-internet-security/33/broken_link-512.png"
    }
}

module.exports = helperFuncs