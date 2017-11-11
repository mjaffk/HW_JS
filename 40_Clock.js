(function () {
    'use strict';
    /* By Ekaterina Khorina */
    
    const HOUR = 60 * 60 * 1000;
    const MINUTE = 60 * 1000;
    
    
    function Clock( el, data = {} ) {
        this.el = el;
        
        this.data = Object.assign( {
            offsetHours : 0,
            timezone : 'GMT',
            hh : '00',
            mm : '00',
            ss : '00'
        }, data );
        
        this.isActive = false;
        
        /**
         * Формирование HTML компоненты
         */
        this.render = function () {
            this.el.innerHTML = `
        <div class="clock">
          ${this.data.timezone}:
          <span class="clock__hour">${this.data.hh}</span>:<span class="clock__min">${this.data.mm}</span>:\
          <span class="clock__sec">${this.data.ss}</span>
        
          <button class="clock__switch" >${(this.isActive) ? 'Stop!' : 'Start!'}</button>
        </div>
      `;
    
            this.switchBtnEl = this.el.querySelector( '.clock__switch' );
            
            this.switchBtnEl.onclick = () => {
                
                if (this.isActive) {
                    this.stop();
                    this.switchBtnEl.textContent = 'Start!';
                    this.isActive = false;
                } else {
                    this.start();
                    this.isActive = true;
                    this.switchBtnEl.textContent = 'Stop!';
                }
            };
        };
        
        /**
         * Запуск часиков
         */
        this.start = function () {
            this.queryMiliseconds = this.data.offsetHours ? this.data.offsetHours * HOUR : 0;
            this.localOffsetMiliseconds = new Date().getTimezoneOffset() * MINUTE;
            
            this.idInterval = setInterval( () => {
                this.update()
            }, 1000 );
            
            this.update();
        };
        
        /**
         * Остановка часиков
         */
        this.stop = function () {
            clearInterval( this.idInterval );
        };
            
            this.update = function () {
                let date = new Date( Date.now() + this.localOffsetMiliseconds + this.queryMiliseconds );
                const seconds = date.getSeconds();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                this.data.hh = hours < 10 ? '0' + hours : hours;
                this.data.mm = minutes < 10 ? '0' + minutes : minutes;
                this.data.ss = seconds < 10 ? '0' + seconds : seconds;
                
                this.render();
            }
    }
    
    
    // export
    window.Clock = Clock;
})();