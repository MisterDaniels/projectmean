var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');

/* GET all users */
router.get('/', function(req, res, next) {
  UserModel.find({}).exec((err, response) => {
    res.json(response);
  });
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
  UserModel.findOne({_id: req.params.id}).exec((err, response) => {
    res.json(response);
  });
});

/* POST create user */
router.post('/', function(req, res, next) {
  var newUser = new UserModel(req.body);
  
  newUser.criado_em = new Date();
  newUser.alterado_em = newUser.criado_em;

  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        message: `Erro ao criar o usuário ${newUser.nome}`
      });
    }
    
    res.json({message: `Usuário ${newUser.nome} criado`});
  });
});

/* PUT edit user by id */
router.put('/:id', function(req, res, next) {
  var user = req.body;

  user.alterado_em = new Date();
  UserModel.findOne({_id: req.params.id}).exec((err, response) => {
    UserModel.update({_id: req.params.id}, user, function(err, data) {
      if (err) {
        return res.status(400).json({
          message: `Erro ao alterar o usuário ${req.params.id}`
        });
      }

      res.json({message: `Usuário ${response.nome} alterado`});
    });
  });
});

/* DELETE delete user by id */
router.delete('/:id', function(req, res, next) {
  UserModel.findOne({_id: req.params.id}).exec((err,response) => {
    UserModel.remove({_id: req.params.id}, function(err, data) {
      if (err) {
        return res.status(400).json({
          message: `Erro ao deletar o usuário ${req.params.id}`
        });
      }

      res.json({
        message: `Usuário ${response.nome} deletado`
      });
    });
  });
});

module.exports = router;
