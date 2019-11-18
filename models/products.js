var mongoose = require('mongoose');

var schema = mongoose.Schema({
    descricao: {
        type: String,
        require: true
    },
    quantidade: Number,
    preco: Number,
    criado_em: Date,
    alterado_em: Date
});

var model = mongoose.model('products', schema);

module.exports = model;