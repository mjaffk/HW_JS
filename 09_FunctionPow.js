'use strict';

/*
Напишите функцию pow(x,n), которая возвращает x в степени n.
Иначе говоря, умножает x на себя n раз и возвращает результат.
Создайте страницу, которая запрашивает x и n, а затем выводит результат pow(x,n).
P.S. В этой задаче функция обязана поддерживать только натуральные значения n,
т.е. целые от 1 и выше.
*/

function pow(x, n) {
    if (n !== 1) {
        return x* +pow(x, n-1);
    }
    return x;
}

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

var x;
do {
    x = prompt('Введите x');
//} while (x === null || +x || x !== '0' || +x === 0 );
} while (!isNumber(x));

var n;
do {
    n = prompt('Введите n');
} while (!isNumber(n) || +n !== parseInt(n, 10) || +n <= 0);

alert( x +' в степени '+ n + ' равно ' + pow(+x,+n));