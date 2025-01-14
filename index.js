const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  res.send(
    (
      parseFloat(req.query.newItemPrice) + parseFloat(req.query.cartTotal)
    ).toString()
  );
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  if (req.query.isMember === 'true') {
    let discountedTotal = cartTotal - (cartTotal * discountPercentage) / 100;
    res.send(discountedTotal.toString());
  } else {
    res.send(cartTotal.toString());
  }
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(((cartTotal * taxRate) / 100).toString());
});

app.get('/estimate-delivery', (req, res) => {
  res.send(
    req.query.shippingMethod === 'express'
      ? (parseFloat(req.query.distance) / 100).toString()
      : (parseFloat(req.query.distance) / 50).toString()
  );
});

app.get('/shipping-cost', (req, res) => {
  res.send(
    (
      parseFloat(req.query.weight) *
      parseFloat(req.query.distance) *
      0.1
    ).toString()
  );
});

app.get('/loyalty-points', (req, res) => {
  res.send((parseFloat(req.query.purchaseAmount) * loyaltyRate).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
