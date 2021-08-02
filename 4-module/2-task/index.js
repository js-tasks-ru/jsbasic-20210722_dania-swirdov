function makeDiagonalRed(table) {
  // ваш код...
  for (row of table.rows) {
    row.cells[row.rowIndex].style.backgroundColor = 'red';
  }
}
