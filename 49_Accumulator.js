'use strict';
/* By Ekaterina Khorina */

let accumulator = new Accumulator( 1 );
accumulator.read();
accumulator.read();
console.log( accumulator.value );

/**
 * Конструктор объектов, которые должны хранить текущую сумму
 * и прибавлять к ней то, что вводит посетитель
 * @param {number} startingValue
 * @constructor
 */
function Accumulator( startingValue ) {
    this.value = startingValue;
    
    /**
     * Проверяет является ли полученная переменная числом
     * @param num
     * @return {boolean}
     */
    function isNumber( num ) {
        return !isNaN( parseFloat( num ) ) && isFinite( num );
    }
    
    /**
     * Запрашивает значения при помощи prompt и запоминает их в свойствах объекта
     */
    this.read = function () {
        let variable = null;
        do {
            variable = +prompt( `Введите число`, '0' );
        } while ( !isNumber( variable ) );
        sum( variable );
    };
    
    /**
     * суммирует переданные значения в this.value вводимые
     * @param {number} num
     */
    let sum = ( num ) => this.value += num;
}