'use strict';
/* By Ekaterina Khorina */

// Первое решение через let
function makeArmy() {
    
    let shooters = [];
    
    for (let i = 0; i < 10; i++) {
        let shooter = function() {
            console.log(i);
        };
        shooters.push(shooter);
    }
    
    return shooters;
}

let army = makeArmy();

army[0](); // стрелок выводит 10, а должен 0
army[5]();

/*
// Второе решение через замыкание
function makeArmy() {
    
    let shooters = [];
    
    (function makeShooters() {
        
        for ( var i = 0; i < 10; i++ ) {
            let shooter = makeShooter( i );
            shooters.push( shooter );
        }
        
        function makeShooter( i ) {
            return () => console.log( i )
        }
    })();
    
    return shooters;
}
*/

/*
// Третье решение через bind
function makeArmy() {
    
    let shooters = [];
    
    for ( var i = 0; i < 10; i++ ) {
        let shooter = function (i) {
            console.log( i );
        };
        shooters.push( shooter.bind(null, i) );
    }
    
    return shooters;
}
*/
/*

// Четвертое решение через свойство функции
function makeArmy() {
    
    let shooters = [];
    
    for (var i = 0; i < 10; i++) {
        let shooter = function me() {
            console.log(me.i);
        };
        shooter.i = i;
        shooters.push(shooter);
    }
    
    return shooters;
}
*/
