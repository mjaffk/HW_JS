'use strict';

function foo () {
    console.log('FOO');
}

/**
 * декоратор, измерящий время РАБОТЫ функции
 * @param {Function} func
 * @return {Function}
 */
function timeDecorator (func) {
    return function (...args) {
        let timeStart = Date.now();
        let result = func(args).apply(this);
        let timeEnd = Date.now();
        console.log((timeEnd - timeStart) + 'ms');
        return result;
    };
}


let timeLogFoo = timeDecorator(foo);

timeLogFoo();
