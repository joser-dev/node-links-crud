const {format, register} = require("timeago.js")
const getFavicons = require("get-website-favicon")


const helpers = {

}

const locale = (number, index, totalSec) => {
    return [
        ['hace un momento', 'hace unos instantes'],
        ['%s seconds ago', 'en %s segundos'],
        ['hace un minuto', 'en un minuto'],
        ['hace %s minutos', 'en %s minutos'],
        ['hace una hora', 'en una hora'],
        ['hace %s horas', 'en %s horas'],
        ['hace un día', 'en un día'],
        ['hace %s días', 'en %s días'],
        ['hace una semana', 'en una semana'],
        ['hace %s semanas', 'en %s semanas'],
        ['hace un mes', 'en un mes'],
        ['hace %s meses', 'en %s meses'],
        ['hace un año', 'en un año'],
        ['hace $s años', 'en %s años']
    ][index];
}

register("es_ES", locale)

helpers.timeago = timestamp => format(timestamp, "es_ES")


module.exports = helpers