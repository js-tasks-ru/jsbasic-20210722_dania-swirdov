function toggleText() {
  // ваш код...
  document.querySelector('.toggle-text-button').addEventListener('click', (event) => {
    let text = document.querySelector('#text');
    text.hidden = !text.hidden;
  });
}
