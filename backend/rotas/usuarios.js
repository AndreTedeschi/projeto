const express = require ('express');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('', (req, res, next) => {
  Usuario.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Usuario.findById(req.params.id).then(usu => {
    if (usu) {
      res.status(200).json(usu);
    }
    else
      res.status(404).json({ mensagem: "Não há nenhum usuario!" })
  })
});


router.post('', (req, res, next) => {
  const usuario = new Usuario({
    login: req.body.login,
    senha: req.body.senha,
  })
  usuario.save().then(usuarioInserido => {
    console.log(usuarioInserido);
    res.status(201).json({ mensagem: 'Usuário criado', id: usuarioInserido._id })
  });
});

router.put("/:id", (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.id,
    login: req.body.login,
    senha: req.body.senha
  });
});

router.post("/login", (req,res,next) => {
  Usuario.findOne({
    login: req.body.login,
    senha: req.body.senha
  })
  .then((resultado) => {
    console.log(resultado)
    res.status(200).json({ mensagem: 'Usuário entrou' })
  }).catch((error) => { 
    res.status(401).json({ mensagem: 'Falha ao entrar' })
  })
});

module.exports = router;
