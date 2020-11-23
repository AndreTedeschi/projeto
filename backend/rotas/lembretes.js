const express = require ('express');
const router = express.Router();
const Lembrete = require('../models/lembrete');

router.delete('/:id', (req, res, next) => {
  Lembrete.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Lembrete removido" });
  })
})


router.get('', (req, res, next) => {
  Lembrete.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      lembretes: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Lembrete.findById(req.params.id).then(lem => {
    if (lem) {
      res.status(200).json(lem);
    }
    else
      res.status(404).json({ mensagem: "Não há nenhum lembrete!" })
  })
});


router.post('', (req, res, next) => {
  const lembrete = new Lembrete({
    datafin: req.body.datafin,
    criado: req.body.criado,
    descricao: req.body.descricao
  })
  lembrete.save().then(lembreteInserido => {
    console.log(lembreteInserido);
    res.status(201).json({ mensagem: 'Lembrete criado', id: lembreteInserido._id })
  });
});



router.put("/:id", (req, res, next) => {
  const lembrete = new Lembrete({
    _id: req.params.id,
    datafin: req.body.datafin,
    criado: req.body.criado,
    descricao: req.body.descricao,
  });
  Lembrete.updateOne({ _id: req.params.id }, lembrete)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({ mensagem: 'Lembrete atualizado' })
});

module.exports = router;
