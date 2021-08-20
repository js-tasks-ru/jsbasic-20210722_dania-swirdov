export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    if (!product) return;
    let newItem = {product: product, count: 1};
    let index = this.cartItems.findIndex(item => item.product === product);
    if (index == -1) {
      this.cartItems.push(newItem);
    } else this.cartItems[index].count += 1;
    this.onProductUpdate(newItem);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let index;
    let item = this.cartItems.find((product, i) => {index = i; return product.product.id == productId;});
    if (!item) return;
    item.count += amount;
    if (item.count <= 0) {
      this.cartItems.splice(index, 1);
    }
    this.onProductUpdate(item);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    // ваш код
    let total = 0;
    for (let product of this.cartItems) {
      total += product.count;
    }
    return total;
  }

  getTotalPrice() {
    // ваш код
    let total = 0;
    for (let product of this.cartItems) {
      total += product.product.price * product.count;
    }
    return total;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

