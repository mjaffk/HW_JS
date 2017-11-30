'use strict';
/* By Ekaterina Khorina */

'use strict';

let menu = new Menu( {
  elem : document.createElement( 'div' ),
  data : [ {
    name : 'Меню',
    subs : [ {
      name : 'Учебник',
      link : 'https://learn.javascript.ru/tutorial',
      subs : [ {
        name : 'Введение',
        link : 'https://learn.javascript.ru/getting-started',
      }, {
        name : 'Основы JavaScript',
        link : 'https://learn.javascript.ru/first-steps',
      }, {
        name : 'Качество кода',
        link : 'https://learn.javascript.ru/writing-js',
      }, {
        name : 'Структуры данных',
        link : 'https://learn.javascript.ru/data-structures',
      }, {
        name : 'Замыкания, область видимости',
        link : 'https://learn.javascript.ru/functions-closures',
      }, {
        name : 'Методы объектов и контекст вызова',
        link : 'https://learn.javascript.ru/objects-more',
      }, {
        name : 'Некоторые другие возможности',
        link : 'https://learn.javascript.ru/js-misc',
      }, {
        name : 'ООП в функциональном стиле',
        link : 'https://learn.javascript.ru/oop',
      }, {
        name : 'ООП в прототипном стиле',
        link : 'https://learn.javascript.ru/prototypes',
      }, {
        name : 'Современные возможности ES-2015',
        link : 'https://learn.javascript.ru/es-modern',
      } ],
    }, {
      name : 'Курсы',
      link : 'https://learn.javascript.ru/courses',
    }, {
      name : 'Форум',
      link : 'https://javascript.ru/forum/',
    }, {
      name : 'ES5',
      link : 'https://es5.javascript.ru/',
    }, {
      name : 'Тесты знаний',
      link : 'https://learn.javascript.ru/quiz',
    }, {
      name : 'Скринкасты',
      subs : [ {
        name : 'Node.JS',
        link : 'https://learn.javascript.ru/screencast/nodejs',
      }, {
        name : 'Webpack',
        link : 'https://learn.javascript.ru/screencast/webpack',
      }, {
        name : 'Gulp 4',
        link : 'https://learn.javascript.ru/screencast/gulp',
      } ],
    },
    
    ],
  }, ],
} );

menu.render();
document.querySelector( '.js-app' ).append( menu.elem );