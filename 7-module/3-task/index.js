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
    this.elem.addEventListener('click', (event) => {
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

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        bubbles: true,
        detail: this.active
      }));
    });
  }
}
