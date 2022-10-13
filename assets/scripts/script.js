const user = {
  name: 'Narmin',
  active: true,
  cart: [],
  purchase: [],
};

const item = {
  name: 'apple',
  price: '5',
};

let purchase = function (user, item) {
  const cart = user.cart;
  const purchase = user.purchase;
  let finalPrice = item.price * 1.03;
  item.price = finalPrice;
  cart.push(item);
  if (paid) {purchase.concat(cart);
    cart.re
  }
};

purchase(user, item);
