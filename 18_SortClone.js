/*
Скопировать и отсортировать массив
Есть массив строк arr.
Создайте массив arrSorted – из тех же элементов, но отсортированный.
Исходный массив не должен меняться.
Постарайтесь сделать код как можно короче.
 */
'use strict';

let arr = ["HTML", "JavaScript", "CSS"];

// let arrSorted = getSortClone(arr);
let arrSorted = arr.slice().sort();
alert( arrSorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (без изменений)

// function getSortClone(arr) {
//     let newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         newArr[i] = arr[i]
//     }
//     return newArr.sort();
// }
