'use strict';

/*
Напишите функцию sumTo(n), которая для данного n вычисляет сумму чисел от 1 до n
Сделайте три варианта решения:
1. С использованием цикла.
2. Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) для n > 1.
3. С использованием формулы для суммы арифметической прогрессии.
*/

/**
 * Рассчитывает сумму чисел от 1 до n через цикл
 *
 * @param {number} n степень, должна быть целым числом больше 0
 * @return {number} сумму чисел от 1 до n
 */
function SumToCycle(n) {
    let result = 0;
    for (; !!n; n--) {
        result += n;
    }
    return result;
}

/**
 * Рассчитывает сумму чисел от 1 до n через рекурсию
 *
 * @param {number} n степень, должна быть целым числом больше 0
 * @return {number} сумму чисел от 1 до n
 */
function sumToRecursion(n) {
    if (n !== 1) {
        return n + sumToRecursion(n - 1);
    }
    return n;
}

/**
 * Рассчитывает сумму чисел от 1 до n через по формуле суммы арифметической прогрессии
 *
 * @param {number} n степень, должна быть целым числом больше 0
 * @return {number} сумму чисел от 1 до n
 */
function sumToFormula(n) {
    return n * (1 + n) / 2;
}

/**
 * Проверяет является ли полученный текст числом
 *
 * @param {string} num входящий текст для анализа
 * @return {boolean} true - является числом, false - не является числом
 */
function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(+num);
}

let n;

do {
    n = prompt('Введите натуральное n');
} while (!isNumber(n) || +n !== parseInt(n, 10) || +n <= 0);
n = +n;


let t0;
let t1;

t0 = performance.now();
let resultSumToCycle = SumToCycle(n);
t1 = window.performance.now();
let timeSumToCycle = (t1 - t0).toFixed(2);

t0 = window.performance.now();
let resultSumToRecursion = sumToRecursion(n);
t1 = window.performance.now();
let timeSumToRecursion = (t1 - t0).toFixed(2);


t0 = window.performance.now();
let resultSumToFormula = sumToFormula(n);
t1 = window.performance.now();
let timeSumToFormula = (t1 - t0).toFixed(2);


console.log('Сумма натуральных до ' + n + ' при расчете циклом равна '
    + resultSumToCycle + ', рассчитано за ' + timeSumToCycle + 'мс\n\n'
    + 'Сумма натуральных до ' + n + ' при расчете рекурсией равна '
    + resultSumToRecursion + ', рассчитано за ' + timeSumToRecursion + 'мс\n\n'
    + 'Сумма натуральных до ' + n + ' при расчете по формуле равна '
    + resultSumToFormula + ', рассчитано за ' + timeSumToFormula + 'мс');
