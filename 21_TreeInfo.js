'use strict';
/**
 Есть дерево из тегов <ul>/<li>.
 Напишите код, который для каждого элемента <li> выведет:
 Текст непосредственно в нём (без подразделов).
 Количество вложенных в него элементов <li> – всех, с учётом вложенных.
 */

let listLi = document.getElementsByTagName('li');

for (let i = 0; i < listLi.length; i++) {
    let text = listLi[i].firstChild.textContent.trim();
    let number = listLi[i].getElementsByTagName('li').length;
    (number) ? console.log(text + ' : ' +  number) : console.log(text);
}