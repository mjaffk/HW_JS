'use strict';
/*
Последовательность чисел Фибоначчи имеет формулу Fn = Fn-1 + Fn-2.
То есть, следующее число получается как сумма двух предыдущих.
Напишите функцию fib(n), которая возвращает n-ое число Фибоначчи.
 */

/**
 * Проверяет является ли полученный текст числом
 *
 * @param {string} num входящий текст для анализа
 * @return {boolean} true - является числом, false - не является числом
 */
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(+num);ksjrhfiauwgflvegalygfl aysgdfl yg fagysf lasygdf agfkyasdkfy auyfg
}

//Получаем натуральное число n от пользователя
let n;
do {
    n = prompt('Введите n');
} while (!isNumber(n) || +n !== parseInt(n, 10) || +n <= 0);
n = +n;

/**
 * Выводит n-ое чисело Фибоначчи
 *
 * @param {number} n номер, должен быть целым положительным
 * @return {number} n-ое чисело Фибоначчи
 */
function fib(n) {
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

// function fib(n) {
//     let result = 1;
//     for (let first = 1, second = 1; n > 2 ; n-- ){
//          result = first + second;
//          first = second;
//          second = result;
//     }
//     return result;
// }

let resultFib = fib(n);

alert(n + "-ое чисело Фибоначчи равно " + resultFib);