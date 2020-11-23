const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const lembretesRoutes = require ('./rotas/lembretes');
const usuariosRoutes = require ('./rotas/usuarios');


mongoose.connect('mongodb+srv://user:Jubarte0507@cluster0.rzu8o.mongodb.net/gerenciador?retryWrites=true&w=majority')
.then(() =>  console.log ("Conexao OK")).catch(() => console.log ("Conexão falhou"));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT,  OPTIONS');
  next()
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/lembretes', lembretesRoutes);
module.exports = app

