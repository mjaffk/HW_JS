'use strict';
/**
 Есть дерево, организованное в виде вложенных списков <ul>/<li>.
 Напишите код, который добавит каждому элементу списка <li> количество вложенных в него элементов.
 Узлы нижнего уровня, без детей – пропускайте.
 */

let listLi = document.getElementsByTagName('li');

for (let i = 0; i < listLi.length; i++) {

    let number = listLi[i].getElementsByTagName('li').length;

    if (number) {
        listLi[i].firstChild.data += ' [' +  number + ']';
    }
}