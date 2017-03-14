/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alignmentErr = new ReferenceError('Sorry, that is not a valid alignment');
var aDie = __webpack_require__(5);

var Character = function () {
    function Character(name, alignment) {
        _classCallCheck(this, Character);

        this.name = name;
        this.alignment = alignment;
    }

    _createClass(Character, [{
        key: 'alignment',
        get: function get() {
            return this._alignment;
        },
        set: function set(value) {
            var validAlignments = ['good', 'bad', 'neutral'];
            var localAlignment = String(value);

            if (!validAlignments.includes(localAlignment.toLocaleLowerCase())) {
                throw new ReferenceError('Sorry, that is not a valid alignment');
            }
            this._alignment = value;
        }
    }, {
        key: 'armorClass',
        get: function get() {
            return 10;
        }
    }, {
        key: 'hitPoints',
        get: function get() {
            return 5;
        }
    }, {
        key: 'rollForAttack',
        get: function get() {
            return aDie.roll(20);
        }
    }]);

    return Character;
}();

; // class 

module.exports = Character;

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * d20.js
 *
 * Javascript library for rolling dice. Supports strings written in a dice-rolling syntax, eg. "d20", "4d6", "1d8+1".
 *
 * @author Michael Enger <mike@thelonelycoder.com>
 * @licence MIT
 */
(function () {
	"use strict";

	var d20 = {

		/**
   * Roll a number of dice and return the result.
   *
   * @param dice Type of dice to roll, can be represented in various formats:
   *               - a number (6, 12, 42)
   *               - dice syntax (d20, 4d6, 2d8+2)
   * @param verbose Whether or not all dice rolls should be returned as an array
   * @return Number|Array
   */
		roll: function roll(dice, verbose) {
			var result = d20.verboseRoll(dice),
			    num = 0;

			if (verbose) {
				return result;
			} else {
				for (var i in result) {
					num += result[i];
				}

				return num;
			}
		},

		/**
   * Roll a number of dice and return the result as an array.
   *
   * @param dice Type of dice to roll, can be represented in various formats:
   *               - a number (6, 12, 42)
   *               - dice syntax (d20, 4d6, 2d8+2)
   * @return Array
   */
		verboseRoll: function verboseRoll(dice) {
			var amount = 1,
			    mod = 0,
			    results = [],
			    match,
			    num,
			    modifiers;

			if (!dice) {
				throw new Error('Missing dice parameter.');
			}

			if (typeof dice == 'string') {
				match = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
				if (match) {
					if (match[1]) {
						amount = parseInt(match[1]);
					}
					if (match[2]) {
						dice = parseInt(match[2]);
					}
					if (match[3]) {
						modifiers = match[3].match(/([+-]\s*\d+)/g);
						for (var i = 0; i < modifiers.length; i++) {
							mod += parseInt(modifiers[i].replace(/\s/g, ''));
						}
					}
				} else {
					parseInt(dice);
				}
			}

			if (isNaN(dice)) {
				return [];
			}

			for (var i = 0; i < amount; i++) {
				/* We dont want to ruin verbose, so we dont skip the for loop */
				if (dice !== 0) {
					num = Math.floor(Math.random() * dice + 1);
				} else {
					num = 0;
				}
				results.push(num);
			}

			results = results.sort(function (a, b) {
				return a - b;
			});
			if (mod != 0) {
				results.push(mod);
			}

			return results;
		}
	};

	if (typeof window != 'undefined') {
		window.d20 = d20;
	} else if (true) {
		for (var k in d20) {
			exports[k] = d20[k];
		}
	}
})();

/***/ })

/******/ });