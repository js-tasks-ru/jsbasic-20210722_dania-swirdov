import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.addEvents();
  }

  render() {
    this.elem = createElement(`
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
      </div>
    </div>
    `);

    let inner = this.elem.querySelector('.carousel__inner');
    for (let slide of this.slides) {
      inner.append(createElement(`
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `));
    }
  }

  addEvents() {
    let slidesElems = Array.from(this.elem.querySelectorAll('.carousel__slide'));
    let activeSlideIndex = 0;
    let leftArrow = this.elem.querySelector('.carousel__arrow_left');
    let rightArrow = this.elem.querySelector('.carousel__arrow_right');
    let inner = this.elem.querySelector('.carousel__inner');

    leftArrow.style.display = 'none';
    this.elem.addEventListener('click', (event) => {
      let slideWidth = slidesElems[activeSlideIndex].offsetWidth;
      if (event.target.closest('div') && event.target.closest('div').classList.contains('carousel__arrow_right')) {
        activeSlideIndex = (activeSlideIndex + this.slides.length + 1) % this.slides.length;
        if (activeSlideIndex == this.slides.length - 1) {
          rightArrow.style.display = 'none';
        } else {
          leftArrow.style.display = '';
        }
        inner.style.transform = `translateX(-${slideWidth * activeSlideIndex}px)`;
      }
      else if(event.target.closest('div') && event.target.closest('div').classList.contains('carousel__arrow_left')) {
        activeSlideIndex = (activeSlideIndex + this.slides.length - 1) % this.slides.length;
        if (activeSlideIndex == 0) {
          leftArrow.style.display = 'none';
        } else {
          rightArrow.style.display = '';
        }
        inner.style.transform = `translateX(-${slideWidth * activeSlideIndex}px)`;
      }
      else if (event.target.closest('button') && event.target.closest('button').classList.contains('carousel__button')) {
        this.elem.dispatchEvent(new CustomEvent("product-add", { 
          detail: this.slides[activeSlideIndex].id, 
          bubbles: true 
        }));
      } else return;
    });
  }
}
