'use strict';
/*
Добавить класс в строку
В объекте есть свойство className, которое содержит список «классов» – слов,
разделенных пробелом.
Создайте функцию addClass(obj, cls), которая добавляет в список класс cls,
но только если его там еще нет:
P.S. Ваша функция не должна добавлять лишних пробелов.

Функция removeClass
Напишите функцию removeClass(obj, cls),
которая удаляет класс cls, если он есть
P.S. Дополнительное усложнение.
Функция должна корректно обрабатывать дублирование класса в строке:
Лишних пробелов после функции образовываться не должно.
*/


const obj = {
    className: 'open menu',

    /**
     * добавляет класс, если его нет
     * @param {string} cls - название класса
     */
    addClass: function (cls) {
        let classes = (this.className) ? this.className.split(' ') : [];
        for (let i of classes) {
            if (classes[i] === cls) return;
        }
        classes.push(cls);
        this.className = classes.join(' ');
    },

    /**
     * удаляет класс, если он есть
     * @param {string} cls - название класса
     */
    removeClass: function (cls) {
        if (!obj.className) return;

        let classes = obj.className.split(' ');

        for (let i = 0; i < classes.length; i++) {
            if (classes[i] === cls) {
                classes.splice(i, 1);
                i--;
            }
        }

        obj.className = classes.join(' ');

    }

};

obj.addClass('new'); // obj.className='open menu new'
obj.addClass('open'); // без изменений (класс уже существует)
obj.addClass('me'); // obj.className='open menu new me'

console.log(obj.className); // "open menu new me"

obj.removeClass('open'); // obj.className='menu'
obj.removeClass('blabla'); // без изменений (нет такого класса)

console.log(obj.className); // "open menu new me"
