const mysql = require("mysql")
const { promisify } = require("util")

const { database } = require("./keys")

const pool = mysql.createPool(database)

pool.getConnection( (err, connection) => {
    if (err) {

        switch (err.code) {
            case "PROTOCOL_CONNECTION":
                console.error("DATABASE CONNECTION WAS CLOSED")
                break

            case "ER_CON_COUNT_ERROR":
                console.error("DATABASE HAS TO MANY CONNECTIONS")
                break

            case "CONNREFUSED":
                console.error("DATABASE CONNECTIONS WAS REFUSED")
                break
                  
            default:
                break
        }
    }
    if (connection) 
        connection.release()
    
    console.log("DATABASE IS CONNECTED")
    return
})

pool.query = promisify(pool.query)

module.exports = pool