'use strict';

const profile = {
    isAdmin: true,
    age: 28,
    nickname: 'iketari',
    avatar: 'http://i.imgur.com/FHMnsVNt.jpg'
};

/**
 * выводит объект profile в таблицу
 * @return {Element}
 */
function printProfile() {
    let div = document.createElement('div');
    div.innerHTML = `
      <table class="table table-hover table-mc-light-blue">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;

    let tbody = div.querySelector('tbody');


    for (let key in profile) {

        let row = document.createElement('tr');
        let cellKey = document.createElement('td');
        let cellValue = document.createElement('td');

        cellKey.textContent = key;
        row.appendChild(cellKey);

        cellValue.textContent = profile[key];
        row.appendChild(cellValue);

        tbody.appendChild(row);
    }


    return div;
}

document.body.append(printProfile());
