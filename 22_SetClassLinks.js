'use strict';

const isInternal = (href) => (!href || !(~href.indexOf('://') || ~href.indexOf('http://internal.com')));
let listLi = Array.from(document.getElementsByTagName('li'));
for (let li of listLi) {
    let link = li.firstChild;
    if  (!isInternal(link.getAttribute('href'))) {
        link.classList.add('external');
    }
}

