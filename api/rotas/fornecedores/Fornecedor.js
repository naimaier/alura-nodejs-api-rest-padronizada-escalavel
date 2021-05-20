const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id,
        this.empresa = empresa,
        this.email = email,
        this.categoria = categoria,
        this.dataCriacao = dataCriacao,
        this.dataAtualizacao = dataAtualizacao,
        this.versao = versao
    }

    async criar() {
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        // Depois de criar preenchemos o resto dos atributos
        // com os dados gerados pelo banco
        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TabelaFornecedor.buscarPorId(this.id)

        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        await TabelaFornecedor.buscarPorId(this.id)
        // Primeiro verificamos se o id existe
        // (se não existir vai gerar o erro)

        const campos = ['empresa', 'email', 'categoria']
        // Fazemos uma lista com os campos que devem ser atualizados manualmente

        const dadosParaAtualizar = {}

        campos.forEach(campo => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor
            }
            // verificar se os dados são válidos
        })
        

        if (Object.keys(dadosParaAtualizar).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar')
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    }
}

module.exports = Fornecedor