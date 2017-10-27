'use strict';

/**
 * Сравнивает объекты по значению
 * @param {*} obj1 - переменная любого типа
 * @param {*} obj2 - переменная любого типа
 * @return {boolean} - результат проверки равенства переменных
 */
function deepEqual (obj1, obj2) {

    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    if (typeof obj1 !== 'object') {
        if (typeof obj1 === 'function') {
            return String(obj1) === String(obj2);
        }
        return obj1 === obj2;
    }
    if (obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    if (obj1.length !== 0 && obj2.length !== 0 && obj1.length === obj2.length) {
        let result = true;
        for (let key in obj1) {
            result = result && deepEqual(obj1[key],obj2[key]);
        }
        return result;
    }
    return obj1.length === obj2.length;
}

const obj1 = {
    s: null,
    'b': 1,
    a: 'k',
    f: undefined,
    go: {},
    name: 'Tim',
    isValid: function() {
        return !!this.name && !this.name.startsWith(' ');
    },
    codes: {
        "7": "Россия",
        "38": "Украина",
        "1": "США"
    }
};
const obj2 = {
    s: null,
    'b': 1,
    a: 'k',
    f: undefined,
    go: {},
    name: 'Tim',
    isValid: function() {
        return !!this.name && !this.name.startsWith('s ');
    },
    codes: {
        "7": "Россия",
        "38": "Украина",
        "1": "США"
    }
};

console.log('deepEqual ' + deepEqual(obj1, obj2));
alert(obj1.length);
// console.log('Equal'+ obj1 === obj2);
