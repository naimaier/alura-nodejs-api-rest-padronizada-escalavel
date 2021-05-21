const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NaoEncontrado = require('./erros/NaoEncontrado')

app.use(bodyParser.json())

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.use((erro, request, response, proximo) => {
// erro, parametros da requisição e declaracao do middleware

    if (erro instanceof NaoEncontrado) {
        response.status(404)
    } else {
        response.status(400)
    }

    response.json({ mensagem: erro.message })
})

app.listen(config.get("api.porta"), () => console.log('API rodando!'))