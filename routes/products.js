var express = require('express');
var router = express.Router();

var ProductModel = require('../models/products');

/* GET all products */
router.get('/', function(req, res, next) {
  ProductModel.find({}).exec((err, response) => {
    res.json(response);
  });
});

/* GET product by id */
router.get('/:id', function(req, res, next) {
  ProductModel.findOne({_id: req.params.id}).exec((err, response) => {
    res.json(response);
  });
});

/* POST create product */
router.post('/', function(req, res, next) {
  var newProduct = new ProductModel(req.body);
  
  newProduct.criado_em = new Date();
  newProduct.alterado_em = newProduct.criado_em;

  newProduct.save(err => {
    if (err) {
      return res.status(400).json({
        message: `Erro ao criar o produto ${newProduct.descricao}`
      });
    }
    
    res.json({message: `Produto ${newProduct.descricao} criado`});
  });
});

/* PUT edit product by id */
router.put('/:id', function(req, res, next) {
  var product = req.body;

  product.alterado_em = new Date();
  ProductModel.findOne({_id: req.params.id}).exec((err, response) => {
    ProductModel.update({_id: req.params.id}, product, function(err, data) {
      if (err) {
        return res.status(400).json({
          message: `Erro ao alterar o produto ${req.params.id}`
        });
      }

      res.json({message: `Produto ${response.descricao} alterado`});
    });
  });
});

/* DELETE delete product by id */
router.delete('/:id', function(req, res, next) {
  ProductModel.findOne({_id: req.params.id}).exec((err,response) => {
    ProductModel.remove({_id: req.params.id}, function(err, data) {
      if (err) {
        return res.status(400).json({
          message: `Erro ao deletar o produto ${req.params.id}`
        });
      }

      res.json({
        message: `Produto ${response.descricao} deletado`
      });
    });
  });
});

/* DELETE delete all the products */
router.delete('/delete/all', function(req, res, next) {
	ProductModel.remove({}, function(err, data) {
		if (err) {
			return res.status(400).json({
				message: 'Erro ao deletar todos os produtos'
			});
		}

		res.json({
			message: 'Todos os produtos foram deletados'
		});
	});
});

/* GET search for products */
router.get('/search/:field/:term', function(req, res, next) {
	query = {};
	query[req.params.field] = new RegExp(req.params.term, 'i');
	ProductModel.find(query).exec((err, results) => {
		if (err) {
			return res.status(400).json({
				message: 'Não foi possível buscar resultados'
			});
		}

		res.json(results);
	});
});

module.exports = router;