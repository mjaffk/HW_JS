'use strict';
/* By Ekaterina Khorina */

/**
 * Вызывает func(arg1, arg2...), то есть передать в func все аргументы,
 * начиная со второго, и возвратить результат.
 * @param func произвольная функция
 * @param args произвольное количество аргументов
 * @return {*}
 */
function applyAll(func, ...args) {
    return func.apply(this, args);
}

/**
 * суммирует аргументы: sum(1,2,3) = 6
*/
function sum() {
    return [].reduce.call(arguments, function(a, b) {
        return a + b;
    });
}

/**
 * перемножает аргументы: mul(2,3,4) = 24
*/
function mul() {
    return [].reduce.call(arguments, function(a, b) {
        return a * b;
    });
}
alert( applyAll(Math.max, 2, -2, 3) ); // 3
alert( applyAll(Math.min, 2, -2, 3) ); // -2
alert( applyAll(sum, 1, 2, 3) ); // -> sum(1, 2, 3) = 6
alert( applyAll(mul, 2, 3, 4) ); // -> mul(2, 3, 4) = 24
