const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (request, response) => {
    const resultados = await TabelaFornecedor.listar()

    response.json(resultados)
})

roteador.post('/', async (request, response) => {
    const dadosRecebidos = request.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    
    response.json(fornecedor)
})

roteador.get('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
    
        response.json(fornecedor)
    } catch (erro) {
        response.json({
            mensagem: erro.message
        })
    }
})

module.exports = roteador