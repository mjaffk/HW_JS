'use strict';

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

/**
 * Компоратор для сортировки объектов в массиве по полю
 * @param {string} field
 * @return {function}
 */
function byField(field) {
    return (a, b) => (a[field] > b[field]) ? 1 : -1;
}


/**
 * Отображает массив объектов в виде HTML таблицы
 * @param {Object[]} dataArray
 * @param {string} tName - название таблицы
 */
function printTable(dataArray,tName) {
    let table = document.createElement('table');

    let thead = table.appendChild(document.createElement('thead'));
    thead.innerHTML =
        `<tr> 
            <th>Name</th>
            <th>Age</th>
            <th>Surname</th>
        </tr>`;

    let tbody = table.appendChild(document.createElement('tbody'));

    dataArray.map((element) => {
        let {name, age, surname} = element;

        let cellName = document.createElement('td');
        cellName.textContent = name;
        let cellAge = document.createElement('td');
        cellAge.textContent = age;
        let cellSurname = document.createElement('td');
        cellSurname.textContent = surname;

        let row = document.createElement('tr');
        row.append(cellName, cellAge, cellSurname);

        tbody.append(row);
    });

    let div = document.querySelector('div');

    let p = div.appendChild(document.createElement('p'));
    p.textContent = tName;

    let pre = p.appendChild(document.createElement('pre'));
    pre.appendChild(table);
}

/**
 *
 * @param {Object []} dataArray массив для сортировки
 * @param {string} field  поле для сортировки
 */
function sortByField(dataArray, field) {

    let isSortable = dataArray.some((item) => {
        return item[field] !== undefined;
    });

    if (isSortable) {
        console.log('Error: Невозможно отсортировать массив');
        return dataArray;
    }

    return dataArray.sort(byField(field));
}


printTable(sortByField(users, 'name'), 'Сортировка по Name');
printTable(sortByField(users, 'age'), 'Сортировка по Age');

