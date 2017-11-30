'use strict';
/* By Ekaterina Khorina */

let f = function ( a ) {
    console.log( a )
};

// затормозить функцию до одного раза в 1000 мс
let f1000 = throttle( f, 1000 );
let f2000 = throttle2( f, 2000 );

f1000( 1 ); // выведет 1
f1000( 2 ); // (тормозим, не прошло 1000 мс)
f1000( 3 ); // (тормозим, не прошло 1000 мс)
setTimeout( function () {
    f1000( 4 )
}, 1000 );
setTimeout( function () {
    f1000( 5 )
}, 1100 );
setTimeout( function () {
    f1000( 6 )
}, 1500 );


f2000( 1 ); // выведет 1
f2000( 2 ); // (тормозим, не прошло 1000 мс)
f2000( 3 ); // (тормозим, не прошло 1000 мс)
setTimeout( function () {
    f2000( 4 )
}, 2000 );
setTimeout( function () {
    f2000( 5 )
}, 2100 );
setTimeout( function () {
    f2000( 6 )
}, 2500 );
// когда пройдёт 1000 мс...
// выведет 3, промежуточное значение 2 игнорируется


/**
 * "Тормозилка", возвращает обёртку, передающую вызов f не чаще, чем раз в ms миллисекунд
 * если игнорируемый вызов оказался последним, т.е. после него до окончания задержки ничего нет – то он выполнится
 * @param func
 * @param ms
 * @return {Function}
 */
function throttle( func, ms ) {
    
    let inCooldown = false;
    let lastTimeout = null;
    let lastTime = null;
    
    return function fTimer( ...args ) {
        
        clearTimeout( lastTimeout );
        
        if ( inCooldown ) {
            
            return lastTimeout = setTimeout( function () {
                return fTimer.apply( this, args )
            }, ms - (Date.now() - lastTime) );
        }
        
        inCooldown = true;
        
        setTimeout( () => inCooldown = false, ms );
        lastTime = Date.now();
        return func.apply( this, args );
    }
}


/**
 * "Тормозилка", возвращает обёртку, передающую вызов f не чаще, чем раз в ms миллисекунд
 * если игнорируемый вызов оказался последним, т.е. после него до окончания задержки ничего нет – то он выполнится
 * @param {Function} func
 * @param ms
 * @return {Function}
 */
function throttle2( func, ms ) {
    
    let isThrottled = false,
        savedArgs = null,
        savedThis = null;
    
    return function wrapper( ...args ) {

        if ( isThrottled ) {
            savedArgs = args;
            savedThis = this;
            return;
        }

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
            if ( savedArgs ) {
                wrapper.apply ( savedThis, savedArgs );
                savedArgs = null;
                savedThis = null;
            }
        }, ms );
    
        return func.apply( this, args );
    }
}
