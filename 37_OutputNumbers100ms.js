'use strict';

/* By Ekaterina Khorina */

/**
 * последовательно выводит в консоль числа от 1 до 20,
 * с интервалом между числами 100 мс через setInterval
 */
function printNumbersInterval1() {
    let calc = 1;
    let timerId = setInterval(function () {
        console.log(calc++);
        if (calc > 20) {
            return clearInterval(timerId);
        }
    }, 100);
}

/**
 * последовательно выводит в консоль числа от 1 до 20,
 * с интервалом между числами 100 мс через setTimeout
 */
function printNumbersInterval2() {
    let calc = 1;
    setTimeout(function timer() {
        console.log(calc);
        if (calc < 20) {
            calc++;
            return setTimeout(timer, 100)
        }
    }, 100);
}

console.log(printNumbersInterval1.name);
printNumbersInterval1();
setTimeout(function () {
    console.log(printNumbersInterval2.name);
    printNumbersInterval2();
}, 2000);
