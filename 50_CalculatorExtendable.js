'use strict';
/* By Ekaterina Khorina */

//todo: Научиться подключать автотесты

let calc = new Calculator();

console.log( calc.calculate( "3 + 7" ) );

let powerCalc = new Calculator;
powerCalc.addMethod( "*", function ( a, b ) {
    return a * b;
} );

powerCalc.addMethod( "/", function ( a, b ) {
    return a / b;
} );

powerCalc.addMethod( "**", function ( a, b ) {
    return Math.pow( a, b );
} );

let result = powerCalc.calculate( "2 ** 3" );
console.log( result );

/**
 * Конструктор расширяемых объектов-калькуляторов
 * @constructor
 */
function Calculator() {
    
    let expression = new Expression();
    
    /**
     * Принимает строку, с жестко заданным форматом «ЧИСЛО операция ЧИСЛО» (по одному пробелу вокруг операции),
     * и возвращает результат
     */
    this.calculate = function ( str ) {
        try {
            expression.parse( str );
            if ( expression.verify() ) {
                return expression.execute();
            }
        }
        catch ( error ) {
            console.error( `При выполнении выражения ( ${str} ) что-то пошло не так: \
            ${error.name}: ${error.message}. ${error.stack}` )
        }
    };
    
    /**
     * учит калькулятор новой операции: получает имя операции method
     * и функцию от двух аргументов func(a,b), которая должна её реализовывать
     * @param {string} method
     * @param {function} func
     */
    this.addMethod = function ( method, func ) {
        try {
            if ( typeof method === 'string' && typeof func === 'function' ) {
                expression.setMethod( method, func );
            }
            else throw new SyntaxError();
        }
        catch ( error ) {
            console.error( `При добавлении метода, что-то пошло не так: \
            ${error.name}: ${error.message}. \
            ${(error.stack) ? error.stack : 'Проверьте синтаксис: Object.addMethod({string}, {function})'}` );
            
        }
    };
}


/**
 * Конструктор объекта математического выражения для калькулятора Calculator
 * @constructor
 */
function Expression() {
    
    let methods = {
        '+' : ( a, b ) => a + b,
        '-' : ( a, b ) => a - b,
    };
    
    let a = null;
    let b = null;
    let operator = null;
    
    /**
     * Разбирает полученную строку во внутренние переменные
     * @param str {string}
     */
    this.parse = function ( str ) {
        let parsStr = str.split( ' ' );
        a = +parsStr[ 0 ];
        b = +parsStr[ 2 ];
        operator = parsStr[ 1 ];
    };
    
    /**
     * Проверяет является ли полученная переменная числом
     * @param num
     * @return {boolean}
     */
    function isNumber( num ) {
        return !isNaN( parseFloat( num ) ) && isFinite( num );
    }
    
    /**
     * Проверяет, что в объекте expression a, b - number, method - определен через объект methods
     * @return {boolean}
     */
    this.verify = function () {
        
        if ( !isNumber( a ) ) {
            console.error( 'Переменная а не является числом' );
            return false;
        }
        
        if ( !isNumber( b ) ) {
            console.error( 'Переменная b не является числом' );
            return false;
        }
        
        if ( !Object.keys( methods ).some( ( key ) => key === operator ) ) {
            console.error( `Оператор ${operator} не определен` );
            return false;
        }
        
        return true;
    };
    
    /**
     * Добавляет в объект methods свойство func с ключом method
     * @param {string} method
     * @param {function} func
     */
    this.setMethod = function ( method, func ) {
        methods[ method ] = func;
    };
    
    /**
     * Выполняет математическое выражение expression
     */
    this.execute = function () {
        return methods[ operator ]( a, b );
    };
}
