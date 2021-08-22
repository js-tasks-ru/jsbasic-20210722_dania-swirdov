import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
  }

  async render() {
    // ... ваш код
    let promise = new Promise((resolve) => {
      document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
      document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
      document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
      document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

      this.addEvents();
      resolve();
    });

    await fetch('products.json')
      .then(res => res.json())
      .then(res => {
        this.productsGrid = new ProductsGrid(res);
        document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);
        this.productsGrid.updateFilter({
          noNuts: document.getElementById('nuts-checkbox').checked,
          vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
          maxSpiciness: this.stepSlider.active
        });
      });
    
    return promise;
  }

  onProductAdd = (event) => {
    this.cart.addProduct(Array.from(this.productsGrid.products).find((value) => value.id == event.detail));
  }

  onSliderChange = (event) => {
    this.productsGrid.updateFilter({
      maxSpiciness: event.detail
    });
  }

  onRibbonSelect = (event) => {
    this.productsGrid.updateFilter({
      category: event.detail
    });
  }

  onNutsChange = (event) => {
    this.productsGrid.updateFilter({
      noNuts: event.target.checked
    });
  }

  onVegetarianChange = (event) => {
    this.productsGrid.updateFilter({
      vegeterianOnly: event.target.checked
    });
  }

  addEvents() {
    document.body.addEventListener('product-add', this.onProductAdd);
    document.body.addEventListener('slider-change', this.onSliderChange);
    document.body.addEventListener('ribbon-select', this.onRibbonSelect);
    document.getElementById('nuts-checkbox').addEventListener('change', this.onNutsChange);
    document.getElementById('vegeterian-checkbox').addEventListener('change', this.onVegetarianChange);
  }
}