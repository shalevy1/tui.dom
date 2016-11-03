/**
 * DOM event utility module.
 * @fileoverview Module for handle DOM events
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
import util from 'code-snippet';
import {getRect} from './domutil';

const EVENT_KEY = '_feEventKey';

/**
 * Get event collection for specific HTML element
 * @param {HTMLElement} element - HTML element
 * @param {string} [type] - event type
 * @returns {(object|Map)}
 */
function safeEvent(element, type) {
    let events = element[EVENT_KEY];

    if (!events) {
        events = element[EVENT_KEY] = {};
    }

    if (type) {
        let handlerMap = events[type];

        if (!handlerMap) {
            handlerMap = events[type] = new util.Map();
        }

        events = handlerMap;
    }

    return events;
}

/**
 * Memorize DOM event handler for unbinding
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} keyFn - handler function that user passed at on() use
 * @param {function} valueFn - handler function that wrapped by domevent for
 *  implementing some features
 */
function memorizeHandler(element, type, keyFn, valueFn) {
    var map = safeEvent(element, type),
        items = map.get(keyFn);

    if (items) {
        items.push(valueFn);
    } else {
        items = [valueFn];
        map.set(keyFn, items);
    }
}

/**
 * Forget memorized DOM event handlers
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} keyFn - handler function that user passed at on() use
 */
function forgetHandler(element, type, keyFn) {
    safeEvent(element, type).delete(keyFn);
}

/**
 * Bind DOM events
 * @param {HTMLElement} element - element to bind events
 * @param {string} type - events name
 * @param {function} handler - handler function or context for handler
 *  method
 * @param {object} [context] context - context for handler method.
 */
function bindEvent(element, type, handler, context) {
    /**
     * Event handler
     * @param {Event} e - event object
     */
    function eventHandler(e) {
        handler.call(context || element, e || window.event);
    }

    /**
     * Event handler for normalize mouseenter event
     * @param {MouseEvent} e - event object
     */
    function mouseEnterHandler(e) {
        e = e || window.event;

        if (checkMouse(element, e)) {
            eventHandler(e);
        }
    }

    if ('addEventListener' in element) {
        if (type === 'mouseenter' || type === 'mouseleave') {
            type = (type === 'mouseenter') ? 'mouseover' : 'mouseout';
            element.addEventListener(type, mouseEnterHandler);
            memorizeHandler(element, type, handler, mouseEnterHandler);
        } else {
            element.addEventListener(type, eventHandler);
            memorizeHandler(element, type, handler, eventHandler);
        }
    } else if ('attachEvent' in element) {
        element.attachEvent('on' + type, eventHandler);
        memorizeHandler(element, type, handler, eventHandler);
    }
}

/**
 * Unbind DOM events
 * @param {HTMLElement} element - element to unbind events
 * @param {string} type - events name
 * @param {function} handler - handler function or context for handler
 *  method
 */
function unbindEvent(element, type, handler) {
    const events = safeEvent(element, type);
    const items = events.get(handler);

    if (!items) {
        return;
    }

    forgetHandler(element, type, handler);

    util.forEach(items, func => {
        if ('removeEventListener' in element) {
            element.removeEventListener(type, func);
        } else if ('detachEvent' in element) {
            element.detachEvent('on' + type, func);
        }
    });
}


/**
 * Bind DOM events
 * @param {HTMLElement} element - element to bind events
 * @param {(string|object)} types - Space splitted events names or
 *  eventName:handler object
 * @param {(function|object)} handler - handler function or context for handler
 *  method
 * @param {object} [context] context - context for handler method.
 * @name on
 * @memberof tui.dom
 * @function
 * @api
 */
export function on(element, types, handler, context) {
    if (util.isString(types)) {
        util.forEach(types.split(/\s+/g), type => {
            bindEvent(element, type, handler, context);
        });

        return;
    }

    util.forEach(types, (func, type) => {
        bindEvent(element, type, func, handler);
    });
}

/**
 * Bind DOM event. this event will unbind after invokes.
 * @param {HTMLElement} element - HTMLElement to bind events.
 * @param {(string|object)} types - Space splitted events names or
 *  eventName:handler object.
 * @param {*} handler - handler function or context for handler method.
 * @param {*} [context] - context object for handler method.
 * @name once
 * @memberof tui.dom
 * @function
 * @api
 */
export function once(element, types, handler, context) {
    if (util.isObject(types)) {
        for (let [fn, type] of types) {
            once(element, type, fn, handler);
        }

        return;
    }

    const onceHandler = (...args) => {
        handler.apply(context || element, args);
        off(element, types, onceHandler, context);
    };

    on(element, types, onceHandler, context);
}

/**
 * Unbind DOM events
 * @param {HTMLElement} element - element to unbindbind events
 * @param {(string|object)} types - Space splitted events names or
 *  eventName:handler object
 * @param {(function|object)} handler - handler function or context for handler
 *  method
 * @name off
 * @memberof tui.dom
 * @function
 * @api
 */
export function off(element, types, handler) {
    if (util.isString(types)) {
        util.forEach(types.split(/\s+/g), type => {
            unbindEvent(element, type, handler);
        });

        return;
    }

    util.forEach(types, (func, type) => {
        unbindEvent(element, type, func);
    });
}

/**
 * Check mouse was leave event element with ignoreing child nodes
 * @param {HTMLElement} element - element to check
 * @param {MouseEvent} e - mouse event
 * @returns {boolean} whether mouse leave element?
 * @name checkMouse
 * @memberof tui.dom
 * @function
 * @api
 */
export function checkMouse(element, e) {
    var related = e.relatedTarget;

    if (!related) {
        return true;
    }

    try {
        while (related && (related !== element)) {
            related = related.parentNode;
        }
    } catch (err) {
        return false;
    }

    return (related !== element);
}

/**
 * Normalize mouse event's button attributes.
 *
 * Can detect which button is clicked by this method.
 *
 * Meaning of return numbers
 *
 * - 0: primary mouse button
 * - 1: wheel button or center button
 * - 2: secondary mouse button
 * @param {MouseEvent} mouseEvent - The mouse event object want to know.
 * @returns {number} - The value of meaning which button is clicked?
 * @name getMouseButton
 * @memberof tui.dom
 * @function
 * @api
 */
export function getMouseButton(mouseEvent) {
    const primary = '0,1,3,5,7';
    const secondary = '2,6';
    const wheel = '4';

    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
        return mouseEvent.button;
    }

    let button = String(mouseEvent.button);
    if (util.inArray(button, primary) > -1) {
        return 0;
    } else if (util.inArray(button, secondary) > -1) {
        return 2;
    } else if (util.inArray(button, wheel) > -1) {
        return 1;
    }

    return null;
}

/**
 * Get mouse position from mouse event
 *
 * If supplied relatveElement parameter then return relative position based on
 *  element
 * @param {(MouseEvent|object|number[])} position - mouse position object
 * @param {HTMLElement} relativeElement HTML element that calculate relative
 *  position
 * @returns {number[]} mouse position
 * @name getMousePosition
 * @memberof tui.dom
 * @function
 * @api
 */
export function getMousePosition(position, relativeElement) {
    let rect, clientX, clientY;

    if (util.isArray(position)) {
        clientX = position[0];
        clientY = position[1];
    } else {
        clientX = position.clientX;
        clientY = position.clientY;
    }

    if (!relativeElement) {
        return [clientX, clientY];
    }

    rect = getRect(relativeElement);

    return [
        clientX - rect.left - relativeElement.clientLeft,
        clientY - rect.top - relativeElement.clientTop
    ];
}