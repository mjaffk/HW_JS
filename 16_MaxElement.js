/*
Свойство с наибольшим значением
Есть объект salaries с зарплатами.
Напишите код, который выведет имя сотрудника,
у которого самая большая зарплата.
Если объект пустой, то пусть он выводит «нет сотрудников».
*/

"use strict";

const salaries = {
    "Вася": 100,
    "Петя": 300,
    "Даша": 250
};

alert(isEmpty(salaries) ?'Нет сотрудников' : ('Максимальная зарплата у ' + getMaxSalariesOwner(salaries)));

function getMaxSalariesOwner(salaries) {
    let maxSalaryOwner = null;
    for (let salaryOwner in salaries) {
        maxSalaryOwner = maxSalaryOwner || salaryOwner;

        if (salaries[salaryOwner] >= salaries[maxSalaryOwner]) {
            maxSalaryOwner = salaryOwner;
        }
    }
    return maxSalaryOwner;
}