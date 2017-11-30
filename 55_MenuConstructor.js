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
    }
    
    Menu.prototype = {

        /**
         * Generate HTMLText and Events for menu
         */
        render() {
            this.menu = this._getMenu( this.data );
            this.elem.append( this.menu );
            this.elem.id = 'menu';
            this.menu.addEventListener( 'mouseover', () => this._submenuShowManager( event ), false );
        },
        
        /**
         * Generate HTMLText for menu
         * @param {Object} data
         * @param {number} level
         * @return {HTMLElement}
         * @private
         */
        _getMenu( data, level = 0 ) {
            let listMenuItems = document.createElement( 'ul' );
            
            if ( level > 0 ) {
                listMenuItems.hidden = true;
            }
            listMenuItems.dataset.level = level;
            
            listMenuItems.innerHTML = data.reduce( ( htmlMenu, { name, link = '#', subs = null } ) => {
                let ul = (!subs) ? '' : this._getMenu.call( this, subs, level + 1 ).outerHTML;
                htmlMenu += `<li><a href="${link}" target="_blank">${name}</a>${ul}</li>`;
                return htmlMenu;
            }, '' );
    
            return listMenuItems;
        },
        
        
        /**
         * Show _submenu by event
         * @param {Object} event
         * @private
         */
        _submenuShowManager( event ) {
            this._callElement = this._findElement( event.target, 'LI', 'UL' );
            if ( !this._callElement ) return;
            this._submenu = this._callElement.querySelector( 'ul' );
            // if ( !this._submenu ) return; // todo: understand: is it necessary?
            this._showElement( this._submenu );
            this._submenuHideManager( event );
        },
        
        /**
         * Find desiredElement upper target and deeper extremeElement on DOM
         * @param {Element} target - started element
         * @param {string} desiredElement - tag name of desired element
         * @param {string} extremeElement - tag name of extreme element
         * @return {Element|null} -  desired element or null, if there is no such element
         * @private
         */
        _findElement( target, desiredElement, extremeElement = 'BODY' ) {
            
            while ( target.tagName !== desiredElement.toUpperCase() ) {
                target = target.parentElement;
                if ( target.tagName === extremeElement.toUpperCase() ) return null;
            }
            return target;
        },
    
        /**
         * @param {Element} elem
         * @private
         */
        _showElement( elem ) {
            elem.hidden = false;
        },
        
        /**
         * Make events and timeouts that hide _submenu when it isn't required
         * @param {Object} event_move
         * @private
         */
        _submenuHideManager( event_move ) {
            
            const DELAY = 100;
            
            // this._coolMenuShow = this._throttle( this._coolMenuShow, DELAY );
            this._calculateCoordinatesSubmenu( event_move );
            this._moveListener = event_move.currentTarget;
            this._moveListener.addEventListener( 'mousemove', this._coolMenuShow( event ), false );
        },
        
        /**
         * Analise mouse move
         * @param {Object} event
         * @private
         */
        _coolMenuShow( event ) {
            
            const HIDE_TIMEOUT = 1000;
    
            if ( !this._submenu ) return;
            
            
            let currentCoord = {
                X : event.clientX,
                Y : event.clientY,
            };
            
            let offTheRails = !this._isInTriangle( currentCoord, this._coordinates ) &&
                !this._isInElement( currentCoord, this._callElement ) &&
                !this._isInElement( currentCoord, this._submenu );
            
            
            if ( offTheRails ) {
                this._hideSubmenuManager( this._submenu );
                return;
            }
            
            clearTimeout( this._timeoutId );
            
            this._coordinates.callCoord.X = currentCoord.X;
            this._coordinates.callCoord.Y = currentCoord.Y;
            
            if ( this._isInElement( currentCoord, this._callElement ) ) {
                this._submenu.addEventListener( 'mouseout', this._hideSubmenuManager.bind( this , this._submenu), false );
            }
            
            // this._timeoutId = setTimeout( this._hideSubmenuManager.bind( this, this._submenu ), HIDE_TIMEOUT );
        },
        
        
        /**
         * Check is point in the element
         * @param currentCoord
         * @param elem
         * @return {boolean}
         */
        _isInElement( currentCoord, elem ) {
            
            let elemCoord = elem.getBoundingClientRect();
            let verticalCondition = currentCoord.Y >= elemCoord.top && currentCoord.Y <= elemCoord.bottom;
            let horizontalCondition = currentCoord.X >= elemCoord.left && currentCoord.X <= elemCoord.right;
            return verticalCondition && horizontalCondition;
        },
        
        /**
         * Check is point in the triangle
         * @param {Object} currentCoord
         * @param {Object} submenuLeftCoord
         * @param {Object} callCoord
         * @return {boolean}
         */
        _isInTriangle( currentCoord, { submenuLeftCoord, callCoord } ) {
            
            let ratios = {
                bottomLine : this._calculateRatios( callCoord.X, callCoord.Y, submenuLeftCoord.leftBottom.X,
                    submenuLeftCoord.leftBottom.Y ),
                topLine : this._calculateRatios( callCoord.X, callCoord.Y, submenuLeftCoord.leftTop.X,
                    submenuLeftCoord.leftTop.Y ),
            };
            
            let inLineSegment = (currentCoord.X >= callCoord.X) && (currentCoord <= submenuLeftCoord.leftTop.X);
            let aboveBottomLine = (ratios.bottomLine.a * currentCoord.X + ratios.bottomLine.b <= currentCoord.Y);
            let belowTopLine = (ratios.topLine.b * currentCoord.X + ratios.topLine.b >= currentCoord.Y);
            
            return inLineSegment && aboveBottomLine && belowTopLine;
        },
        
        /**
         * calculate math ratios a and b for line (ax + b = y)
         * (x0, y0) and (x1, y1) - coordinates of two points in line
         * @param x0
         * @param y0
         * @param x1
         * @param y1
         * @return {{a: number, b: number}}
         */
        _calculateRatios( x0, y0, x1, y1 ) {
            return {
                a : (y1 - y0) / (x1 - x0),
                b : (y0 * x1 - y1 * x0) / (x1 - x0),
            };
        },
        
        /**
         * Hide submenu by event
         */
        _hideSubmenuManager( elem = this._submenu) {
            if ( this._timeoutId ) clearTimeout( this._timeoutId );
            elem.hidden = true;
            this._removeListeners(elem);
        },
        
        /**
         * remove undesired listeners from _submenu
         */
        _removeListeners(elem) {
            try {
                elem.removeEventListener( 'mouseout', this._hideSubmenuManager.bind( this, this._submenu ), false );
                this._moveListener.removeEventListener( 'mousemove', this._coolMenuShow.bind( this, event ), false );
            }
            catch ( error ) {
                console.log( error.name );
            }
        },
        
        /**
         * @param event
         * @return {{submenuLeftCoord: {leftTop: {X: Number, Y: Number}, leftBottom: {X: Number, Y: Number}},
         *     callCoord: {X: (Number|number), Y: (number|Number)}}}
         * @private
         */
        _calculateCoordinatesSubmenu( event ) {
            let submenuClientRect = this._submenu.getBoundingClientRect();
            this._coordinates = {
                submenuLeftCoord : {
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
        },
        
        
        /**
         * wrapper, make delay between function colling
         * @param {Function} func
         * @param {number} ms - how often func should work
         * @return {Function}
         */
        _throttle( func, ms ) {
            
            let isThrottled = false,
                savedArgs = null,
                savedThis = null;
            
            return function wrapper( ...args ) {
                
                if ( isThrottled ) {
                    savedArgs = args;
                    savedThis = this;
                    return;
                }
                
                isThrottled = true;
                
                setTimeout( () => {
                    isThrottled = false;
                    
                    if ( savedArgs ) {
                        
                        wrapper.apply( savedThis, savedArgs );
                        
                        savedArgs = null;
                        savedThis = null;
                    }
                }, ms );
                
                return func.apply( this, args );
            };
        },
        
    };
    
    
    window.Menu = Menu;
})();