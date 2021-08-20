import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    
    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form name="order" class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    let list = document.createElement('div');
    for (let product of this.cartItems) {
      list.append(this.renderProduct(product.product, product.count));
    }
    this.modal.setBody(list);
    this.modal.open();
    this.modal.elem.querySelector('.modal__body').append(this.renderOrderForm());
    this.modal.elem.querySelector('form.cart-form').addEventListener('submit', this.onSubmit);
  }

  addCounterEvent = () => {
    this.modal.elem.addEventListener('click', (e) => {
      let btn = e.target.closest('button');
      if (btn) {
        if (btn.classList.contains('cart-counter__button_minus')) {
          this.updateProductCount(e.target.closest('.cart-product').dataset.productId, -1);
        } else if (btn.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(e.target.closest('.cart-product').dataset.productId, 1);
        }
      }
    });
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    if (document.body.classList.contains('is-modal-open')) {
      let modal = document.querySelector('.modal');
      let productElem = modal.querySelector(`[data-product-id="${cartItem.product.id}"]`);
      if (!productElem) return;
      if (cartItem.count == 0) productElem.remove();
      else {
        productElem.querySelector('.cart-product__price').textContent = '€' + (cartItem.count * cartItem.product.price).toFixed(2);
        productElem.querySelector('.cart-counter__count').textContent = cartItem.count;
      }
      if (this.isEmpty()) this.modal.close();
      else this.modal.elem.querySelector('.cart-buttons__info-price').textContent = '€' + this.getTotalPrice().toFixed(2);
    }
    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    // ...ваш код
    event.preventDefault();
    document.forms.order.querySelector('button[type=submit]').classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.forms.order)
    })
    .then(() => {
      console.log(this);
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`
      ));
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => {this.renderModal(); this.addCounterEvent();};
  }
}

