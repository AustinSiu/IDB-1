/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var axios = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"axios\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var artistsURL = 'http://banddb.me/api/artists';
var songsURL = 'http://banddb.me/api/songs';
var albumsURL = 'http://banddb.me/api/albums';
var toursURL = 'http://banddb.me/api/tours';

module.exports = {

  getArtists: function getArtists(page, filter, orderBy) {

    var encodedURI = window.encodeURI(artistsURL);
    return axios.get(encodedURI, {

      headers: {
        'Content-Type': 'application/json'
      },

      params: {
        'page': page,
        'q': JSON.stringify({ "order_by": orderBy, 'filters': filter })
      }
    }).then(function (response) {
      console.log(response);

      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  },

  getAlbums: function getAlbums(page, filter, orderBy) {

    var encodedURI = window.encodeURI(albumsURL);
    return axios.get(encodedURI, {

      headers: {
        'Content-Type': 'application/json'
      },

      params: {
        'page': page,
        'q': JSON.stringify({ "order_by": orderBy, 'filters': filter })
      }
    }).then(function (response) {
      console.log(response);

      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  },

  getSongs: function getSongs(page, filter, orderBy) {

    var encodedURI = window.encodeURI(songsURL);
    return axios.get(encodedURI, {

      headers: {
        'Content-Type': 'application/json'
      },

      params: {
        'page': page,
        'q': JSON.stringify({ "order_by": orderBy, 'filters': filter })
      }
    }).then(function (response) {
      console.log(response);

      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  },

  getTours: function getTours(page, filter, orderBy) {

    var encodedURI = window.encodeURI(toursURL);
    return axios.get(encodedURI, {

      headers: {
        'Content-Type': 'application/json'
      },

      params: {
        'page': page,
        'q': JSON.stringify({ "order_by": orderBy, 'filters': filter })
      }
    }).then(function (response) {
      console.log(response);

      return response.data;
    }).catch(function (error) {
      console.log(error);
    });
  },

  // Instance functions

  getAlbum: function getAlbum(id) {

    var encodedURI = window.encodeURI(albumsURL + '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });
  },

  getArtist: function getArtist(id) {

    var encodedURI = window.encodeURI(artistsURL + '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });
  },

  getSong: function getSong(id) {

    var encodedURI = window.encodeURI(songsURL + '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });
  },

  getTour: function getTour(id) {

    var encodedURI = window.encodeURI(toursURL + '/' + id);
    console.log("the encoded URI" + encodedURI);
    return axios.get(encodedURI, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      console.log(response.data);
      return response.data;
    }).catch(function (error) {
      console.log("Received Error: ");
      console.log(error);
    });
  }

  // utils


};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var ReactDOM = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__webpack_require__(2);

var App = __webpack_require__(7);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./index.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "body {\n  background-color: #141414;\n  color: #848484;\n  font-family: \"Source Sans Pro\", \"Open Sans\", sans-serif;\n  font-size: 16px;\n  line-height: 24px;\n  background-image: url('http://i.imgur.com/NUgDkU3.jpg');\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\na {\n  text-decoration: none;\n  color: #848484;\n}\n\nul {\n  padding: 0;\n}\n\nli {\n  list-style-type: none;\n}\n\n.img {\n  height: auto;\n  width: auto;\n  max-width: 200px;\n  max-height: 200px;\n}\n\n.space-list-items {\n  margin-bottom: 7px;\n}\n\n.options {\n  display: flex;\n  justify-content: center;\n}\n\n.options li {\n  margin: 10px;\n  font-weight: bold;\n  cursor: pointer;\n}\n\n.data-list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\n.data-item {\n  margin: 20px;\n  text-align: center;\n}\n\n.home-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.nav {\n  display: flex;\n}\n\n.nav li {\n  margin-right: 15px;\n}\n\n.nav li :hover{\n  font-weight: bold;\n  color: #fd5927;\n}\n\n.active {\n  font-weight: bold;\n  color: #fd5927;\n}\n\n.title-header {\n  position: fixed;\n  margin-top: 150px;\n}\n  .title-header .title {\n    font-weight: bold;\n    font-size: 65px;\n    color: white;\n    text-align: center;\n  }\n\n  .title-header .subtitle {\n    font-weight: bold;\n    font-size: 40px;\n    color: #fd5927;\n    text-align: center;\n    line-height: 100%;\n  }\n\n  .title-header .subdesc {\n    font-size: 25px;\n    color: #848484;\n    text-align: center;\n  }\n\n.about {\n  margin-top: 50px;\n}\n  .about .title {\n    font-weight: bold;\n    font-size: 40px;\n    color: white;\n  }\n  .about .subtitle {\n    font-weight: bold;\n    font-size: 25px;\n    color: white;\n    line-height: 100%;\n  }\n\n  .about .subdesc {\n    font-size: 15px;\n    color: #848484;\n    line-height: 120%;\n    margin-right: 300px;\n  }\n\n  .my-button {\n      display: flex;\n      justify-content: center;\n  }\n  .my-button .title {\n      font-size: 15px;\n      color: #ababab;\n      float: left;\n      padding: 8px 16px;\n      text-decoration: none;\n      transition: background-color .3s;\n      margin: 1px ;    \n  }\n  .my-button li {\n      color: #ababab;\n      float: left;\n      padding: 8px 16px;\n      text-decoration: none;\n      border: 1px solid #ddd;\n      margin: 1px ;\n  }\n  .my-button li.active {\n      background-color: ##ababab;\n      color: white;\n      border: 1px solid #4CAF50;\n  }\n  .my-button li:hover:not(.active), .my-button li.current-button {color: #fd5927; border: 1px solid #fd5927;}\n/* -------- SLIDER --------- */\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var ReactRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Navbar = __webpack_require__(8);

var Home = __webpack_require__(10);
var Artists = __webpack_require__(11);
var Albums = __webpack_require__(12);
var Tours = __webpack_require__(13);
var Songs = __webpack_require__(14);
var About = __webpack_require__(15);

var ArtistInstance = __webpack_require__(16);
var AlbumInstance = __webpack_require__(17);
var TourInstance = __webpack_require__(18);
var SongInstance = __webpack_require__(19);

var SearchResults = __webpack_require__(20);

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        Router,
        null,
        React.createElement(
          'div',
          { className: 'container' },
          React.createElement(Navbar, null),
          React.createElement(
            Switch,
            null,
            React.createElement(Route, { exact: true, path: '/', component: Home }),
            React.createElement(Route, { path: '/artists', component: Artists }),
            React.createElement(Route, { path: '/artist-instance/:artistID', component: ArtistInstance }),
            React.createElement(Route, { path: '/albums', component: Albums }),
            React.createElement(Route, { path: '/album-instance/:albumID', component: AlbumInstance }),
            React.createElement(Route, { path: '/tours', component: Tours }),
            React.createElement(Route, { path: '/tour-instance/:tourID', component: TourInstance }),
            React.createElement(Route, { path: '/songs', component: Songs }),
            React.createElement(Route, { path: '/song-instance/:songID', component: SongInstance }),
            React.createElement(Route, { path: '/about', component: About }),
            React.createElement(Route, { path: '/searchResults/:searchString', component: SearchResults }),
            React.createElement(Route, { render: function render() {
                return React.createElement(
                  'center',
                  null,
                  React.createElement(
                    'h1',
                    null,
                    '404'
                  ),
                  React.createElement(
                    'h2',
                    null,
                    'Oops! We can\'t seem to find the page you\'re looking for.'
                  )
                );
              } })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

module.exports = App;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var NavLink = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).NavLink;
var SearchBox = __webpack_require__(9);

function Navbar() {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'ul',
      { className: 'nav' },
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { exact: true, activeClassName: 'active', to: '/' },
          'Home'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { activeClassName: 'active', to: '/artists' },
          'Artists'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { activeClassName: 'active', to: '/albums' },
          'Albums'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { activeClassName: 'active', to: '/songs' },
          'Songs'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { activeClassName: 'active', to: '/tours' },
          'Tours'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          NavLink,
          { activeClassName: 'active', to: '/about' },
          'About'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement(SearchBox, null)
      )
    )
  );
}

module.exports = Navbar;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _reactRouter = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;

var SearchBox = function (_React$Component) {
  _inherits(SearchBox, _React$Component);

  function SearchBox(props) {
    _classCallCheck(this, SearchBox);

    var _this = _possibleConstructorReturn(this, (SearchBox.__proto__ || Object.getPrototypeOf(SearchBox)).call(this));

    _this.state = {
      search_entry: ''
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(SearchBox, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ search_entry: event.target.value });
      console.log(event.target.value);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var searchEndPoint = this.state.search_entry;
      this.props.history.push("/searchResults/" + searchEndPoint);
      this.setState({ search_entry: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          React.createElement(
            _reactBootstrap.FormGroup,
            null,
            React.createElement(_reactBootstrap.FormControl, { type: 'text',
              value: this.state.search_entry,
              placeholder: 'Search...',
              onChange: this.handleChange }),
            React.createElement(_reactBootstrap.FormControl.Feedback, null)
          )
        )
      );
    }
  }]);

  return SearchBox;
}(React.Component);

module.exports = (0, _reactRouter.withRouter)(SearchBox);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "title-header" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "h2",
            { className: "title" },
            "Welcome to BandDB"
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Everything you need to know about your favorite bands and artists"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "Start by browsing bands, people, albums, tours, and songs. The options are endless."
          )
        )
      );
    }
  }]);

  return Home;
}(React.Component);

module.exports = Home;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;


var orderByAsc = [{ 'field': 'Name', 'direction': 'asc' }];
var orderByDsc = [{ 'field': 'Name', 'direction': 'desc' }];

function SelectGenre(props) {
  var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Filter By: '
    ),
    genres.map(function (genre) {
      return React.createElement(
        'li',
        {
          style: genre === props.currentFilter ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, genre),
          key: genre },
        genre
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function SelectSort(props) {
  var sorts = ["Ascending", "Descending"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Sort By: '
    ),
    sorts.map(function (sort) {
      return React.createElement(
        'li',
        {
          style: sort === props.currentSort ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, sort),
          key: sort },
        sort
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function ArtistGrid(props) {
  console.log(props.artists);
  return React.createElement(
    'ul',
    { className: 'data-list' },
    props.artists.map(function (artist) {
      return React.createElement(
        'li',
        { key: artist.ArtistID, className: 'data-item' },
        React.createElement(
          'ul',
          { className: 'data-list-items' },
          React.createElement(
            Link,
            { to: '/artist-instance/' + artist.ArtistID },
            React.createElement(
              'li',
              null,
              React.createElement('img', {
                className: 'img',
                src: artist.Image,
                alt: 'Image for ' + artist.Name })
            ),
            React.createElement(
              'li',
              null,
              artist.Name
            )
          )
        )
      );
    })
  );
}
ArtistGrid.propTypes = {
  artists: PropTypes.array.isRequired
};

var Artists = function (_React$Component) {
  _inherits(Artists, _React$Component);

  function Artists(props) {
    _classCallCheck(this, Artists);

    var _this = _possibleConstructorReturn(this, (Artists.__proto__ || Object.getPrototypeOf(Artists)).call(this, props));

    _this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      artists: null,
      activePage: 1,
      numPages: 6
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.updateSort = _this.updateSort.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(Artists, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFilter(this.state.currentFilter);
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(genre) {
      this.setState(function () {
        return {
          currentFilter: genre,
          artists: null,
          activePage: 1
        };
      });
      var filter;
      if (genre !== "Show All") {
        filter = [{ 'name': 'ArtistGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": genre } }];
      }
      api.getArtists(1, filter, orderByAsc).then(function (data) {
        this.setState(function () {
          return {
            artists: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'updateSort',
    value: function updateSort(sort) {
      this.setState(function () {
        return {
          currentSort: sort,
          activePage: 1
        };
      });
      var filter;
      if (this.state.currentFilter !== "Show All") {
        filter = [{ 'name': 'ArtistGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": this.state.currentFilter } }];;
      }
      var order_by;
      if (sort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getArtists(1, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            artists: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(eventKey) {
      this.setState({ activePage: eventKey });
      var filter;
      if (this.state.currentFilter !== "Show All") {
        filter = [{ 'name': 'ArtistGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": this.state.currentFilter } }];;
      }
      var order_by;
      if (this.state.currentSort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getArtists(eventKey, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            artists: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(SelectGenre, {
          currentFilter: this.state.currentFilter,
          onSelect: this.updateFilter }),
        React.createElement(SelectSort, {
          currentSort: this.state.currentSort,
          onSelect: this.updateSort }),
        !this.state.artists ? React.createElement(
          'p',
          null,
          'LOADING'
        ) : React.createElement(ArtistGrid, { artists: this.state.artists }),
        React.createElement(_reactBootstrap.Pagination, {
          prev: true,
          next: true,
          first: true,
          last: true,
          ellipsis: true,
          boundaryLinks: true,
          items: this.state.numPages,
          maxButtons: 5,
          activePage: this.state.activePage,
          onSelect: this.handleSelect })
      );
    }
  }]);

  return Artists;
}(React.Component);

module.exports = Artists;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;


var orderByAsc = [{ 'field': 'Title', 'direction': 'asc' }];
var orderByDsc = [{ 'field': 'Title', 'direction': 'desc' }];

function SelectGenre(props) {
  var filters = ["Show All"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Filter By: '
    ),
    filters.map(function (filter) {
      return React.createElement(
        'li',
        {
          style: filter === props.currentFilter ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, filter),
          key: filter },
        filter
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function AlbumGrid(props) {
  return React.createElement(
    'ul',
    { className: 'data-list' },
    props.albums.map(function (album) {
      return React.createElement(
        'li',
        { key: album.AlbumID, className: 'data-item' },
        React.createElement(
          'ul',
          { className: 'data-list-items' },
          React.createElement(
            Link,
            { to: '/album-instance/' + album.AlbumID },
            React.createElement(
              'li',
              null,
              React.createElement('img', {
                className: 'img',
                src: album.Image,
                alt: 'Image for ' + album.Title })
            ),
            React.createElement(
              'li',
              null,
              album.Title
            )
          )
        )
      );
    })
  );
}
AlbumGrid.propTypes = {
  albums: PropTypes.array.isRequired
};

function SelectSort(props) {
  var sorts = ["Ascending", "Descending"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Sort By: '
    ),
    sorts.map(function (sort) {
      return React.createElement(
        'li',
        {
          style: sort === props.currentSort ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, sort),
          key: sort },
        sort
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

var Albums = function (_React$Component) {
  _inherits(Albums, _React$Component);

  function Albums(props) {
    _classCallCheck(this, Albums);

    var _this = _possibleConstructorReturn(this, (Albums.__proto__ || Object.getPrototypeOf(Albums)).call(this, props));

    _this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      albums: null,
      activePage: 1,
      numPages: 16
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.updateSort = _this.updateSort.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(Albums, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFilter(this.state.currentFilter);
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(genre) {
      this.setState(function () {
        return {
          currentFilter: genre,
          albums: null,
          activePage: 1
        };
      });
      var filter;
      api.getAlbums(1, filter, orderByAsc).then(function (data) {
        this.setState(function () {
          return {
            albums: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'updateSort',
    value: function updateSort(sort) {
      this.setState(function () {
        return {
          currentSort: sort,
          activePage: 1
        };
      });
      var filter;
      var order_by;
      if (sort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getAlbums(1, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            albums: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(eventKey) {
      this.setState({ activePage: eventKey });

      var filter;
      var order_by;
      if (this.state.currentSort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getAlbums(eventKey, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            albums: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var album = this.state.album;

      return React.createElement(
        'div',
        null,
        React.createElement(SelectGenre, {
          currentFilter: this.state.currentFilter,
          onSelect: this.updateFilter }),
        React.createElement(SelectSort, {
          currentSort: this.state.currentSort,
          onSelect: this.updateSort }),
        !this.state.albums ? React.createElement(
          'p',
          null,
          'LOADING'
        ) : React.createElement(AlbumGrid, { albums: this.state.albums }),
        React.createElement(_reactBootstrap.Pagination, {
          prev: true,
          next: true,
          first: true,
          last: true,
          ellipsis: true,
          boundaryLinks: true,
          items: this.state.numPages,
          maxButtons: 5,
          activePage: this.state.activePage,
          onSelect: this.handleSelect })
      );
    }
  }]);

  return Albums;
}(React.Component);

module.exports = Albums;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;


var orderByAsc = [{ 'field': 'Name', 'direction': 'asc' }];
var orderByDsc = [{ 'field': 'Name', 'direction': 'desc' }];

function SelectLocation(props) {
  var filters = ["Show All", "United States and Canada", "Europe and Asia"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Filter By: '
    ),
    filters.map(function (filter) {
      return React.createElement(
        'li',
        {
          style: filter === props.currentFilter ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, filter),
          key: filter },
        filter
      );
    })
  );
}
SelectLocation.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function TourGrid(props) {
  return React.createElement(
    'ul',
    { className: 'data-list' },
    props.tours.map(function (tour) {
      return React.createElement(
        'li',
        { key: tour.TourID, className: 'data-item' },
        React.createElement(
          'ul',
          { className: 'data-list-items' },
          React.createElement(
            Link,
            { to: '/tour-instance/' + tour.TourID },
            React.createElement(
              'li',
              null,
              React.createElement('img', {
                className: 'img',
                src: tour.Image,
                alt: 'Image for ' + tour.Name })
            ),
            React.createElement(
              'li',
              null,
              tour.Name
            )
          )
        )
      );
    })
  );
}
TourGrid.propTypes = {
  tours: PropTypes.array.isRequired
};

function SelectSort(props) {
  var sorts = ["Ascending", "Descending"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Sort By: '
    ),
    sorts.map(function (sort) {
      return React.createElement(
        'li',
        {
          style: sort === props.currentSort ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, sort),
          key: sort },
        sort
      );
    })
  );
}
SelectLocation.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

var Tours = function (_React$Component) {
  _inherits(Tours, _React$Component);

  function Tours(props) {
    _classCallCheck(this, Tours);

    var _this = _possibleConstructorReturn(this, (Tours.__proto__ || Object.getPrototypeOf(Tours)).call(this, props));

    _this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      tours: null,
      activePage: 1,
      numPages: 0
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.updateSort = _this.updateSort.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(Tours, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFilter(this.state.currentFilter);
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(location) {
      this.setState(function () {
        return {
          currentFilter: location,
          tours: null,
          activePage: 1
        };
      });
      var filter;
      api.getTours(1, filter, orderByAsc).then(function (data) {
        this.setState(function () {
          return {
            tours: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'updateSort',
    value: function updateSort(sort) {
      this.setState(function () {
        return {
          currentSort: sort,
          activePage: 1
        };
      });
      var filter;
      var order_by;
      if (sort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getTours(1, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            tours: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(eventKey) {
      this.setState({ activePage: eventKey });

      var filter;
      var order_by;
      if (this.state.currentSort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getTours(eventKey, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            tours: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var tour = this.state.tour;

      return React.createElement(
        'div',
        null,
        React.createElement(SelectLocation, {
          currentFilter: this.state.currentFilter,
          onSelect: this.updateFilter }),
        React.createElement(SelectSort, {
          currentSort: this.state.currentSort,
          onSelect: this.updateSort }),
        !this.state.tours ? React.createElement(
          'p',
          null,
          'LOADING'
        ) : React.createElement(TourGrid, { tours: this.state.tours }),
        React.createElement(_reactBootstrap.Pagination, {
          prev: true,
          next: true,
          first: true,
          last: true,
          ellipsis: true,
          boundaryLinks: true,
          items: this.state.numPages,
          maxButtons: 5,
          activePage: this.state.activePage,
          onSelect: this.handleSelect })
      );
    }
  }]);

  return Tours;
}(React.Component);

module.exports = Tours;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;


var orderByAsc = [{ 'field': 'Name', 'direction': 'asc' }];
var orderByDsc = [{ 'field': 'Name', 'direction': 'desc' }];

function SelectGenre(props) {
  var genres = ["Show All", "Alternative", "Blues", "Country", "Electronic", "Indie", "Rap", "Rock"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Filter By: '
    ),
    genres.map(function (genre) {
      return React.createElement(
        'li',
        {
          style: genre === props.currentFilter ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, genre),
          key: genre },
        genre
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function SelectSort(props) {
  var sorts = ["Ascending", "Descending"];
  return React.createElement(
    'ul',
    { className: 'my-button' },
    React.createElement(
      'p',
      { className: 'title' },
      'Sort By: '
    ),
    sorts.map(function (sort) {
      return React.createElement(
        'li',
        {
          style: sort === props.currentSort ? { color: '#fd5927' } : null,
          onClick: props.onSelect.bind(null, sort),
          key: sort },
        sort
      );
    })
  );
}
SelectGenre.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

function SongGrid(props) {
  return React.createElement(
    'ul',
    { className: 'data-list' },
    props.songs.map(function (song) {
      return React.createElement(
        'li',
        { key: song.SongID, className: 'data-item' },
        React.createElement(
          'ul',
          { className: 'data-list-items' },
          React.createElement(
            Link,
            { to: '/song-instance/' + song.SongID },
            React.createElement(
              'li',
              null,
              React.createElement('img', {
                className: 'img',
                src: song.Image,
                alt: 'Image for ' + song.Name })
            ),
            React.createElement(
              'li',
              null,
              song.Name
            )
          )
        )
      );
    })
  );
}
SongGrid.propTypes = {
  songs: PropTypes.array.isRequired
};

var Albums = function (_React$Component) {
  _inherits(Albums, _React$Component);

  function Albums(props) {
    _classCallCheck(this, Albums);

    var _this = _possibleConstructorReturn(this, (Albums.__proto__ || Object.getPrototypeOf(Albums)).call(this, props));

    _this.state = {
      currentFilter: "Show All",
      currentSort: "Ascending",
      songs: null,
      activePage: 1,
      numPages: 50
    };

    _this.updateFilter = _this.updateFilter.bind(_this);
    _this.updateSort = _this.updateSort.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(Albums, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFilter(this.state.currentFilter);
    }
  }, {
    key: 'updateFilter',
    value: function updateFilter(genre) {
      this.setState(function () {
        return {
          currentFilter: genre,
          songs: null,
          activePage: 1
        };
      });
      var filter;
      if (genre !== "Show All") {
        filter = [{ 'name': 'SongGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": genre } }];;
      }
      api.getSongs(1, filter, orderByAsc).then(function (data) {
        this.setState(function () {
          return {
            songs: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'updateSort',
    value: function updateSort(sort) {
      this.setState(function () {
        return {
          currentSort: sort,
          activePage: 1
        };
      });
      var filter;
      if (this.state.currentFilter !== "Show All") {
        filter = [{ 'name': 'SongGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": this.state.currentFilter } }];;
      }
      var order_by;
      if (sort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getSongs(1, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            songs: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(eventKey) {
      this.setState({ activePage: eventKey });
      var filter;
      if (this.state.currentFilter !== "Show All") {
        filter = [{ 'name': 'SongGenre', 'op': 'any', 'val': { "name": "Name", "op": "ilike", "val": this.state.currentFilter } }];;
      }
      var order_by;
      if (this.state.currentSort === 'Ascending') {
        order_by = orderByAsc;
      } else {
        order_by = orderByDsc;
      }
      api.getSongs(eventKey, filter, order_by).then(function (data) {
        this.setState(function () {
          return {
            songs: data.objects,
            numPages: data.total_pages
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        React.createElement(SelectGenre, {
          currentFilter: this.state.currentFilter,
          onSelect: this.updateFilter }),
        React.createElement(SelectSort, {
          currentSort: this.state.currentSort,
          onSelect: this.updateSort }),
        !this.state.songs ? React.createElement(
          'p',
          null,
          'LOADING'
        ) : React.createElement(SongGrid, { songs: this.state.songs }),
        React.createElement(_reactBootstrap.Pagination, {
          prev: true,
          next: true,
          first: true,
          last: true,
          ellipsis: true,
          boundaryLinks: true,
          items: this.state.numPages,
          maxButtons: 5,
          activePage: this.state.activePage,
          onSelect: this.handleSelect })
      );
    }
  }]);

  return Albums;
}(React.Component);

module.exports = Albums;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var About = function (_React$Component) {
  _inherits(About, _React$Component);

  function About() {
    _classCallCheck(this, About);

    return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
  }

  _createClass(About, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "about" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "h2",
            { className: "title" },
            "Motivation"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "Our team was motivated to create an IMDb-like application for everything you need to know about artists and music. We were inspired by Spotify and came into realization that there needs to be a main place where people can find simple and quick information about an artist\u2019s biography, discography, and tour dates. Our website is named \u201CBandDB\u201D, which stands for Band Database. We believe this website will be useful for music lovers and others alike who want to learn a little bit more about their favorite bands and artists."
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Group Name: Wiggity Wack"
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Group Members: "
          ),
          React.createElement(
            "h1",
            null,
            " ",
            React.createElement("img", { src: "http://i.imgur.com/oq4FYOi.jpg" })
          ),
          React.createElement(
            "h1",
            null,
            "Jonathan Peacher"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "I am Jonathan! I am a CS major with one year left before I graduate (i.e. I'm a Senior now I guess.) I've started programming since around highschool and have loved it ever since."
          ),
          React.createElement(
            "li",
            null,
            " - Boostrap, AWS setup, Data Scraping"
          ),
          React.createElement(
            "li",
            null,
            " - no. of commits: 41"
          ),
          React.createElement(
            "li",
            null,
            " - no. of issues: 11"
          ),
          React.createElement(
            "li",
            null,
            " - no. of unit tests: 29"
          ),
          React.createElement(
            "h1",
            null,
            " ",
            React.createElement("img", { src: "http://i.imgur.com/H2hdDdu.jpg" })
          ),
          React.createElement(
            "h1",
            null,
            "Tika Lestari"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "I\u2019m a third year Computer Science major at UT, minoring in Information Studies. My hobbies include playing the piano, guitar, ukulele, cooking, and petting cats."
          ),
          React.createElement(
            "li",
            null,
            " - Apiary, Data Scraping, Flask Templates, React"
          ),
          React.createElement(
            "li",
            null,
            " - no. of commits: 28"
          ),
          React.createElement(
            "li",
            null,
            " - no. of issues: 10"
          ),
          React.createElement(
            "li",
            null,
            " - no. of unit tests: 0"
          ),
          React.createElement(
            "h1",
            null,
            " ",
            React.createElement("img", { src: "http://i.imgur.com/WmF6m4C.jpg" })
          ),
          React.createElement(
            "h1",
            null,
            "Shida Shen"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "I am Shida. I study and research physics. I am also an enthusiastic coder."
          ),
          React.createElement(
            "li",
            null,
            " - Apiary, Database, AWS"
          ),
          React.createElement(
            "li",
            null,
            " - no. of commits: 59"
          ),
          React.createElement(
            "li",
            null,
            " - no. of issues: 12"
          ),
          React.createElement(
            "li",
            null,
            " - no. of unit tests: 0"
          ),
          React.createElement(
            "h1",
            null,
            " ",
            React.createElement("img", { src: "http://i.imgur.com/IZl4Vuq.jpg" })
          ),
          React.createElement(
            "h1",
            null,
            "Sarah Baxter"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "I'm a fourth year Computer Science major at UT. I also have a minor in Spanish and Business."
          ),
          React.createElement(
            "li",
            null,
            " - no. of commits: 68"
          ),
          React.createElement(
            "li",
            null,
            " - no. of issues: 10"
          ),
          React.createElement(
            "li",
            null,
            " - no. of unit tests: 0"
          ),
          React.createElement(
            "h1",
            null,
            " ",
            React.createElement("img", { src: "http://i.imgur.com/LZgaDuw.jpg" })
          ),
          React.createElement(
            "h1",
            null,
            "Mitch Chaiet (Auditor)"
          ),
          React.createElement(
            "p",
            { className: "subdesc" },
            "University of Texas Junior with a strong passion for everything music, tech, business, and design. Free time spent studying business tactics, working on my startup ConcertCam, playing open mic nights, and building innovative musical hardware."
          ),
          React.createElement(
            "li",
            null,
            " - no. of commits: 9"
          ),
          React.createElement(
            "li",
            null,
            " - no. of issues: 2"
          ),
          React.createElement(
            "li",
            null,
            " - no. of unit tests: 0"
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Statistics "
          ),
          React.createElement(
            "li",
            null,
            " - total no. of commits: 197"
          ),
          React.createElement(
            "li",
            null,
            " - total no. of issues: 43"
          ),
          React.createElement(
            "li",
            null,
            " - total no. of unit tests: 29"
          ),
          React.createElement(
            "li",
            null,
            " - ",
            React.createElement(
              "b",
              null,
              "Apiary API"
            ),
            ": ",
            React.createElement(
              "a",
              { href: "https://docs.djpeacher.apiary.io" },
              "https://docs.djpeacher.apiary.io"
            )
          ),
          React.createElement(
            "li",
            null,
            " - ",
            React.createElement(
              "b",
              null,
              "GitHub Repo"
            ),
            ": ",
            React.createElement(
              "a",
              { href: "https://github.com/djpeacher/IDB" },
              "https://github.com/djpeacher/IDB"
            )
          ),
          React.createElement(
            "li",
            null,
            " - ",
            React.createElement(
              "b",
              null,
              "Trello"
            ),
            ": ",
            React.createElement(
              "a",
              { href: "https://trello.com/b/Xa3QhO2b/idb1" },
              "https://trello.com/b/Xa3QhO2b/idb1"
            )
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Data "
          ),
          React.createElement(
            "li",
            null,
            " - ",
            React.createElement(
              "a",
              { href: "https://en.wikipedia.org/w/api.php" },
              "https://en.wikipedia.org/w/api.php"
            )
          ),
          React.createElement(
            "li",
            null,
            " - ",
            React.createElement(
              "a",
              { href: "https://developer.spotify.com/web-api/" },
              "https://developer.spotify.com/web-api/"
            )
          ),
          React.createElement(
            "li",
            null,
            " - Phase 1: Since we only needed 3 instances of each model, data scraping was done manually."
          ),
          React.createElement(
            "li",
            null,
            " - Phase 2-4: Data scraping was done automatically."
          ),
          React.createElement(
            "h3",
            { className: "title" },
            "Tools "
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Hosting "
          ),
          React.createElement(
            "li",
            null,
            " - AWS EC2 - Elastic Compute Cloud is a web service that provides computing capacity from Amazon's cloud."
          ),
          React.createElement(
            "li",
            null,
            " - Namecheap - the domain name registrar from which we obtained our banddb.me domain."
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "API "
          ),
          React.createElement(
            "li",
            null,
            " - Apiary - A Github tool that we used to document our API."
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "GUI "
          ),
          React.createElement(
            "li",
            null,
            " - Bootstrap - A free and open-source front-end web framework for designing websites and web applications. It contains HTML- and CSS-based design templates as well as optional JavaScript extensions. We used Bootstrap throughout our website to style and format our data."
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Frontend "
          ),
          React.createElement(
            "li",
            null,
            " - JavaScript - Is a high-level, dynamic, untyped, interpreted run-time language. We used JavaScript with Bootstrap to design the front-end of our web application."
          ),
          React.createElement(
            "li",
            null,
            " - CSS 3 - The 3rd version of CSS, a style sheet language used for describing the presentation of a document written in a markup language. We used this with Bootstrap to style our web application."
          ),
          React.createElement(
            "li",
            null,
            " - HTML 5 - The 5th version of HTML, the standard markup language for creating web pages and web applications. We used this with Bootstrap for the front-end of our web application."
          ),
          React.createElement(
            "h3",
            { className: "subtitle" },
            "Other "
          ),
          React.createElement(
            "li",
            null,
            " - Github - A web-based version control repository that our team used to maintain our source code."
          ),
          React.createElement(
            "li",
            null,
            " - Slack - A communication tool our team used to collaborate over the course of the project. Slack is also connected to the Github repository, which allowed us to monitor the commits of individual team members and the overall progress of the team."
          ),
          React.createElement(
            "li",
            null,
            " - Trello - A project management application that our team used to list and categorize the necessary tasks for developing our web application. It allowed us to track the progress of our team over the course of the project."
          ),
          React.createElement(
            "li",
            null,
            " - PlanitPoker - An online application that provides an interface for Agile project teams to estimate the complexity or completion time of projects. Our team used this application to break each phase of our project into tasks and estimate the time each task would require."
          ),
          React.createElement(
            "li",
            null,
            " - Report: ",
            React.createElement(
              "a",
              { href: "https://utexas.box.com/s/pmn4fuzcsur6sklj2i09o1x4q6shitkh" },
              "https://utexas.box.com/s/kb82xlo3opqrp8ral25m8bmn8l68hp19"
            )
          )
        )
      );
    }
  }]);

  return About;
}(React.Component);

module.exports = About;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;

var Artist_Instance = function (_React$Component) {
  _inherits(Artist_Instance, _React$Component);

  function Artist_Instance(props) {
    _classCallCheck(this, Artist_Instance);

    var _this = _possibleConstructorReturn(this, (Artist_Instance.__proto__ || Object.getPrototypeOf(Artist_Instance)).call(this));

    _this.state = {
      artist: null
    };
    return _this;
  }

  _createClass(Artist_Instance, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateArtist(this.state.artist);
    }
  }, {
    key: 'updateArtist',
    value: function updateArtist(a) {
      var artistID = this.props.match.params.artistID;

      this.setState(function () {
        return {
          artist: a
        };
      });

      api.getArtist(artistID).then(function (a) {
        console.log(a);
        this.setState(function () {
          return {
            artist: a
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(JSON.stringify(this.state.artist));
      console.log(this.state.artist);
      var artist = this.state.artist;

      if (!artist) {
        return React.createElement(
          'p',
          null,
          'LOADING!'
        );
      } else {
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'h1',
            null,
            'Artist: ',
            artist.Name
          ),
          React.createElement('img', {
            className: 'img',
            src: artist.Image,
            alt: 'Image for ' + artist.Name }),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Genre: ',
              artist.ArtistGenre[0].Name
            ),
            React.createElement(
              'li',
              null,
              'Songs:',
              React.createElement(
                Link,
                { to: '/song-instance/' + artist.Songs[0].SongID },
                artist.Songs[0].Name
              )
            ),
            React.createElement(
              'li',
              null,
              'Album:',
              React.createElement(
                Link,
                { to: '/album-instance/' + artist.Albums[0].AlbumID },
                artist.Albums[0].Title
              )
            )
          )
        );
      }
    }
  }]);

  return Artist_Instance;
}(React.Component);

module.exports = Artist_Instance;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;

var Album_Instance = function (_React$Component) {
  _inherits(Album_Instance, _React$Component);

  function Album_Instance(props) {
    _classCallCheck(this, Album_Instance);

    var _this = _possibleConstructorReturn(this, (Album_Instance.__proto__ || Object.getPrototypeOf(Album_Instance)).call(this));

    _this.state = {
      album: null
    };
    return _this;
  }

  _createClass(Album_Instance, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateAlbum(this.state.album);
    }
  }, {
    key: 'updateAlbum',
    value: function updateAlbum(a) {
      var albumID = this.props.match.params.albumID;

      this.setState(function () {
        return {
          album: a
        };
      });

      api.getAlbum(albumID).then(function (a) {
        console.log(a);
        this.setState(function () {
          return {
            album: a
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(JSON.stringify(this.state.album));
      console.log(this.state.album);
      var album = this.state.album;

      if (!album) {
        return React.createElement(
          'p',
          null,
          'LOADING!'
        );
      } else {
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'h1',
            null,
            'Album: ',
            album.Title
          ),
          React.createElement('img', {
            className: 'img',
            src: album.Image,
            alt: 'Image for ' + album.Title }),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Release Date: ',
              album.Year
            ),
            React.createElement(
              'li',
              null,
              'Songs:',
              React.createElement(
                Link,
                { to: '/song-instance/' + album.Songs[0].SongID },
                album.Songs[0].Name
              )
            ),
            React.createElement(
              'li',
              null,
              'Artist:',
              React.createElement(
                Link,
                { to: '/artist-instance/' + album.ArtistID },
                album.artist.Name
              )
            )
          )
        );
      }
    }
  }]);

  return Album_Instance;
}(React.Component);

module.exports = Album_Instance;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;

var Tour_Instance = function (_React$Component) {
  _inherits(Tour_Instance, _React$Component);

  function Tour_Instance(props) {
    _classCallCheck(this, Tour_Instance);

    var _this = _possibleConstructorReturn(this, (Tour_Instance.__proto__ || Object.getPrototypeOf(Tour_Instance)).call(this));

    _this.state = {
      tour: null
    };
    return _this;
  }

  _createClass(Tour_Instance, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateTour(this.state.tour);
    }
  }, {
    key: 'updateTour',
    value: function updateTour(a) {
      var tourID = this.props.match.params.tourID;

      this.setState(function () {
        return {
          tour: a
        };
      });

      api.getTour(tourID).then(function (a) {
        console.log(a);
        this.setState(function () {
          return {
            tour: a
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(this.state.tour);
      var tour = this.state.tour;

      if (!tour) {
        return React.createElement(
          'p',
          null,
          'LOADING!'
        );
      } else {
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'h1',
            null,
            'Tour: ',
            tour.Name
          ),
          React.createElement('img', {
            className: 'img',
            src: tour.Image,
            alt: 'Image for ' + tour.Name }),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Line Up: ',
              tour.TourLineUp[0].Name
            ),
            React.createElement(
              'li',
              null,
              'Locations: ',
              tour.Locations
            ),
            React.createElement(
              'li',
              null,
              'Venue: ',
              tour.Venue
            ),
            React.createElement(
              'li',
              null,
              'Artist:',
              React.createElement(
                Link,
                { to: '/artist-instance/' + tour.ArtistID },
                tour.artist.Name
              )
            )
          )
        );
      }
    }
  }]);

  return Tour_Instance;
}(React.Component);

module.exports = Tour_Instance;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;

var Song_Instance = function (_React$Component) {
  _inherits(Song_Instance, _React$Component);

  function Song_Instance(props) {
    _classCallCheck(this, Song_Instance);

    var _this = _possibleConstructorReturn(this, (Song_Instance.__proto__ || Object.getPrototypeOf(Song_Instance)).call(this));

    _this.state = {
      song: null
    };
    return _this;
  }

  _createClass(Song_Instance, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSong(this.state.song);
    }
  }, {
    key: 'updateSong',
    value: function updateSong(a) {
      var songID = this.props.match.params.songID;

      this.setState(function () {
        return {
          song: a
        };
      });

      api.getSong(songID).then(function (a) {
        console.log(a);
        this.setState(function () {
          return {
            song: a
          };
        });
      }.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      console.log(JSON.stringify(this.state.song));
      console.log(this.state.song);
      var song = this.state.song;

      if (!song) {
        return React.createElement(
          'p',
          null,
          'LOADING!'
        );
      } else {
        return React.createElement(
          'div',
          { className: 'container' },
          React.createElement(
            'h1',
            null,
            'Song: ',
            song.Name
          ),
          React.createElement('img', {
            className: 'img',
            src: song.Image,
            alt: 'Image for ' + song.Title }),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Release Date: ',
              song.Creation_Date
            ),
            React.createElement(
              'li',
              null,
              'Run Time: ',
              song.Run_Time,
              ' seconds'
            ),
            React.createElement(
              'li',
              null,
              'Genre: ',
              song.SongGenre[0].Name
            ),
            React.createElement(
              'li',
              null,
              'Artist:',
              React.createElement(
                Link,
                { to: '/artist-instance/' + song.ArtistID },
                song.artist.Name
              )
            ),
            React.createElement(
              'li',
              null,
              'Album:',
              React.createElement(
                Link,
                { to: '/album-instance/' + song.AlbumID },
                song.album.Title
              )
            )
          )
        );
      }
    }
  }]);

  return Song_Instance;
}(React.Component);

module.exports = Song_Instance;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var Search = __webpack_require__(21);


function SearchPageTitle(props) {
  var title = "Search results for: '";
  for (var i = 0; i < props.searchString.length; i++) {
    title += props.searchString[i];
    if (i != props.searchString.length - 1) title += " ";
  }
  title += "'";
  return React.createElement(
    'h1',
    null,
    title
  );
}
SearchPageTitle.propTypes = {
  searchString: PropTypes.array.isRequired
};

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, (SearchResults.__proto__ || Object.getPrototypeOf(SearchResults)).call(this));

    _this.state = {
      searchString: null
    };
    _this.updateSearchString = _this.updateSearchString.bind(_this);
    return _this;
  }

  _createClass(SearchResults, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateSearchString(this.props.match.params.searchString.split(" "));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ searchString: nextProps.match.params.searchString.split(" ") }, function () {
        this.updateSearchString(this.state.searchString);
      });
    }
  }, {
    key: 'updateSearchString',
    value: function updateSearchString(searchString) {
      this.setState({ searchString: searchString });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(SearchPageTitle, { searchString: this.state.searchString }),
        React.createElement(
          _reactBootstrap.Tabs,
          { animation: true, bsStyle: 'pills', onSelect: this.handleTabSelect },
          React.createElement(
            _reactBootstrap.Tab,
            { unmountOnExit: true, eventKey: 1, title: 'Artists' },
            React.createElement('br', null),
            React.createElement(Search, { searchString: this.state.searchString,
              moduleType: "Artists" })
          ),
          React.createElement(
            _reactBootstrap.Tab,
            { unmountOnExit: true, eventKey: 2, title: 'Albums' },
            React.createElement('br', null),
            React.createElement(Search, { searchString: this.state.searchString,
              moduleType: "Albums" })
          ),
          React.createElement(
            _reactBootstrap.Tab,
            { unmountOnExit: true, eventKey: 3, title: 'Songs' },
            React.createElement('br', null),
            React.createElement(Search, { searchString: this.state.searchString,
              moduleType: "Songs" })
          ),
          React.createElement(
            _reactBootstrap.Tab,
            { unmountOnExit: true, eventKey: 4, title: 'Tours' },
            React.createElement('br', null),
            React.createElement(Search, { searchString: this.state.searchString,
              moduleType: "Tours" })
          )
        )
      );
    }
  }]);

  return SearchResults;
}(React.Component);

module.exports = SearchResults;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactBootstrap = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-bootstrap\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var api = __webpack_require__(0);
var PropTypes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"prop-types\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var Link = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react-router-dom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).Link;


var orderArtists = [{ 'field': 'Name', 'direction': 'asc' }];
var orderAlbums = [{ 'field': 'Title', 'direction': 'asc' }];

function ResultGrid(props) {
  if (props.module === "Albums") {
    return React.createElement(
      'ul',
      { className: 'data-list' },
      props.data.map(function (album) {
        return React.createElement(
          'li',
          { key: album.AlbumID, className: 'data-item' },
          React.createElement(
            'ul',
            { className: 'data-list-items' },
            React.createElement(
              Link,
              { to: '/album-instance/' + album.AlbumID },
              React.createElement(
                'li',
                null,
                React.createElement('img', {
                  className: 'img',
                  src: album.Image,
                  alt: 'Image for ' + album.Title })
              ),
              React.createElement(
                'li',
                null,
                album.Title
              )
            )
          )
        );
      })
    );
  } else if (props.module === "Artists") {
    return React.createElement(
      'ul',
      { className: 'data-list' },
      props.data.map(function (artist) {
        return React.createElement(
          'li',
          { key: artist.ArtistID, className: 'data-item' },
          React.createElement(
            'ul',
            { className: 'data-list-items' },
            React.createElement(
              Link,
              { to: '/artist-instance/' + artist.ArtistID },
              React.createElement(
                'li',
                null,
                React.createElement('img', {
                  className: 'img',
                  src: artist.Image,
                  alt: 'Image for ' + artist.Name })
              ),
              React.createElement(
                'li',
                null,
                artist.Name
              )
            )
          )
        );
      })
    );
  } else if (props.module === "Songs") {
    return React.createElement(
      'ul',
      { className: 'data-list' },
      props.data.map(function (song) {
        return React.createElement(
          'li',
          { key: song.SongID, className: 'data-item' },
          React.createElement(
            'ul',
            { className: 'data-list-items' },
            React.createElement(
              Link,
              { to: '/song-instance/' + song.SongID },
              React.createElement(
                'li',
                null,
                React.createElement('img', {
                  className: 'img',
                  src: song.Image,
                  alt: 'Image for ' + song.Name })
              ),
              React.createElement(
                'li',
                null,
                song.Name
              )
            )
          )
        );
      })
    );
  } else if (props.module === "Tours") {
    return React.createElement(
      'ul',
      { className: 'data-list' },
      props.data.map(function (tour) {
        return React.createElement(
          'li',
          { key: tour.TourID, className: 'data-item' },
          React.createElement(
            'ul',
            { className: 'data-list-items' },
            React.createElement(
              Link,
              { to: '/tour-instance/' + tour.TourID },
              React.createElement(
                'li',
                null,
                React.createElement('img', {
                  className: 'img',
                  src: tour.Image,
                  alt: 'Image for ' + tour.Name })
              ),
              React.createElement(
                'li',
                null,
                tour.Name
              )
            )
          )
        );
      })
    );
  }
}
ResultGrid.propTypes = {
  data: PropTypes.array.isRequired,
  module: PropTypes.string.isRequired
};

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

    _this.state = {
      searchResults: null,
      activePage: 1,
      numPages: 0
    };
    _this.updateSearchResults = _this.updateSearchResults.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateSearchResults(null);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.searchString != this.props.searchString) {
        this.props = newProps;
        this.updateSearchResults(null);
      }
    }
  }, {
    key: 'updateSearchResults',
    value: function updateSearchResults(searchResults) {
      var filter;
      var searchString = this.props.searchString;

      this.setState(function () {
        return {
          searchResults: searchResults
        };
      });
      if (this.props.moduleType == "Artists") {
        filter = [{ "or": [{ 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'ArtistGenre', 'op': 'any', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }, { 'name': 'Albums', 'op': 'any', 'val': { 'name': 'Title', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }, { 'name': 'Songs', 'op': 'any', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }] }];
        api.getArtists(this.state.activePage, filter, orderArtists).then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            };
          });
        }.bind(this));
      } else if (this.props.moduleType == "Albums") {
        filter = [{ "or": [{ 'name': 'Title', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'artist', 'op': 'has', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }, { 'name': 'Songs', 'op': 'any', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }] }];
        api.getAlbums(this.state.activePage, filter, orderAlbums).then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            };
          });
        }.bind(this));
      } else if (this.props.moduleType == "Songs") {
        filter = [{ "or": [{ 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'SongGenre', 'op': 'any', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }, { 'name': 'album', 'op': 'has', 'val': { 'name': 'Title', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }, { 'name': 'artist', 'op': 'has', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }] }];
        api.getSongs(this.state.activePage, filter, orderArtists).then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            };
          });
        }.bind(this));
      } else if (this.props.moduleType == "Tours") {
        filter = [{ "or": [{ 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'Venue', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'Locations', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'tDate', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" }, { 'name': 'artist', 'op': 'has', 'val': { 'name': 'Name', 'op': 'ilike', 'val': "%" + this.props.searchString[0] + "%" } }] }];
        api.getTours(this.state.activePage, filter, orderArtists).then(function (data) {
          this.setState(function () {
            return {
              searchResults: data.objects,
              numPages: data.total_pages
            };
          });
        }.bind(this));
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(eventKey) {
      console.log("SS: handlePageSelect");
      this.setState({ activePage: eventKey }, function () {
        this.updateSearchResults(null);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        !this.state.searchResults ? React.createElement(
          'p',
          null,
          'LOADING'
        ) : React.createElement(ResultGrid, { data: this.state.searchResults,
          module: this.props.moduleType }),
        React.createElement(_reactBootstrap.Pagination, {
          prev: true,
          next: true,
          first: true,
          last: true,
          ellipsis: true,
          boundaryLinks: true,
          items: this.state.numPages,
          maxButtons: 5,
          activePage: this.state.activePage,
          onSelect: this.handleSelect })
      );
    }
  }]);

  return Search;
}(React.Component);

module.exports = Search;

/***/ })
/******/ ]);