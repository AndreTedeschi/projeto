const mongoose = require('mongoose');

const lembreteSchema = mongoose.Schema( {
  datafin: {
    type: String,
    required: true
   },
  criado: {
    type: String,
    required: true
   },
  descricao: {
    type: String,
    required: true,
  },
} );

module.exports = mongoose.model('Lembrete', lembreteSchema)
