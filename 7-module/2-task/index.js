import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.close = this.close.bind(this);
    this.addEvents();
  }

  render() {
    this.elem = createElement(`<div class="modal">
    <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            
          </h3>
        </div>

        <div class="modal__body">
          
        </div>
      </div>

    </div>`);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(newBody) {
    let body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(newBody);
  }

  close(event) {
    if (event) {
      if (event.target.closest('.modal__close')) {
        this.elem.remove();
        document.body.classList.remove('is-modal-open');
      }
      else if (event.code == 'Escape') {
        this.elem.remove();
        document.body.classList.remove('is-modal-open');
        document.removeEventListener('keydown', this.close);
      } else return;
    } else {
      this.elem.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  addEvents() {
    this.elem.querySelector('.modal__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this.close);
  }
}
