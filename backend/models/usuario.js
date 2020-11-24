const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema( {
    login: {
        type: String,
        required: true
       },
      criado: {
        type: String,
        required: true
       },
} );

module.exports = mongoose.model('Usuario', usuarioSchema)
