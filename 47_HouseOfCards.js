'use strict';
/* By Ekaterina Khorina */

'use strict';

let cards = [
    {
        pan: '5394 xxxx xxxx 7276',
        expiration_date: '10.06.2019'
    },
    {
        pan: '6011 xxxx xxxx 1443',
        expiration_date: '31.12.2017'
    },
    {
        pan: '3776 xxxx xxxx 2018',
        expiration_date: '01.05.2033'
    },
    {
        pan: '2466 xxxx xxxx 2254',
        expiration_date: '10.06.1976'
    }
];

/**
 * Генерация HTML списка карт
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeCardList (cards) {
    const ul = document.createElement('ul');
    
    for (let card of cards) {
        let li = document.createElement('li');
        li.innerText = card.pan;
        ul.append(li);
    }
    
    return ul;
}

document.body.append(makeCardList(cards));
