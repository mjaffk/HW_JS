'use strict';
/* By Ekaterina Khorina */

func = makeCaching(func);

let a = func(1);
let b = func(1);
console.log(a === b);

b = func(2);
console.log(a === b);

/**
 * возвращает параметр умноженный на случайное число
 * @param {number} x
 * @return {number}
 */
function func(x) {
    return Math.random() * x;
}

/**
 * декоратор, который берет функцию func и возвращает обертку,
 * которая кеширует её результаты.
 * @param func
 * @return {Function}
 */
function makeCaching(func) {

    let cache = {};

    return function (...args) {

        let joinArgs = args.join('; ');

        if (cache[joinArgs] !== undefined) {
            return cache[joinArgs];
        }

        let result = func.apply(this, args);

        cache[joinArgs] = result;

        return result;
    }
}
