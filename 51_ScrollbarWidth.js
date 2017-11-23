'use strict';

/* By Ekaterina Khorina */

function getScrollbarWidth() {
    
    let result = null;
    
    let elem = document.createElement('div');
    const WIDTH = 300;
    elem.style.width = WIDTH + 'px';
    elem.style.height = '30px';
    elem.style.visibility = 'hidden';
    elem.style.overflowY = 'scroll';
    
    document.body.append(elem);
    
    result = WIDTH - elem.clientWidth;
    
    elem.remove();
    
    return result;
}

console.log( getScrollbarWidth() );