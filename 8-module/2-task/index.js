import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render = () => {
    this.elem = createElement(
      `<div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`
    );
    for (let product of this.products) {
      let productCard = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    }
  }

  updateFilter = (filters) => {
    Object.assign(this.filters, filters);
    let inner = this.elem.querySelector('.products-grid__inner');
    inner.innerHTML = '';
    this.products.forEach((product) => {
      if(product.hasOwnProperty('nuts')) debugger;
      if (this.filters.noNuts && product.nuts) {
        return;
      } else if (this.filters.vegeterianOnly && (!product.vegeterian || !product.hasOwnProperty('vegeterian'))) {
        return;
      } else if (this.filters.maxSpiciness && product.hasOwnProperty('spiciness') && product.spiciness && (product.spiciness > this.filters.maxSpiciness)) {
        return;
      } else if (this.filters.category && product.hasOwnProperty('category') && product.category && (product.category != this.filters.category)) {
        return;
      }
      let productCard = new ProductCard(product);
      this.elem.querySelector('.products-grid__inner').append(productCard.elem);
    });
  }
}
