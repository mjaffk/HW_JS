'use strict';
/*
Сумма свойств
важность: 5
Есть объект salaries с зарплатами.
Напишите код, который выведет сумму всех зарплат.
Если объект пустой, то результат должен быть 0
*/

let salaries = {
    // "Вася": 100,
    // "Петя": 300,
    // "Даша": 250
};

alert('Выведем сумму: ' + sumSalaries(salaries));

function sumSalaries(salaries) {
    let sum = 0;
    for (let key in salaries) {
        sum += salaries[key];
    }
    return sum;
}