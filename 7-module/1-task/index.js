import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEvents();
  }

  render() {
    this.elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    </nav>

    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    </div>`);
    let inner = this.elem.querySelector('nav');
    for (let category of this.categories) {
      inner.insertAdjacentHTML('beforeend', `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name[0].toUpperCase() + category.name.slice(1)}</a>`);
    }
    inner.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  addEvents() {
    let inner = this.elem.querySelector('nav'); 
    this.elem.addEventListener('click', (event) => {
      if (event.target.closest('.ribbon__arrow_left')) {
        inner.scrollBy(-350, 0);
      }
      else if (event.target.closest('.ribbon__arrow_right')) {
        inner.scrollBy(350, 0);
      }
      else if (event.target.closest('.ribbon__item')) {
        event.preventDefault();
        let active = event.currentTarget.querySelector('.ribbon__item_active');
        let current = event.target.closest('.ribbon__item');
        if (active) active.classList.remove('ribbon__item_active');
        current.classList.add('ribbon__item_active');
        let select = new CustomEvent('ribbon-select', {
          detail: current.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(select);
      }
    });

    inner.addEventListener('scroll', () => {
      let scrollRight = inner.scrollWidth - inner.clientWidth - inner.scrollLeft;
      if (inner.scrollLeft == 0) this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      else if (scrollRight == 0 || scrollRight == 1) 
        this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      else {
        this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
        this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    });

    
  }
}
