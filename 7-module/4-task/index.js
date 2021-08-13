import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.active = value;
    this.render(steps, value);
    this.addEvents();
  }

  render() {
    this.elem = createElement(`<div class="slider">
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps">
      </div>
    </div>`);
    let steps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      steps.insertAdjacentHTML('beforeend',`<span>${i}</span>`)
    }
    steps = steps.querySelectorAll('span');
    if (this.active < this.steps) steps[this.active].classList.add('slider__step-active');
  }

  addEvents() {
    let steps = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    let addCustomEvent = () => {
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        bubbles: true,
        detail: this.active
      }));
    }
    this.elem.addEventListener('click', (event) => {
      event.preventDefault();
      steps[this.active].classList.remove('slider__step-active');
      if (event.target.tagName == 'SPAN') {
        this.active = +event.target.textContent;
      }
      else {
        let width = getComputedStyle(this.elem).width;
        width = width.slice(0, width.length - 2);
        let step = 100 / (this.steps - 1);
        let dist = Math.floor((event.clientX - this.elem.getBoundingClientRect().x) * 100 / width);
        if (dist % step < step / 2)
          this.active = Math.trunc(dist / step);
        else 
          this.active = Math.trunc(dist / step) + 1;
      }
      steps[this.active].classList.add('slider__step-active');
      thumb.style.left = this.elem.querySelector('.slider__progress').style.width = 100 * this.active / (this.steps - 1) + '%';
      thumb.querySelector('span').textContent = this.active;
      addCustomEvent();
    });

    document.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('slider__thumb')) {
        let left;
        let pointerMove = (event) => {
          left = event.pageX - this.elem.getBoundingClientRect().left;
          left = left / this.elem.offsetWidth;
          if (left > 1) left = 1;
          else if (left < 0) left = 0; 
          this.active = Math.round(left * (this.steps - 1));
          this.elem.classList.add('slider_dragging');
          steps[this.active].classList.add('slider__step-active');
          thumb.style.left = this.elem.querySelector('.slider__progress').style.width = left * 100 + '%';
          thumb.querySelector('span').textContent = this.active;
        }
        let pointerUp = () => {
          document.removeEventListener('pointermove', pointerMove);
          document.removeEventListener('pointerup', pointerUp);
          this.elem.classList.remove('slider_dragging');
          addCustomEvent();
        }
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
      }
    });
  }
}
