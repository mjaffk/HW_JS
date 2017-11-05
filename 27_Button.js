'use strict';

let a = document.createElement('a');
a.className = 'button';
a.appendChild(document.createTextNode('Нажми меня'));
a.href = '/';

a.style.MozBorderRadius = a.style.WebKitBorderRadius = a.style.borderRadius = '8px';
a.style.border = '2px groove green';
a.style.display = 'block';
a.style.height = '30px';
a.style.lineHeight = '30px';
a.style.width = '100px';
a.style.textDecoration = 'none';
a.style.textAlign = 'center';
a.style.color = 'red';
a.style.fontWeight = 'bold';

let div = document.body.children[0];
div.appendChild(a);

let button = document.createElement('button');
button.appendChild(document.createTextNode('Нажми меня'));

button.style.MozBorderRadius = button.style.WebKitBorderRadius = button.style.borderRadius = '8px';
button.style.border = '2px groove green';
button.style.display = 'block';
button.style.height = '40px';
button.style.lineHeight = '20px';
button.style.width =  '100px';
button.style.textDecoration = 'none';
button.style.textAlign = 'center';
button.style.color = 'red';
button.style.fontWeight = 'bold';
button.style.backgroundColor = 'white';

div.appendChild(button);