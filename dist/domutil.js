/*! TOAST UI DOM Library 2.0.2 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _codeSnippet = __webpack_require__(1);

	var _codeSnippet2 = _interopRequireDefault(_codeSnippet);

	var _domutil = __webpack_require__(2);

	var domutil = _interopRequireWildcard(_domutil);

	var _domevent = __webpack_require__(3);

	var domevent = _interopRequireWildcard(_domevent);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	/** @namespace tui */
	/** @namespace tui.dom */
	_codeSnippet2['default'].defineNamespace('tui.dom', _codeSnippet2['default'].extend({}, domutil, domevent));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = tui.util;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                                               * @fileoverview DOM manipulation utility module
	                                                                                                                                                                                                                                                                               * @author NHN Ent. FE Development team <dl_javascript@nhnent.com>
	                                                                                                                                                                                                                                                                               */


	exports.css = css;
	exports.getClass = getClass;
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.getRect = getRect;
	exports.setData = setData;
	exports.getData = getData;
	exports.removeData = removeData;
	exports.removeElement = removeElement;
	exports.setBound = setBound;
	exports.matches = matches;
	exports.closest = closest;
	exports.find = find;
	exports.findAll = findAll;
	exports.stopPropagation = stopPropagation;
	exports.preventDefault = preventDefault;
	exports.disableTextSelection = disableTextSelection;
	exports.enableTextSelection = enableTextSelection;
	exports.textContent = textContent;
	exports.insertAfter = insertAfter;

	var _codeSnippet = __webpack_require__(1);

	var _codeSnippet2 = _interopRequireDefault(_codeSnippet);

	var _domevent = __webpack_require__(3);

	var domevent = _interopRequireWildcard(_domevent);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var aps = Array.prototype.slice;

	/**
	 * Setting element style
	 * @param {(HTMLElement|SVGElement)} element - element to setting style
	 * @param {(string|object)} key - style prop name or {prop: value} pair object
	 * @param {string} [value] - style value
	 * @name css
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function css(element, key, value) {
	    var style = element.style;

	    if (_codeSnippet2['default'].isString(key)) {
	        style[key] = value;

	        return;
	    }

	    _codeSnippet2['default'].forEach(key, function (v, k) {
	        style[k] = v;
	    });
	}

	/**
	 * Get HTML element's design classes.
	 * @param {(HTMLElement|SVGElement)} element target element
	 * @returns {string} element css class name
	 * @name getClass
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function getClass(element) {
	    if (!element || !element.className) {
	        return '';
	    }

	    if (_codeSnippet2['default'].isUndefined(element.className.baseVal)) {
	        return element.className;
	    }

	    return element.className.baseVal;
	}

	/**
	 * Check element has specific css class
	 * @param {(HTMLElement|SVGElement)} element - target element
	 * @param {string} cssClass - css class
	 * @returns {boolean}
	 * @name hasClass
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function hasClass(element, cssClass) {
	    if (element.classList) {
	        return element.classList.contains(cssClass);
	    }

	    var origin = getClass(element).split(/\s+/);

	    return _codeSnippet2['default'].inArray(cssClass, origin) > -1;
	}

	/**
	 * Add css class to element
	 * @param {(HTMLElement|SVGElement)} element - target element
	 * @param {...string} cssClass - css classes to add
	 * @name addClass
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function addClass(element) {
	    // eslint-disable-line
	    var cssClass = aps.call(arguments, 1);

	    if (element.classList) {
	        var _ret = function () {
	            var classList = element.classList;
	            _codeSnippet2['default'].forEach(cssClass, function (name) {
	                classList.add(name);
	            });
	            return {
	                v: void 0
	            };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }

	    var origin = getClass(element);

	    if (origin) {
	        cssClass = [].concat(origin.split(/\s+/), cssClass);
	    }

	    var newClass = [];

	    _codeSnippet2['default'].forEach(cssClass, function (cls) {
	        if (_codeSnippet2['default'].inArray(cls, newClass) < 0) {
	            newClass.push(cls);
	        }
	    });

	    newClass = newClass.join(' ');

	    if (_codeSnippet2['default'].isUndefined(element.className.baseVal)) {
	        element.className = newClass;
	        return;
	    }

	    element.className.baseVal = newClass;
	}

	/**
	 * Remove css class from element
	 * @param {(HTMLElement|SVGElement)} element - target element
	 * @param {...string} cssClass - css classes to remove
	 * @name removeClass
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function removeClass(element) {
	    // eslint-disable-line
	    var cssClass = aps.call(arguments, 1);

	    if (element.classList) {
	        var _ret2 = function () {
	            var classList = element.classList;
	            _codeSnippet2['default'].forEach(cssClass, function (name) {
	                classList.remove(name);
	            });

	            return {
	                v: void 0
	            };
	        }();

	        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }

	    var origin = getClass(element).split(/\s+/);
	    var classes = _codeSnippet2['default'].filter(origin, function (name) {
	        return _codeSnippet2['default'].inArray(name, cssClass) < 0;
	    });
	    var newClass = classes.join(' ');

	    if (_codeSnippet2['default'].isUndefined(element.className.baseVal)) {
	        element.className = newClass;

	        return;
	    }

	    element.className.baseVal = newClass;
	}

	/**
	 * getBoundingClientRect polyfill
	 * @param {HTMLElement} element - target element
	 * @returns {object} rect object
	 * @name getRect
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function getRect(element) {
	    var _element$getBoundingC = element.getBoundingClientRect(),
	        top = _element$getBoundingC.top,
	        right = _element$getBoundingC.right,
	        bottom = _element$getBoundingC.bottom,
	        left = _element$getBoundingC.left,
	        width = _element$getBoundingC.width,
	        height = _element$getBoundingC.height;

	    if (_codeSnippet2['default'].isUndefined(width) || _codeSnippet2['default'].isUndefined(height)) {
	        width = element.offsetWidth;
	        height = element.offsetHeight;
	    }

	    return { top: top, right: right, bottom: bottom, left: left, width: width, height: height };
	}

	/**
	 * Convert uppercase letter to hyphen lowercase character
	 * @param {string} match - match from String.prototype.replace method
	 * @returns {string}
	 * @name upperToHyphenLower
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function upperToHyphenLower(match) {
	    return '-' + match.toLowerCase();
	}

	/**
	 * Set data attribute to target element
	 * @param {HTMLElement} element - element to set data attribute
	 * @param {string} key - key
	 * @param {string} value - value
	 * @name setData
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function setData(element, key, value) {
	    if (element.dataset) {
	        element.dataset[key] = value;

	        return;
	    }

	    key = key.replace(/([A-Z])/g, upperToHyphenLower);

	    element.setAttribute('data-' + key, value);
	}

	/**
	 * Get data value from data-attribute
	 * @param {HTMLElement} element - target element
	 * @param {string} key - key
	 * @returns {string} value
	 * @name getData
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function getData(element, key) {
	    if (element.dataset) {
	        return element.dataset[key];
	    }

	    key = key.replace(/([A-Z])/g, upperToHyphenLower);

	    return element.getAttribute('data-' + key);
	}

	/**
	 * Remove data property
	 * @param {HTMLElement} element - target element
	 * @param {string} key - key
	 * @name removeData
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function removeData(element, key) {
	    if (element.dataset) {
	        delete element.dataset[key];

	        return;
	    }

	    key = key.replace(/([A-Z])/g, upperToHyphenLower);

	    element.removeAttribute('data-' + key);
	}

	/**
	 * Remove element from parent node.
	 * @param {HTMLElement} element - element to remove.
	 * @name removeElement
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function removeElement(element) {
	    if (element && element.parentNode) {
	        element.parentNode.removeChild(element);
	    }
	}

	/**
	 * Set element bound
	 * @param {HTMLElement} element - element to change bound
	 * @param {object} bound - bound object
	 * @param {number} [bound.top] - top pixel
	 * @param {number} [bound.right] - right pixel
	 * @param {number} [bound.bottom] - bottom pixel
	 * @param {number} [bound.left] - left pixel
	 * @param {number} [bound.width] - width pixel
	 * @param {number} [bound.height] - height pixel
	 * @name setBound
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function setBound(element) {
	    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	        top = _ref.top,
	        right = _ref.right,
	        bottom = _ref.bottom,
	        left = _ref.left,
	        width = _ref.width,
	        height = _ref.height;

	    var args = { top: top, right: right, bottom: bottom, left: left, width: width, height: height };
	    var newBound = {};

	    _codeSnippet2['default'].forEach(args, function (value, prop) {
	        if (_codeSnippet2['default'].isExisty(value)) {
	            newBound[prop] = _codeSnippet2['default'].isNumber(value) ? value + 'px' : value;
	        }
	    });

	    _codeSnippet2['default'].extend(element.style, newBound);
	}

	var elProto = Element.prototype;
	var matchSelector = elProto.matches || elProto.webkitMatchesSelector || elProto.mozMatchesSelector || elProto.msMatchesSelector || function (selector) {
	    var doc = this.document || this.ownerDocument;
	    return _codeSnippet2['default'].inArray(this, findAll(doc, selector)) > -1;
	};

	/**
	 * Check element match selector
	 * @param {HTMLElement} element - element to check
	 * @param {string} selector - selector to check
	 * @returns {boolean} is selector matched to element?
	 * @name matches
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function matches(element, selector) {
	    return matchSelector.call(element, selector);
	}

	/**
	 * Find parent element recursively
	 * @param {HTMLElement} element - base element to start find
	 * @param {string} selector - selector string for find
	 * @returns {HTMLElement} - element finded or null
	 * @name closest
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function closest(element, selector) {
	    var parent = element.parentNode;

	    if (matches(element, selector)) {
	        return element;
	    }

	    while (parent && parent !== document) {
	        if (matches(parent, selector)) {
	            return parent;
	        }

	        parent = parent.parentNode;
	    }

	    return null;
	}

	/**
	 * Find single element
	 * @param {(HTMLElement|string)} [element=document] - base element to find
	 * @param {string} [selector] - css selector
	 * @returns {HTMLElement}
	 * @name find
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function find(element, selector) {
	    if (_codeSnippet2['default'].isString(element)) {
	        return document.querySelector(element);
	    }

	    return element.querySelector(selector);
	}

	/**
	 * Find multiple element
	 * @param {(HTMLElement|string)} [element=document] - base element to
	 *  find
	 * @param {string} [selector] - css selector
	 * @returns {HTMLElement[]}
	 * @name findAll
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function findAll(element, selector) {
	    if (_codeSnippet2['default'].isString(element)) {
	        return _codeSnippet2['default'].toArray(document.querySelectorAll(element));
	    }

	    return _codeSnippet2['default'].toArray(element.querySelectorAll(selector));
	}

	/**
	 * Stop event propagation.
	 * @param {Event} e - event object
	 * @name stopPropagation
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function stopPropagation(e) {
	    if (e.stopPropagation) {
	        e.stopPropagation();

	        return;
	    }

	    e.cancelBubble = true;
	}

	/**
	 * Prevent default action
	 * @param {Event} e - event object
	 * @name preventDefault
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function preventDefault(e) {
	    if (e.preventDefault) {
	        e.preventDefault();

	        return;
	    }

	    e.returnValue = false;
	}

	/**
	 * Check specific CSS style is available.
	 * @param {array} props property name to testing
	 * @returns {(string|boolean)} return true when property is available
	 * @name testCSSProp
	 * @memberof tui.dom
	 * @function
	 * @api
	 * @example
	 * var props = ['transform', '-webkit-transform'];
	 * domutil.testCSSProp(props);    // 'transform'
	 */
	function testCSSProp(props) {
	    var style = document.documentElement.style,
	        i = 0,
	        len = props.length;

	    for (; i < len; i += 1) {
	        if (props[i] in style) {
	            return props[i];
	        }
	    }

	    return false;
	}

	var prevSelectStyle = '';
	var SUPPORT_SELECTSTART = 'onselectstart' in document;
	var userSelectProperty = testCSSProp(['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

	/**
	 * Disable browser's text selection behaviors.
	 * @param {HTMLElement} [el] - target element. if not supplied, use `document`
	 * @name disableTextSelection
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function disableTextSelection() {
	    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

	    var style;

	    if (SUPPORT_SELECTSTART) {
	        domevent.on(el, 'selectstart', preventDefault);
	    } else {
	        el = el === document ? document.documentElement : el;
	        style = el.style;
	        prevSelectStyle = style[userSelectProperty];
	        style[userSelectProperty] = 'none';
	    }
	}

	/**
	 * Enable browser's text selection behaviors.
	 * @param {HTMLElement} [el] - target element. if not supplied, use `document`
	 * @name enableTextSelection
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function enableTextSelection() {
	    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

	    if (SUPPORT_SELECTSTART) {
	        domevent.off(el, 'selectstart', preventDefault);
	    } else {
	        el = el === document ? document.documentElement : el;
	        el.style[userSelectProperty] = prevSelectStyle;
	    }
	}

	/**
	 * Represents the text content of a node and its descendants
	 * @param {HTMLElement} element - html element
	 * @returns {string} text content
	 * @name textContent
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function textContent(element) {
	    if (_codeSnippet2['default'].isExisty(element.textContent)) {
	        return element.textContent;
	    }

	    return element.innerText;
	}

	/**
	 * Insert element to next of target element
	 * @param {HTMLElement} element - html element to insert
	 * @param {HTMLElement} target - target element
	 * @name insertAfter
	 * @memberof tui.dom
	 * @function
	 * @api
	 */
	function insertAfter(element, target) {
	    var parent = target.parentNode;

	    if (target === parent.lastChild) {
	        parent.appendChild(element);
	    } else {
	        parent.insertBefore(element, target.nextSibling);
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * DOM event utility module.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @fileoverview Module for handle DOM events
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


	exports.on = on;
	exports.once = once;
	exports.off = off;
	exports.checkMouse = checkMouse;
	exports.getMouseButton = getMouseButton;
	exports.getMousePosition = getMousePosition;

	var _codeSnippet = __webpack_require__(1);

	var _codeSnippet2 = _interopRequireDefault(_codeSnippet);

	var _domutil = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var EVENT_KEY = '_feEventKey';

	/**
	 * Get event collection for specific HTML element
	 * @param {HTMLElement} element - HTML element
	 * @param {string} [type] - event type
	 * @returns {(object|Map)}
	 */
	function safeEvent(element, type) {
	    var events = element[EVENT_KEY];

	    if (!events) {
	        events = element[EVENT_KEY] = {};
	    }

	    if (type) {
	        var handlerMap = events[type];

	        if (!handlerMap) {
	            handlerMap = events[type] = new _codeSnippet2['default'].Map();
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
	    safeEvent(element, type)['delete'](keyFn);
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
	            type = type === 'mouseenter' ? 'mouseover' : 'mouseout';
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
	    var events = safeEvent(element, type);
	    var items = events.get(handler);

	    if (!items) {
	        return;
	    }

	    forgetHandler(element, type, handler);

	    _codeSnippet2['default'].forEach(items, function (func) {
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
	function on(element, types, handler, context) {
	    if (_codeSnippet2['default'].isString(types)) {
	        _codeSnippet2['default'].forEach(types.split(/\s+/g), function (type) {
	            bindEvent(element, type, handler, context);
	        });

	        return;
	    }

	    _codeSnippet2['default'].forEach(types, function (func, type) {
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
	function once(element, types, handler, context) {
	    if (_codeSnippet2['default'].isObject(types)) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _slicedToArray(_step.value, 2),
	                    fn = _step$value[0],
	                    type = _step$value[1];

	                once(element, type, fn, handler);
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                    _iterator['return']();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        return;
	    }

	    var onceHandler = function onceHandler() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

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
	function off(element, types, handler) {
	    if (_codeSnippet2['default'].isString(types)) {
	        _codeSnippet2['default'].forEach(types.split(/\s+/g), function (type) {
	            unbindEvent(element, type, handler);
	        });

	        return;
	    }

	    _codeSnippet2['default'].forEach(types, function (func, type) {
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
	function checkMouse(element, e) {
	    var related = e.relatedTarget;

	    if (!related) {
	        return true;
	    }

	    try {
	        while (related && related !== element) {
	            related = related.parentNode;
	        }
	    } catch (err) {
	        return false;
	    }

	    return related !== element;
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
	function getMouseButton(mouseEvent) {
	    var primary = '0,1,3,5,7';
	    var secondary = '2,6';
	    var wheel = '4';

	    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
	        return mouseEvent.button;
	    }

	    var button = String(mouseEvent.button);
	    if (_codeSnippet2['default'].inArray(button, primary) > -1) {
	        return 0;
	    } else if (_codeSnippet2['default'].inArray(button, secondary) > -1) {
	        return 2;
	    } else if (_codeSnippet2['default'].inArray(button, wheel) > -1) {
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
	function getMousePosition(position, relativeElement) {
	    var rect = void 0,
	        clientX = void 0,
	        clientY = void 0;

	    if (_codeSnippet2['default'].isArray(position)) {
	        clientX = position[0];
	        clientY = position[1];
	    } else {
	        clientX = position.clientX;
	        clientY = position.clientY;
	    }

	    if (!relativeElement) {
	        return [clientX, clientY];
	    }

	    rect = (0, _domutil.getRect)(relativeElement);

	    return [clientX - rect.left - relativeElement.clientLeft, clientY - rect.top - relativeElement.clientTop];
	}

/***/ }
/******/ ]);