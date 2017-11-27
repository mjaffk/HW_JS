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
    
    
                let coolMenuShowThrottled = throttle( coolMenuShow, DELAY );
    
                let coordinates = calculateCoordinates( submenu, event );
                let callElement = findElement( event.target, 'LI', 'UL', 'LI' );
                callElement.addEventListener( 'mousemove',
                    coolMenuShowThrottled.bind( this, event, submenu, coordinates, callElement ), false );
    
                submenu.addEventListener( 'mouseout', hideSubmenu.bind( this, submenu ), false );
    
            }
            /**
             * Check mouse move to submenu
             * @param {HTMLElement} submenu
             * @param {Object} event
             * @param {Object} coordinates
             * @param {HTMLElement} callElement
             */
            function coolMenuShow( event, submenu,coordinates, callElement ) {
        
                clearTimeout( timeoutId );
        
                let currentCoord = {
                    X : event.clientX,
                    Y : event.clientY,
                };
        
                if (!isInTriangle( currentCoord, coordinates ) && !isInCallElement( currentCoord, callElement)) {
                    hideSubmenu( submenu );
                    return;
                }
        
        
                coordinates.callCoord.X = currentCoord.X;
                coordinates.callCoord.Y = currentCoord.Y;
        
        
                timeoutId = setTimeout( hideSubmenu.bind( this, submenu ), 400 );
        
                /**
                 * Check is point in the element
                 * @param currentCoord
                 * @param elem
                 * @return {boolean}
                 */
                function isInCallElement( currentCoord, elem ) {
            
                    let elemCoord = elem.getBoundingClientRect();
            
                    let verticalCondition = currentCoord.Y >= elemCoord.top && currentCoord.Y <= elemCoord.bottom;
            
                    let horizontalCondition = currentCoord.X >= elemCoord.left && currentCoord.X <= elemCoord.right;
            
                    return verticalCondition && horizontalCondition;
                }
        
                /**
                 * Check is point in the triangle
                 * @param currentCoord
                 * @param submenuCoord
                 * @param callCoord
                 * @return {boolean}
                 */
                function isInTriangle( currentCoord, { submenuCoord, callCoord } ) {
            
                    let ratios = {
                        bottomLine : calculateRatios( callCoord.X, callCoord.Y, submenuCoord.leftBottom.X,
                            submenuCoord.leftBottom.Y ),
                
                        topLine : calculateRatios( callCoord.X, callCoord.Y, submenuCoord.leftTop.X,
                            submenuCoord.leftTop.Y ),
                    };
            
                    let inLineSegment = (currentCoord.X >=  callCoord.X) && (currentCoord >= submenuCoord.leftTop.X);
            
                    let aboveBottomLine = (ratios.bottomLine.a * currentCoord.X  + ratios.bottomLine.b <= currentCoord.Y);
            
                    let belowTopLine = (ratios.topLine.b * currentCoord.X + ratios.topLine.b >= currentCoord.Y);
            
                    return inLineSegment && aboveBottomLine && belowTopLine;
                }
        
                /**
                 * calculate math ratios a and b for line (ax + b = y)
                 * (x0, y0) and (x1, y1) - coordinates
                 * @param x0
                 * @param y0
                 * @param x1
                 * @param y1
                 * @return {{a: number, b: number}}
                 */
                function calculateRatios( x0, y0, x1, y1 ) {
                    return {
                        a : (y1 - y0) / (x1 - x0),
                        b : (y0 * x1 - y1 * x0) / (x1 - x0),
                    };
                }
        
            }
    
            /**
             *
             * @param {HTMLElement}submenu
             * @param {Object} event
             * @return {Object}
             */
            function calculateCoordinates( submenu, event ) {
                
                let submenuClientRect = submenu.getBoundingClientRect();
                
                return {
                    submenuCoord : {
                        leftTop : {
                            X : submenuClientRect.left,
                            Y : submenuClientRect.top,
                        },
                        leftBottom : {
                            X : submenuClientRect.left,
                            Y : submenuClientRect.bottom,
                        },
                    },
                    
                    callCoord : {
                        X : event.clientX,
                        Y : event.clientY,
                    },
                };
            }
            
            
            /**
             * Hide submenu by event
             * @param {HTMLElement} submenu
             */
            function hideSubmenu( submenu ) {
                if ( timeoutId ) clearTimeout( timeoutId );
                submenu.hidden = true;
                // removeListeners( submenu );
            }
            
            // /**
            //  * remove undesired listeners from submenu
            //  * @param {HTMLElement} submenu
            //  */
            // function removeListeners( submenu ) {
            //     submenu.removeEventListener( 'mouseout', hideSubmenu.bind( this, submenu ), false );
            //     submenu.removeEventListener( 'mousemove',
            //         coolMenuShowThrottled.bind( this, event, submenu, coordinates, callElement ), false );
            // }
            
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