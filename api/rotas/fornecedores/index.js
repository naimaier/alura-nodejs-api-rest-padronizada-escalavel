const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (request, response) => {
    const resultados = await TabelaFornecedor.listar()

    response.json(resultados)
})

roteador.post('/', async (request, response) => {
    try {
        const dadosRecebidos = request.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        
        response.json(fornecedor)
    } catch (erro) {
        response.json({
            mensagem: erro.message
        })
    }
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

roteador.put('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        // Funcao que junta varios objetos em um só
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        response.end()

    } catch (erro) {
        response.json({ mensagem: erro.message })
    }
})

roteador.delete('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })

        await fornecedor.carregar()
        await fornecedor.remover()
        response.end()

    } catch (erro) {
        response.json({
            mensagem: erro.message
        })
    }
})

module.exports = roteador