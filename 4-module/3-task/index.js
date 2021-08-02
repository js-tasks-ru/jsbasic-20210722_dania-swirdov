function highlight(table) {
  // ваш код...
  for (row of table.querySelector('tbody').rows) {
    let status = row.querySelector('[data-available]');
    if (status) {
      if (status.dataset.available == 'true') row.classList.add('available');
      else row.classList.add('unavailable');
    } else row.setAttribute('hidden', true);
    if (row.cells[2].textContent == 'm') row.classList.add('male');
    if (row.cells[2].textContent == 'f') row.classList.add('female');
    if (row.cells[1].textContent < 18) row.style.textDecoration = 'line-through';
  }
}
