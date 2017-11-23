'use strict';
/* By Ekaterina Khorina */

let calculator = new Calculator();

calculator.read();

console.log( "Сумма = " + calculator.sum() );
console.log( "Произведение = " + calculator.mul() );

/**
 * функция-конструктор, которая создает калькулятор
 * @constructor
 */
function Calculator() {
    
    /**
     * Проверяет является ли полученная переменная числом
     * @param num
     * @return {boolean}
     */
    function isNumber( num ) {
        return !isNaN( parseFloat( num ) ) && isFinite( num );
    }
    
    let variables = {
        'a' : null,
        'b' : null
    };
    
    /**
     * Запрашивает два значения при помощи prompt и запоминает их в свойствах объекта
     */
    this.read = function () {
        for (let key in variables) {
            do {
                variables[key] = +prompt( `Введите число ${key}`, '0' );
            } while ( !isNumber( variables[key] ) );
        }
    };
    
    /**
     * Возвращает сумму запомненных свойств
     * @return {number}
     */
    this.sum = function() {
        let result = 0;
        for (let key in variables) {
            result += variables[key];
        }
        return result;
    };
    
    /**
     * Возвращает произведение запомненных свойств
     * @return {number}
     */
    this.mul = function() {
        let result = 1;
        for (let key in variables) {
            result *= variables[key];
        }
        return result;
    };

}