const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, request, response, proximo) => {
// erro, parametros da requisição e declaracao do middleware

    let status = 500
    // definimos um erro padrão

    if (erro instanceof NaoEncontrado) {
        status = 404
    }
    if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400
    }

    response.status(status)
    response.json({ mensagem: erro.message })
})

app.listen(config.get("api.porta"), () => console.log('API rodando!'))