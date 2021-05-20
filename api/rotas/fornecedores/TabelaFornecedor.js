// Criamos esse arquivo para não usar os métodos em inglês
const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar() {
        return Modelo.findAll()
    }
}