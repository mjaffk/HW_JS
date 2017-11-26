/* By Ekaterina Khorina */
(function () {
    'use strict';
    
    /**
     * Make simple menu
     * @param elem
     * @param data
     * @constructor
     */
    function Menu( { elem, data = [] } ) {
        this.elem = elem;
        this.data = data;
        
        /**
         * Generate HTMLText and Events for menu
         */
        Menu.prototype.render = function () {
            
            let timeoutId = null;
            
            /**
             * Generate HTMLText for menu
             * @param {Object} data
             * @param {number} level
             * @return {HTMLElement}
             */
            let getMenu = function gm( data, level = 0 ) {
                
                let listMenuItems = document.createElement( 'ul' );
                
                if ( level > 0 ) {
                    listMenuItems.hidden = true;
                }
                
                listMenuItems.dataset.level = level;
                
                listMenuItems.addEventListener( 'mouseover', () => submenuShowManager( event ), false );
                
                listMenuItems.innerHTML = data.reduce( ( htmlMenu, { name, link = '#', subs = null } ) => {
                    
                    let ul = (!subs) ? '' : gm( subs, level + 1 ).outerHTML;
                    
                    htmlMenu += `<li><a href="${link}" target="_blank">${name}</a>${ul}</li>`;
                    
                    return htmlMenu;
                    
                }, '' );
                
                return listMenuItems;
            };
            
            this.elem.append( getMenu( data ) );
            this.elem.id = 'menu';
            
            /**
             * Show submenu by event
             * @param {Object} event
             */
            function submenuShowManager( event ) {
                
                let submenu = findElement( event.target, 'LI', 'UL', 'UL' );
                
                if ( !submenu ) return;
                
                submenu.hidden = false;
                
                submenuHideManager( submenu, event );
            }
            
            /**
             * Find desiredElement in desiredParentElement deeper extremeElement from target
             * @param {HTMLElement} target
             * @param {string} desiredParentElement - tag name of element that should have desired element
             * @param {string} extremeElement - tag name of extreme element
             * @param {string} desiredElement - tag name of desired element
             * @return {Element}
             */
            function findElement( target, desiredParentElement, extremeElement = 'DIV', desiredElement ) {
                
                while ( target.tagName !== desiredParentElement.toUpperCase() ) {
                    target = target.parentElement;
                    
                    if ( target.tagName === extremeElement.toUpperCase() ) break;
                }
                
                return target.querySelector( desiredElement.toLowerCase() );
            }
            
            /**
             * Make events and timeouts that hide submenu when it isn't required
             * @param {HTMLElement} submenu
             * @param {Object} event
             */
            function submenuHideManager( submenu, event ) {
                
                const DELAY = 100;
    
                let coolMenuShow = throttle( coolMenuShow, DELAY );
                let coordinates = calculateCoordinates ( submenu, event );
                let callElement = findElement(event.target, 'LI', 'UL', 'LI');
                
                submenu.addEventListener( 'mousemove', coolMenuShow.bind( this, event, submenu, coordinates, callElement ), false );
                
                
                submenu.addEventListener( 'mouseout', hideSubmenu.bind( null, submenu ), false );
            }
    
            /**
             *
             * @param {HTMLElement} submenu
             * @param {Object} event
             * @return {Object}
             */
            function calculateCoordinates ( submenu, event ) {
                
                let submenuClientRect = submenu.getBoundingClientRect();
                
                let submenuCoordinates = {
                    leftTop : {
                        X : submenuClientRect.left,
                        Y : submenuClientRect.top
                    },
                    leftBottom : {
                        X : submenuClientRect.left,
                        Y : submenuClientRect.bottom
                    },
                };
                
                let callCoordinates = {
                    X : event.clientX,
                    Y : event.clientY
                };
                return {submenuCoordinates, callCoordinates};
            }
            
            /**
             * Check mouse move to submenu
             * @param {HTMLElement} submenu
             * @param {Object} event
             * @param {Object} coordinates
             * @param {HTMLElement} callElement
             */
            function coolMenuShow( event, submenu, coordinates, callElement ) {
                timeoutId = setTimeout( () => submenu.hidden = true, 1000 );
            }

            
            /**
             * Hide submenu by event
             * @param {HTMLElement} submenu
             */
            function hideSubmenu( submenu ) {
                if ( timeoutId ) clearTimeout( timeoutId );
                submenu.hidden = true;
                removeListeners( submenu );
            }
            
            /**
             * remove undesired listeners from submenu
             * @param {HTMLElement} submenu
             */
            function removeListeners( submenu ) {
                submenu.removeEventListener( 'mouseout', hideSubmenu.bind( null, submenu ), false);
                submenu.removeEventListener( 'mousemove', coolMenuShow.bind( this, event, submenu, coordinates ), false );
            }
            
            /**
             * wrapper, make delay between function colling
             * @param {Function} func
             * @param {number} ms - how often func should work
             * @return {Function}
             */
            function throttle( func, ms ) {
                
                let inCooldown = false;
                let lastTimeout = null;
                let lastTime = null;
                
                return function fTimer( ...args ) {
                    
                    clearTimeout( lastTimeout );
                    
                    if ( inCooldown ) {
                        
                        return lastTimeout = setTimeout( function () {
                            return fTimer.apply( this, args );
                        }, ms - (Date.now() - lastTime) );
                    }
                    
                    inCooldown = true;
                    
                    setTimeout( () => inCooldown = false, ms );
                    
                    lastTime = Date.now();
                    
                    return func.apply( this, args );
                };
            }
        };
        
    }
    
    window.Menu = Menu;
})();