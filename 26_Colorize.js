'use strict';
/*
Напишите функцию, которая окрасит содержимое
каждой ячейки таблицы table в произвольный цвет.
Для получения цвета используйте функцию getRandomColor()
*/

function getRandomColor () {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const profile = {
    age: 28,
    isMale: true,
    nickname: 'iketari',
    karma: null,
    role: 'admin'
};


function fillProfileTable (table) {
    for (let key in profile) {
        let row = document.createElement('tr');
        let cellKey = document.createElement('td');
        let cellValue = document.createElement('td');

        cellKey.textContent = key;
        cellValue.textContent = profile[key];
        row.append(cellKey, cellValue);
        table.append(row);
    }
}

function colorizeProfile(table) {
    let tdList = Array.from(table.getElementsByTagName('td'));
    tdList.forEach((td) => {
        td.style.color = getRandomColor();
    });
}

let table = document.querySelector('table');
fillProfileTable(table);
colorizeProfile(table);
