'use strict';

const friends = ['Tim', 'Olga', 'Sveta', 'Paul'];

function printFriends (sourceEl) {
    let ul = document.createElement('ul');

    friends.forEach((friendName) => {
        let li = document.createElement('li');
        li.textContent = friendName;
        ul.appendChild(li);
    });

    sourceEl.append(ul);
}


printFriends(document.querySelector('.js-frineds'));