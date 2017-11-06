'use strict';

/**
 * жёстко фиксирует контекст для функции
 * @param func
 * @param context
 * @return {function(...[*]=): *}
 */
function bind(func, context) {
    return (...args) => func.apply(context, args);
}

