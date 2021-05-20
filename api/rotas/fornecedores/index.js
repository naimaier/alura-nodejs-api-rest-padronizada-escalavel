const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

roteador.use('/', async (request, response) => {
    const resultados = await TabelaFornecedor.listar()
    //response.send(JSON.stringify(resultados))
    response.json(resultados)
})

module.exports = roteador