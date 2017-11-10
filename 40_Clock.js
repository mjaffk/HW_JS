(function () {
    'use strict';
    
    /* By Ekaterina Khorina */
    
    function Clock( elemClock, timeZoneStr ) {
        
        /**
         * Запуск часиков
         */
        this.start = function () {
            this.hourElem = elemClock.querySelector( '.hour' );
            this.minElem = elemClock.querySelector( '.min' );
            this.secElem = elemClock.querySelector( '.sec' );
            this.parseTimeZone();
            
            this.time = setInterval( () => this.update(), 1000 );
            this.update();
        };
        
        /**
         * Остановка часиков
         */
        this.stop = function () {
            clearInterval( this.time );
        };
    
        /**
         * Перерисовка часиков
         */
        this.update = function () {
            let date = new Date();
            let sec = date.getUTCSeconds();
            this.hourElem.textContent = date.getUTCHours();
            this.minElem.textContent = date.getUTCMinutes();
            this.secElem.textContent = sec < 10 ? '0' + sec : sec;
        };
        
        
        this.parseTimeZone = function () {
            this.timeZone = Date.parse('1970-01-01T00:00:00.000' + timeZoneStr);
            console.log(this.timeZone);
        }
    }
    
    const clock = new Clock( document.querySelector( '#clock' ), 'Z' );
    const clockMoscow = new Clock( document.querySelector( '#clock_moscow' ), '-07:00'  );
    const clockBerlin = new Clock( document.querySelector( '#clock_berlin' ), '+07:00' );
    
    
    clock.start();
    clockMoscow.start();
    clockBerlin.start();
})();
