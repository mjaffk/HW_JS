'use strict';

/* By Ekaterina Khorina */

/**
 * выводит результат вычислений математического выражения,
 * введенного пользователем, в parentElement на странице
 * @param parentElement
 */
function evalCalc( parentElement ) {
    let result = null;
    let expression = null;
    let dir = parentElement.appendChild( document.createElement( 'dir' ) );
    try {
        expression = prompt( 'Введите математическое выражение для расчета:', '3*2-2' );
        if ( expression.trim() == '' ) {
            throw new SyntaxError( 'Вы не ввели выражение' )
        }
        result = eval( expression );
        if ( isNaN( result ) ) {
            throw new SyntaxError( 'Это не математическое выражение' );
        }
        dir.textContent = `Результатом вычисления выражения ( ${expression} ) будет ${result}`;
    }
    catch (error) {
        let beResume = confirm( `   Извините, произошла ошибка при вычислениях, исходные данные некорректны.
        Попробовать снова?` );
        if ( beResume ) {
            evalCalc(parentElement);
        } else {
            dir.textContent = `При вычислении выражения ( ${expression} ) произошла ошибка: \
            ${error.name}: ${error.message}.`;
        }
    }
}

evalCalc( document.querySelector( 'body' ) );