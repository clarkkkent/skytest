export default class Modal {
  constructor(elem) {
    this.elem = elem;
    this.body = document.querySelector('body');
    this.modal = null;
    this.inner = null;
    this.overlay = null;
    this.button = null;
    this.closer = null;
    this.title = null;
    this.content = null;
  }

  openModal() {
    this.createModal();
    this.setContent();
    this.addEvents();
    this.setBodyOverflowHidden();
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');

    this.inner = document.createElement('div');
    this.inner.classList.add('modal__inner');

    this.overlay = document.createElement('div');
    this.overlay.classList.add('modal__overlay');

    this.content = document.createElement('div');
    this.content.classList.add('modal__content');

    this.button = document.createElement('button');
    this.button.classList.add('modal__button');
    this.button.classList.add('button');
    this.button.innerHTML = 'Confirm and Pay';

    this.closer = document.createElement('span');
    this.closer.classList.add('modal__closer');

    this.title = document.createElement('h2');
    this.title.innerHTML = 'Confirmation';
    this.title.classList.add('modal__title');

    this.body.appendChild(this.modal);
    this.modal.appendChild(this.overlay);
    this.modal.appendChild(this.inner);
    this.inner.appendChild(this.title);
    this.inner.appendChild(this.content);
    this.inner.appendChild(this.button);
    this.inner.appendChild(this.closer);
  }

  closeModal() {
    this.modal.remove();
    this.removeBodyOverflowHidden();
  }

  setContent() {
    this.content.innerHTML = this.elem.innerHTML;
  }

  addEvents() {
    this.overlay.addEventListener('click', this.closeModal.bind(this));
    this.closer.addEventListener('click', this.closeModal.bind(this));
  }

  setBodyOverflowHidden() {
    this.body.classList.add('modal-opened');
  }

  removeBodyOverflowHidden() {
    this.body.classList.remove('modal-opened');
  }
}