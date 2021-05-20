// Criamos esse arquivo para não usar os métodos em inglês
const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    },
    async buscarPorId(id) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id
            }
        })

        if (!encontrado) {
            throw new Error('Fornecedor não encontrado')
        }

        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        return Modelo.update(dadosParaAtualizar,{
            where: {
                id: id
            }
        })
    },
    remover(id) {
        return Modelo.destroy({
            where: {
                id: id
            }
        })
    }
}