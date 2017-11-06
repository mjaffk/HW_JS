'use strict';
/*
Создайте функцию sumArgs(), которая будет суммировать все свои аргументы,
аргументы переданы через запятую, без массива
Для решения примените метод reduce к arguments,
используя call, apply или одалживание метода.

*/

// by ...
function sumArgs1(...args) {
    return args.reduce((sum, arg) => sum + arg);
}

//by call
function sumArgs2() {
    return [].reduce.call(arguments, (sum, arg) => sum + arg);
}

//by apply
function sumArgs3() {
    return [].reduce.apply(arguments, [(sum, arg) => sum + arg]);
}

//by одалживание метода
function sumArgs4() {
    arguments.reduce = [].reduce;
    return arguments.reduce((sum, arg) => sum + arg);
}


alert( sumArgs1(1, 2, 3) + ' ' + sumArgs2(1, 2, 3) + ' ' + sumArgs3(1, 2, 3) + ' ' + sumArgs4(1, 2, 3));
