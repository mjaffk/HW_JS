'use strict';
/* By Ekaterina Khorina */

(function () {
    'use strict';
    
    // import
    const Clock = window.Clock;
    
    [
        {
            timezone : 'Moscow',
            offsetHours : 3
        },
        {
            timezone : 'London',
            offsetHours : 0
        }
    ].forEach( data => {
        
        let clock = new Clock(
            document.createElement( 'div' ),
            data
        );
        
        document.querySelector( '.js-app' ).append( clock.el );
        clock.render();
    } );
})();
