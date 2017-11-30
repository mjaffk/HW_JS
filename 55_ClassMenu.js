/* By Ekaterina Khorina */
(function () {
    'use strict';
    
    class Menu {
        constructor( { elem = document.body, data = [] } ) {
            this.elem = elem;
            this.data = data;
            this.shownSubmenu = [];
        }
        
        /**
         * Generate HTMLElement and Event for menu
         */
        render() {
            if ( this.data.length === 0 ) return;
            let htmlMenu = this._getHTML( this.data );
            this.elem.append( htmlMenu );
            this.elem.classList.add( 'menu' );
            this.elem.addEventListener( 'mouseover', () => this._showSubmenuManager( event ) );
            this.elem.addEventListener('mouseout', () => this._hideAll(event));
        }
        
        /**
         * Generate HTMLText for menu
         * @param {Array} list
         * @param {number} level
         * @return {Element}
         * @private
         */
        _getHTML( list, level = 0 ) {
            let itemList = document.createElement( 'ul' );
            
            itemList.dataset.level = level;
            if ( level > 0 ) itemList.hidden = true;
            
            itemList.innerHTML = list.reduce( ( html, { name, link = '#', subs } ) => {
                let htmlSubs = (!subs) ? ' ' : this._getHTML( subs, level + 1 ).outerHTML;
                html += `<li><a href="${link}" target="_blank">${name}</a>${htmlSubs}</li>`;
                return html;
            }, '' );
            
            return itemList;
        }
        
        /**
         * Organise showing submenu
         * @param {Object} event
         * @private
         */
        _showSubmenuManager( event ) {
            let callElement = Menu._findSubmenuParent( event.target );
            if ( !callElement ) return;
            
            let submenu = callElement.querySelector( 'ul' );
            if ( !submenu ) return;
            
            this.shownSubmenu.push( {
                parent : callElement,
                element : submenu,
                level : submenu.dataset.level,
            } );
            
            Menu._showElement( submenu );
        }
        
        /**
         * Find element li
         * @param {Element} target
         * @return {Element/null} if there isn't element li deeper ul return null
         * @private
         */
        static _findSubmenuParent( target ) {
            while ( target.tagName !== 'LI' ) {
                target = target.parentElement;
                if ( target.tagName === 'UL' ) return null;
            }
            return target;
        }
        
        /**
         * Show hidden element
         * @param {Element} element
         * @private
         */
        static _showElement( element ) {
            element.hidden = false;
        }
    
        /**
         * Hide all shown submenu
         * @private
         */
        _hideAll() {
            this.shownSubmenu.forEach( ( submenu ) => {
                submenu.element.hidden = true;
            } );
            this.shownSubmenu = [];
        }
    }
    
    window.Menu = Menu;
})();