function hideSelf() {
  // ваш код...
  document.querySelector('.hide-self-button').addEventListener('click', (event) => {
    event.target.hidden = true;
  });
}
