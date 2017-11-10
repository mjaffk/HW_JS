'use strict';
/* By Ekaterina Khorina */


function f(a) {
    console.log('сработало!' + a);
}

f = debounce2(f, 1000);

f(1);
f(2);

setTimeout( function() { f(3) }, 100);
setTimeout( function() { f(4) }, 1100);
setTimeout( function() { f(5) }, 1500);

/**
 * возвращает обёртку, которая передаёт вызов f не чаще,
 * чем раз в ms миллисекунд
 * @param func
 * @param ms
 * @return {Function}
 */
function debounce(func, ms) {
    let lastTime = 0;

    return function (...args) {

        console.log(Date.now() - lastTime);

        if (Date.now() < lastTime + ms) {
            lastTime = Date.now();
            return func.apply(this, args);
        }
    }
}
function debounce2(f, ms) {

    let inCooldown = false;
    return function (...args) {

        if (inCooldown) return;

        inCooldown = true;

        setTimeout(() => inCooldown = false, ms);
        return f.apply(this, args);
    }
}