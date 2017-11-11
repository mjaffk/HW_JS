'use strict';
/* By Ekaterina Khorina */

function CoffeeMachine(power) {
    this.waterAmount = 0;
    
    const WATER_HEAT_CAPACITY = 4200;
    const self = this;
    let timeoutId = null;
    
    /**
     * Внутренний метод
     * Рассчитывает время приготовления кофе
     */
    function getBoilTime() {
        return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }
    
    /**
     * Внутренний метод
     * Выполняется, когда кофе готов
     */
    function onReady() {
        alert( 'Кофе готово!' );
    }
    
    /**
     * Внешний метод
     * Запускает варку кофе
     */
    this.run = function() {
        timeoutId = setTimeout(onReady, getBoilTime());
    };
    
    /**
     * Внешний метод
     * Останавливает приготовление кофе
     */
    this.stop = () => {
        clearTimeout(timeoutId);
    };
}

let coffeeMachine = new CoffeeMachine(50000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
coffeeMachine.stop();
