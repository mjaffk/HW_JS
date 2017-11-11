'use strict';
/* By Ekaterina Khorina */

let arr = [1, 2, 3, 4, 5, 6, 7];

alert( filter( arr, function ( a ) {
    return a % 2 === 0;
} ) ); // 2,4,6

alert( filter( arr, inBetween( 3, 6 ) ) ); // 3,4,5,6

alert( filter( arr, inArray( [1, 2, 10] ) ) );


/**
 * Получает массив arr и возвращает новый, в который входят только те элементы arr,
 * для которых func возвращает true
 * @param {Array} arr
 * @param {Function} func
 * @return {Array.<T>|*}
 */
function filter ( arr, func ) {
    return arr.filter((item) => func(item));
}

/**
 * Выберет только числа от a до b
 * @param {number} a
 * @param {number} b
 * @return {Function}
 */
function inBetween(a,b) {
    return function ( item ) {
        return item >= a && item <= b;
    }
}

/**
 * Выберет только элементы, совпадающие с одним из значений массива filterArr
 * @param {Array} filterArr
 * @return {Function}
 */
function inArray ( filterArr ) {
    return function ( item ) {
        return filterArr.some((filterItem) => item === filterItem);
    }
}
