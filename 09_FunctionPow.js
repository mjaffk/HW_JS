'use strict';
/* By Khorina Ekaterina */

/**
 * Возвращает x в степени n
 * @param {number} x - число
 * @param {number} n - целое положительное число
 * @return {*}
 */
function pow(x, n) {
    if (n !== 1) {
        return x* +pow(x, n-1);
    }
    return x;
}

/**
 * Проверяет является ли полученная переменная числом
 * @param num
 * @return {boolean}
 */
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

let x;
do {
    x = prompt('Введите число x');
} while (!isNumber(x));

let n;
do {
    n = prompt('Введите натуральное число n');
} while (!isNumber(n) || +n !== parseInt(n, 10) || +n <= 0);

alert( x +' в степени '+ n + ' равно ' + pow(+x,+n));