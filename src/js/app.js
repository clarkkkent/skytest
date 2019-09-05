import '../scss/app.scss';

import '../fonts/Avenir/avenir.css';

import Device from '../svg/device.svg';
import Monitor from '../svg/monitor.svg';
import Laptop from '../svg/laptop.svg';
import Modal from './modal';

document.addEventListener('DOMContentLoaded', openModal);

function openModal() {
  const links = document.querySelectorAll('[data-modal]');
  links.forEach((link) => {
    link.addEventListener('click', function () {
      const modal = new Modal(this);
      modal.openModal();
    })
  })
}