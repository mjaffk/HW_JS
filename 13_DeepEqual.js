'use strict';

/**
 * Сравнивает объекты по значению
 * @param {*} obj1
 * @param {*} obj2
 * @return {boolean}
 */
deepEqual = function dE (obj1, obj2) {
    // проверить на тип и то, что тип одинаковый
    // если не объект - обычное сравнение
    // если типы не совпадают - false
    // если совпадают:
    // перебор по каждому элементу и проверка с помощью этой же функции
    if (typeof obj1 === typeof obj2){
        outer:
        if (typeof obj1 === 'object'){
            if (obj1 !== null && obj2 !== null) {
                for (let key1 in obj1 ){
                    for (let key2 in obj2){
                        return key1 === key2 && dE(obj1[key1],obj2[key2])
                    }
                }
            }
        }
        return (obj1 === obj2);
    }
    return false;
}
deepEqual(obj1, obj2);

// console.log(obj1 === obj2);


