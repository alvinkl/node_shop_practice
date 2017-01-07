const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Cart = require('../models/cart');
/* GET home page. */
router.get('/', (req, res, next) => {
  let products = Product.find((err, docs) => {
    let productChunks = [];
    let chunkSize = 3;

    for (let i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }

    res.render('./shop/index', {
      title: 'Shopping Cart',
      products: productChunks
    });
  });
});

router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, (err, product) => {
    if (err) return res.redirect('error');

    cart.add(product, productId);
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/');
  });
});

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/shopping-cart', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/checkout', (req, res, next) => {

});

module.exports = router;
