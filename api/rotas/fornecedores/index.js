const roteador = require('express').Router()

roteador.use('/', (request, response) => {
    response.send('OK')
})

module.exports = roteador