const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

roteador.get('/', async (request, response) => {
    const resultados = await TabelaFornecedor.listar()

    response.status(200)
    response.json(resultados)
})

roteador.post('/', async (request, response) => {
    try {
        const dadosRecebidos = request.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        
        response.status(201)
        response.json(fornecedor)
    } catch (erro) {
        response.status(400)
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
    
        response.status(200)
        response.json(fornecedor)
    } catch (erro) {
        response.status(404)
        response.json({
            mensagem: erro.message
        })
    }
})

roteador.put('/:idFornecedor', async (request, response, proximo) => {
    try {
        const id = request.params.idFornecedor
        const dadosRecebidos = request.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        // Funcao que junta varios objetos em um só
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        response.status(204)
        response.end()

    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async (request, response) => {
    try {
        const id = request.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })

        await fornecedor.carregar()
        await fornecedor.remover()
        response.status(204)
        response.end()

    } catch (erro) {
        response.status(404)
        response.json({
            mensagem: erro.message
        })
    }
})

module.exports = roteador