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

  addPointerEvent(steps, thumb) {
    document.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      if (event.target.classList.contains('slider__thumb')) {
        let pointerMove = (event) => {
          steps[this.active].classList.remove('slider__step-active');
          let left = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
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
          thumb.style.left = this.elem.querySelector('.slider__progress').style.width = 100 * this.active / (this.steps - 1) + '%';
          this.addCustomEvent();
        }
        document.addEventListener('pointermove', pointerMove);
        document.addEventListener('pointerup', pointerUp);
      }
    });
  }

  addClickEvent(steps, thumb) {
    this.elem.addEventListener('click', (event) => {
      event.preventDefault();
      steps[this.active].classList.remove('slider__step-active');
      if (event.target.tagName == 'SPAN') {
        this.active = +event.target.textContent;
      }
      else {
        this.active = Math.round(((event.clientX - this.elem.getBoundingClientRect().x) / this.elem.offsetWidth) * (this.steps - 1));
      }
      steps[this.active].classList.add('slider__step-active');
      thumb.style.left = this.elem.querySelector('.slider__progress').style.width = 100 * this.active / (this.steps - 1) + '%';
      thumb.querySelector('span').textContent = this.active;
      this.addCustomEvent();
    });
  }

  addEvents() {
    let steps = this.elem.querySelector('.slider__steps').querySelectorAll('span');
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    this.addClickEvent(steps, thumb);
    this.addPointerEvent(steps, thumb);
  }

  addCustomEvent() {
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      bubbles: true,
      detail: this.active
    }));
  }
}
