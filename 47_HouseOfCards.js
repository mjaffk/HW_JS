'use strict';
/* By Ekaterina Khorina */

'use strict';

let cards = [
    {
        pan : '5394 xxxx xxxx 7276',
        expiration_date : '10.06.2019'
    },
    {
        pan : '6011 xxxx xxxx 1443',
        expiration_date : '31.12.2017'
    },
    {
        pan : '3776 xxxx xxxx 2018',
        expiration_date : '01.05.2033'
    },
    {
        pan : '2466 xxxx xxxx 2254',
        expiration_date : '10.06.1976'
    }
];

/**
 * Преобразует дату из формата dd:mm:yyyy в ISO стандарт mm:dd:yyyy
 * @param {string} date
 * @return {string}
 */
function changeDateFormat( date ) {
    let dateArr = date.split( '.' );
    return [dateArr[1], dateArr[0], dateArr[2]].join('.');
}

/**
 * Генерация HTML списка карт
 * @param cards {Object[]}
 * @return {Element}
 */
function makeCardList( cards ) {
    
    const YEAR = 365 * 24 * 60 * 60 * 1000;
    const ul = document.createElement( 'ul' );
    const today = Date.now();
    const nextYear = today + YEAR;
    
    cards.map( ( {pan, expiration_date : expDate} ) => {
        
        let li = document.createElement( 'li' );
        li.textContent = `Карта ${pan} действительна до ${expDate}`;

        let expDateParsed = Date.parse(changeDateFormat( expDate ));

        if ( expDateParsed < today ) {
            li.classList.add('expired');
        } else if ( expDateParsed < nextYear ) {
            li.classList.add( 'almost-expired');
        }
    
        ul.append( li );
    });
    
    return ul;
}

document.body.append( makeCardList( cards ) );
