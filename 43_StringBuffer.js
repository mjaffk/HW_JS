'use strict';

/* By Ekaterina Khorina */

/**
 * Создает строковый буфер, который аккумулирует внутри себя значения:
 * Добавить значение в буфер - makeBuffer(value).
 * Получить текущее содержимое - makeBuffer().
 * @return {Function}
 */
function makeBuffer() {
    let textBuffer = '';
    function buffer ( ...args ) {
        if (args.length === 0) {
            return textBuffer;
        }
        for ( let arg of args ) {
            textBuffer += arg;
        }
    }
    
    buffer.clear = function () {
        textBuffer = '';
    };
    
    return buffer;
}

let buffer = makeBuffer();

// добавить значения к буферу
buffer('Замыкания');
buffer(' Использовать');
buffer(' Нужно!');

alert( buffer() ); // Замыкания Использовать Нужно!

let buffer2 = makeBuffer();
buffer2(0);
buffer2(1);
buffer2(0);

alert( buffer() ); // '010'