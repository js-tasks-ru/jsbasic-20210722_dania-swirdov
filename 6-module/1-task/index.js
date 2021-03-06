/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);
  }
  render(rows) {
    this.elem = document.createElement('table');
    this.elem.innerHTML = `    
    <thead>
      <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
      </tr>
    </thead>
    <tbody>
    </tbody>`;
    for (let user of rows) {
      let row = document.createElement('tr');
      let cross = document.createElement('td');
      let crossBtn = document.createElement('button');
      crossBtn.textContent = 'X';
      cross.append(crossBtn);
      for (let col of this.elem.querySelectorAll('th')) {
        if (col.textContent == '') break;
        let cell = document.createElement('td');
        if (col.textContent == 'Имя') cell.textContent = user['name'];
        else if (col.textContent == 'Возраст') cell.textContent = user['age'];
        else if (col.textContent == 'Зарплата') cell.textContent = user['salary'];
        else if (col.textContent == 'Город') cell.textContent = user['city'];
        row.append(cell);
      }
      row.append(cross);
      this.elem.querySelector('tbody').append(row);
    }
    this.elem.addEventListener('click', (event) => {
      if (event.target.textContent == 'X') event.target.closest('tr').remove();
    });
  }
}
