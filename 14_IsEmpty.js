'use strict';
/* Определите, пуст ли объект
Создайте функцию isEmpty(obj), которая возвращает true,
если в объекте нет свойств и false – если хоть одно свойство есть.
*/

let schedule = {};
// alert( isEmpty(schedule) ); // true

schedule["8:30"] = "подъём";
// alert( isEmpty(schedule) ); // false

function isEmpty(obj) {
    return lengthObject(obj) === 0;
}

function lengthObject(obj) {
    let length = 0;
    for (let key in obj) {
        length++;
    }
    return length;
}