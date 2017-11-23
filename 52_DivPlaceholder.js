'use strict';
/* By Ekaterina Khorina */

let div = document.getElementById( 'moving-div' );

let cloneDiv = document.createElement( 'div' );
let parent = div.parentNode;

cloneDiv.style.height = div.offsetHeight + 'px';
cloneDiv.style.width = div.offsetWidth + 'px';

let style = getComputedStyle(div, '');

cloneDiv.style.marginTop = style.marginTop;
cloneDiv.style.marginRight = style.marginRight;
cloneDiv.style.marginLeft = style.marginLeft;
cloneDiv.style.marginBottom = style.marginBottom;

cloneDiv.style.backgroundColor = 'green';

parent.insertBefore( cloneDiv, div );

div.style.position = 'absolute';
div.style.right = div.style.top = 0;

