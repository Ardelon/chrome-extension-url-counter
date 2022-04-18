/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/popup.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/popup.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".list-container-holder {\n  position: relative;\n  margin: auto;\n  display: flex;\n  width: 1000px;\n}\n\n.list-container-go-left-button {\n  position: absolute;\n  top: 50%;\n  left: 5%;\n  transform: translate(-50%, -50%);\n  width: 60px;\n  height: 60px;\n  border-radius: 250px;\n  background-color: #fafafa;\n}\n.list-container-go-left-button:hover {\n  cursor: pointer;\n}\n\n.list-container-go-right-button {\n  position: absolute;\n  top: 50%;\n  right: calc(5% - 60px);\n  transform: translate(-50%, -50%) rotate(180deg);\n  width: 60px;\n  height: 60px;\n  border-radius: 250px;\n  background-color: #fafafa;\n}\n.list-container-go-right-button:hover {\n  cursor: pointer;\n}\n\n.upper-line {\n  position: absolute;\n  width: 30px;\n  border: 2px solid black;\n  transform: rotate(-45deg);\n  background-color: black;\n  top: 29%;\n  left: 10%;\n}\n\n.lower-line {\n  position: absolute;\n  width: 30px;\n  border: 2px solid black;\n  transform: rotate(45deg);\n  background-color: black;\n  bottom: 29%;\n  left: 10%;\n}\n\n.list-container-belt {\n  width: 740px;\n  height: 760px;\n  margin: auto;\n  display: flex;\n  align-items: baseline;\n  overflow-x: auto;\n  overflow-y: auto;\n  flex-direction: row;\n}\n\n.list-container-belt::-webkit-scrollbar {\n  display: none;\n}\n\n.belt-element {\n  flex-shrink: 0;\n  position: relative;\n  height: 700px;\n  width: 320px;\n  justify-content: center;\n  align-items: center;\n  margin: 25px;\n  display: block;\n  float: left;\n  box-sizing: border-box;\n  overflow-x: auto;\n  border: 1px solid #fafafa;\n  border-radius: 6px;\n}\n\n.belt-element::-webkit-scrollbar {\n  display: none;\n}\n\n.belt-header {\n  text-align: center;\n}\n\n.belt-host-list-container {\n  height: 400px;\n  width: 270px;\n  overflow-x: auto;\n  /* background-color: #fafafa; */\n  border-radius: 6px;\n  margin: auto;\n  border: 1px solid #fafafa;\n}\n\n.belt-host-list-container::-webkit-scrollbar {\n  display: none;\n}\n\n.counter-container {\n  display: flex;\n}\n\n.count-indicator {\n  font-size: 17px;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  margin: auto;\n  width: 150px;\n}\n\n.delete-buttons-container {\n  height: 60px;\n  align-items: center;\n  justify-content: center;\n  display: flex;\n}\n\n.delete-button {\n  border: 2px solid #316e7d;\n  box-sizing: border-box;\n  color: #fafafa;\n  font-size: 16px;\n  text-align: center;\n  margin: auto;\n  background-color: #316e7d;\n  width: 140px;\n  border-radius: 6px;\n}\n\n.delete-button:hover {\n  cursor: pointer;\n  background-color: #51c1dd;\n}\n\n.switch {\n  position: absolute;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.switch input {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\ninput:checked + .slider {\n  background-color: #316e7d;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #316e7d;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  -ms-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n.flamio {\n  color: #e96c4c;\n}\n\nbody {\n  background-color: #141e24;\n  color: #e96c4c;\n  font-weight: bold;\n  border: 2px solid white;\n  margin: 0;\n  padding: 8px;\n  /* font-family :'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */\n}\n\n/* hsl(14.7,87.72%,55.29%);  */\n/* hsl(33.94,81.82%,52.55%) */\n.list-container {\n  height: 400px;\n  width: 300px;\n  overflow-x: auto;\n  /* background-color: #316e7d; */\n  border-top: 2px solid #316e7d;\n  /* border-radius: 6px; */\n  border-bottom: 2px solid #316e7d;\n  margin: 6px;\n}\n\n.date-info {\n  font-size: 26px;\n  text-align: center;\n  margin: 3px;\n}\n\n.count-indicator {\n  font-size: 17px;\n  text-align: center;\n  justify-content: center;\n  align-items: center;\n  margin: auto;\n  display: flex;\n  width: 150px;\n  display: inline-block;\n}\n\n/* .tab-count {\n    font-size: 16px;\n    text-align: center;\n    margin:3px;\n}\n\n.total-visit {\n    font-size: 16px;\n    text-align: center;\n    margin:3px;\n    color: #e96c4c;\n} */\n.tab-count-button {\n  width: 250px;\n  margin: 10px;\n}\n\n.list-element {\n  width: 250px;\n  height: 50px;\n  margin: 5px auto;\n  /* background-color: #316e7d; */\n  display: block;\n  position: relative;\n  border-radius: 5px;\n}\n\n.list-element:hover {\n  background-color: #316e7d;\n  cursor: pointer;\n}\n\n.list-container::-webkit-scrollbar {\n  display: none;\n  /* for Chrome, Safari, and Opera */\n}\n\n.logo {\n  position: absolute;\n  width: 40px;\n  top: 50%;\n  transform: translate(15%, -50%);\n  cursor: pointer;\n}\n\n.header {\n  transform: translate(10px, 10px);\n  width: 150px;\n  margin: auto;\n  color: #fafafa;\n  font-weight: bold;\n  cursor: pointer;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.visitDisplay {\n  position: absolute;\n  right: 5%;\n  top: -15%;\n  font-size: 20px;\n  color: #fafafa;\n}\n\nfooter {\n  align-items: stretch;\n  display: flex;\n  flex: none;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.footer-buttons {\n  align-items: stretch;\n  display: flex;\n  flex-direction: row;\n  justify-content: stretch;\n  width: 100%;\n  border: 2px solid #316e7d;\n  box-sizing: border-box;\n  color: white;\n  font-size: 16px;\n  align-items: center;\n  justify-content: center;\n  margin: 2px;\n  background-color: #316e7d;\n}\n\n.footer-buttons:hover {\n  background-color: #51c1dd;\n  cursor: pointer;\n}\n\n.this-site-will-not-be-saved {\n  background-color: #51c1dd;\n}", "",{"version":3,"sources":["webpack://./src/style/listContainer.scss","webpack://./src/style/popup.scss","webpack://./src/style/switchButton.scss"],"names":[],"mappings":"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","sourcesContent":[".list-container-holder {\r\n    position: relative;\r\n    margin: auto;\r\n    display: flex;\r\n    width: 1000px;\r\n}\r\n\r\n.list-container-go-left-button {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 5%;\r\n    transform: translate(-50%, -50%);\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 250px;\r\n    background-color: #fafafa;\r\n\r\n    &:hover {\r\n        cursor: pointer;\r\n    }\r\n}\r\n\r\n\r\n.list-container-go-right-button {\r\n    position: absolute;\r\n    top: 50%;\r\n    right: calc(5% - 60px);\r\n    transform: translate(-50%, -50%) rotate(180deg);\r\n    width: 60px;\r\n    height: 60px;\r\n    border-radius: 250px;\r\n    background-color: #fafafa;\r\n\r\n    &:hover {\r\n        cursor: pointer;\r\n    }\r\n}\r\n\r\n.upper-line {\r\n    position: absolute;\r\n    width: 30px;\r\n    border: 2px solid black;\r\n    transform: rotate(-45deg);\r\n    background-color: black;\r\n    top: 29%;\r\n    left: 10%;\r\n\r\n}\r\n\r\n.lower-line {\r\n    position: absolute;\r\n    width: 30px;\r\n    border : 2px solid black;\r\n    transform: rotate(45deg);\r\n    background-color: black;\r\n    bottom : 29%;\r\n    left: 10%;\r\n}\r\n\r\n.list-container-belt {\r\n    width: 740px;\r\n    height: 760px;\r\n    margin: auto;\r\n    display: flex;\r\n    // border: 2px solid black;\r\n    align-items: baseline;\r\n    overflow-x: auto;\r\n    overflow-y: auto;\r\n    flex-direction: row;\r\n}\r\n\r\n.list-container-belt::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.belt-element {\r\n\r\n    flex-shrink: 0;\r\n    position: relative;\r\n    height: 700px;\r\n    width: 320px;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 25px;\r\n    display: block;\r\n    float: left;\r\n    box-sizing: border-box;\r\n    overflow-x: auto;\r\n    border: 1px solid #fafafa;\r\n    border-radius: 6px;\r\n\r\n}\r\n\r\n.belt-element::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.belt-header {\r\n    text-align: center;\r\n}\r\n\r\n.belt-host-list-container {\r\n    height: 400px;\r\n    width: 270px;\r\n    overflow-x: auto;\r\n    /* background-color: #fafafa; */\r\n    border-radius: 6px;\r\n    margin : auto;\r\n    border: 1px solid #fafafa;\r\n}\r\n\r\n.belt-host-list-container::-webkit-scrollbar {\r\n    display: none;\r\n}\r\n\r\n.counter-container {\r\n    display: flex;\r\n}\r\n\r\n.count-indicator {\r\n    font-size: 17px;\r\n    text-align: center;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: auto;\r\n    width: 150px;\r\n}\r\n\r\n.delete-buttons-container {\r\n    height: 60px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    display: flex;\r\n}\r\n\r\n.delete-button {\r\n    border: 2px solid rgb(49, 110, 125);\r\n    box-sizing: border-box;\r\n    color: #fafafa;\r\n    font-size: 16px;\r\n    text-align: center;\r\n    margin: auto;\r\n    background-color: #316e7d;\r\n    width: 140px;\r\n    border-radius: 6px;\r\n\r\n}\r\n\r\n.delete-button:hover{\r\n    cursor: pointer;\r\n    background-color: #51c1dd;\r\n}","@import 'listContainer';\r\n@import 'switchButton';\r\nbody {\r\n    background-color: #141e24;\r\n    color: #e96c4c;\r\n    font-weight: bold;\r\n\r\n    border: 2px solid white;\r\n    margin : 0;\r\n    padding: 8px;\r\n\r\n    /* font-family :'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */\r\n}\r\n/* hsl(14.7,87.72%,55.29%);  */\r\n/* hsl(33.94,81.82%,52.55%) */\r\n\r\n.list-container {\r\n    height: 400px;\r\n    width: 300px;\r\n    overflow-x: auto;\r\n    /* background-color: #316e7d; */\r\n    border-top : 2px solid #316e7d;\r\n    /* border-radius: 6px; */\r\n    border-bottom : 2px solid #316e7d;\r\n    margin : 6px;\r\n    \r\n}\r\n\r\n.date-info {\r\n    font-size: 26px;\r\n    text-align: center;\r\n    margin:3px;\r\n}\r\n\r\n\r\n.count-indicator {\r\n    font-size: 17px;\r\n    text-align: center;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: auto;\r\n    display: flex;\r\n    width: 150px;\r\n    display: inline-block;\r\n}\r\n/* .tab-count {\r\n    font-size: 16px;\r\n    text-align: center;\r\n    margin:3px;\r\n}\r\n\r\n.total-visit {\r\n    font-size: 16px;\r\n    text-align: center;\r\n    margin:3px;\r\n    color: #e96c4c;\r\n} */\r\n\r\n.tab-count-button {\r\n    width: 250px;\r\n    margin: 10px;\r\n}\r\n\r\n.list-element {\r\n    width: 250px;\r\n    height: 50px;\r\n    margin: 5px auto;\r\n    /* background-color: #316e7d; */\r\n    display: block;\r\n    position: relative;\r\n    border-radius: 5px;\r\n    \r\n}\r\n\r\n.list-element:hover {\r\n    background-color: #316e7d;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n\r\n.list-container::-webkit-scrollbar {\r\n    display: none; /* for Chrome, Safari, and Opera */\r\n}\r\n\r\n.logo {\r\n    position: absolute;\r\n    width: 40px;\r\n    top: 50%;\r\n    transform: translate(15%, -50%);\r\n        cursor: pointer;\r\n  \r\n}\r\n\r\n.header {\r\n    transform: translate(10px, 10px);\r\n    width: 150px;\r\n    margin: auto;\r\n    color:#fafafa;\r\n    font-weight: bold;\r\n    cursor: pointer;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n}\r\n\r\n.visitDisplay {\r\n    position: absolute;\r\n    right: 5%;\r\n    top: -15%;\r\n    font-size: 20px;\r\n    color: #fafafa;\r\n}\r\n\r\nfooter {\r\n\r\n    align-items: stretch;\r\n    display: flex;\r\n    flex: none;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n}\r\n\r\n.footer-buttons {\r\n    align-items: stretch;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: stretch;\r\n    width: 100%;\r\n    border: 2px solid #316e7d;\r\n    box-sizing: border-box;\r\n    color: white;\r\n    font-size: 16px;\r\n    align-items: center;\r\n    justify-content: center;\r\n    margin: 2px;\r\n    background-color: #316e7d;\r\n}\r\n\r\n.footer-buttons:hover {\r\n    background-color: #51c1dd;\r\n    cursor: pointer;\r\n}\r\n\r\n.this-site-will-not-be-saved {\r\n    background-color: #51c1dd;\r\n}\r\n\r\n\r\n\r\n\r\n",".switch {\r\n  position: absolute;\r\n  display: inline-block;\r\n  width: 60px;\r\n  height: 34px;\r\n  top : 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  \r\n}\r\n\r\n.switch input { \r\n  opacity: 0;\r\n  width: 0;\r\n  height: 0;\r\n}\r\n\r\n.slider {\r\n  position: absolute;\r\n  cursor: pointer;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: #ccc;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\n.slider:before {\r\n  position: absolute;\r\n  content: \"\";\r\n  height: 26px;\r\n  width: 26px;\r\n  left: 4px;\r\n  bottom: 4px;\r\n  background-color: white;\r\n  -webkit-transition: .4s;\r\n  transition: .4s;\r\n}\r\n\r\ninput:checked + .slider {\r\n  background-color: #316e7d;\r\n}\r\n\r\ninput:focus + .slider {\r\n  box-shadow: 0 0 1px #316e7d;\r\n}\r\n\r\ninput:checked + .slider:before {\r\n  -webkit-transform: translateX(26px);\r\n  -ms-transform: translateX(26px);\r\n  transform: translateX(26px);\r\n}\r\n\r\n/* Rounded sliders */\r\n.slider.round {\r\n  border-radius: 34px;\r\n}\r\n\r\n.slider.round:before {\r\n  border-radius: 50%;\r\n}\r\n\r\n.flamio {\r\n  color: #e96c4c ;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/popup.scss":
/*!******************************!*\
  !*** ./src/style/popup.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_popup_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./popup.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/popup.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_popup_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_popup_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_popup_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_popup_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/js/manageInfo.js":
/*!******************************!*\
  !*** ./src/js/manageInfo.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateListElement": () => (/* binding */ generateListElement),
/* harmony export */   "prepareData": () => (/* binding */ prepareData),
/* harmony export */   "generateSortForVisitCount": () => (/* binding */ generateSortForVisitCount),
/* harmony export */   "clearElements": () => (/* binding */ clearElements),
/* harmony export */   "goToSiteEventHandler": () => (/* binding */ goToSiteEventHandler),
/* harmony export */   "removeDeletedElement": () => (/* binding */ removeDeletedElement),
/* harmony export */   "clearDomainData": () => (/* binding */ clearDomainData),
/* harmony export */   "clearAllData": () => (/* binding */ clearAllData),
/* harmony export */   "getBlackList": () => (/* binding */ getBlackList),
/* harmony export */   "setBlackList": () => (/* binding */ setBlackList),
/* harmony export */   "getStoredDays": () => (/* binding */ getStoredDays),
/* harmony export */   "addStoredDays": () => (/* binding */ addStoredDays)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/js/utilities.js");

//#region Prepare and Serve Operations

const generateListElement = async (parent, hostName, visitCount, logo, dataDate, updateTabCount ) => {

    const element = document.createElement("div");
    const blockage = document.createElement("div");
    const logoDisplay = document.createElement("img");
    const header =  document.createElement("h4");
    const visitDisplay =  document.createElement("p");



    element.classList.add("list-element");
    blockage.classList.add("blockage", "hide");
    logoDisplay.classList.add("logo");
    header.classList.add("header");
    visitDisplay.classList.add("visitDisplay")

    if (logo.split("extension://").length > 1) {
        logo = "../images/notFound.png"
    }
    logoDisplay.src = logo
    header.innerText = hostName//`${hostName.substring(0,25)}`;

    visitDisplay.innerText = visitCount;

    blockage.addEventListener('click', async (e) => {
        e.preventDefault();
        await removeDeletedElement(element, hostName, dataDate);
        await clearDomainData(dataDate, hostName);
        updateTabCount(dataDate)

        blockage.removeEventListener('click', (e) => {
            e.preventDefault();
      
        })
    })

    header.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    })

    logoDisplay.addEventListener('click', (e) => {
        e.preventDefault()
        goToSiteEventHandler(hostName);
    });

    element.appendChild(blockage);
    element.appendChild(logoDisplay);
    element.appendChild(header);
    element.appendChild(visitDisplay);

    parent.appendChild(element);

}

const prepareData = async (hostList) => {
    // const hostList = await chrome.storage.local.get("hostList");
    let uniqueHostNameList = [];
    let sortByNameList = []
    const hostInformationObject = {};
    let totalVisit = 0
    if (hostList) {
        totalVisit = hostList.length
        
        hostList.forEach(host => {
            if (!uniqueHostNameList.includes(host.siteName)) {
                uniqueHostNameList.push(host.siteName);
                sortByNameList.push(host.siteName)
                hostInformationObject[host.siteName] = {
                    visitCount : 1,
                    logo : host.favIcon || "../images/notFound.png"
                }
            } else {
                hostInformationObject[host.siteName].visitCount++
                if (host.favIcon !== "../images/notFound.png") {
                    hostInformationObject[host.siteName].logo = host.favIcon;
                }
                
            }
        });   
    }
    sortByNameList.sort();
    const sortByVisitCount = generateSortForVisitCount(hostInformationObject);

    return [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ]


}

const generateSortForVisitCount = (object) => {

    const keys = Object.keys(object);
    const sortingKeyList = [];
    const sortedList = [];

    keys.forEach(key => {
        const visitCount = object[key].visitCount
        const sortingKey = `${'0'.repeat(6-String(visitCount).length)}${visitCount}+${key}`
        sortingKeyList.push(sortingKey)        
    });
    sortingKeyList.sort();
    sortingKeyList.reverse();

    sortingKeyList.forEach(key => {
        sortedList.push(key.split("+")[1]);
    })
    return sortedList

};

const clearElements = (element) => {
    element.innerHTML = "";
}

const goToSiteEventHandler = (hostName) => {
    window.open(`https://${hostName}`, "_blank");
}

const removeDeletedElement = async (element, hostName, dataDate) => {
    
    element.remove();
}

//#endregion

//#region Delete Operations

const clearDomainData = async (date, hostName) => {

    const storedDays = await getStoredDays();

    if (storedDays.storedDays) {
        storedDays.storedDays.forEach((storedDay, index) => {
            if (storedDay.day === date) {
                const newHostList = [];
                storedDay.hostList.forEach(element =>{
                    if (element.hostName !== hostName) {
                        newHostList.push(element);
                    }
                });
                storedDay.hostList = newHostList;                
            }
        });
        chrome.storage.local.set({"storedDays" : storedDays.storedDays});
    }

}

const clearAllData = async (dayDate) => {

    const storedDays = await getStoredDays();
    const storedDayIndex = storedDays.storedDays.findIndex((element) => element.day === dayDate);

    storedDays.storedDays.splice(storedDayIndex,1);
    await chrome.storage.local.set({"storedDays" : storedDays.storedDays});

}
//#endregion

//#region Storage Operations

const getBlackList = async () => {
    const blackList = await chrome.storage.local.get("blackList");

    if (!blackList || !blackList.blackList) {
        chrome.storage.local.set({"blackList" : []});
    } 

    return blackList || []
}

const setBlackList = async (urlPiece, operation = "add") => {

    const blackList = await chrome.storage.local.get("blackList");
    
    if (!blackList || !blackList.blackList) {
        chrome.storage.local.set({"blackList" : [urlPiece]});
    } else {
        if (!blackList.blackList.includes(urlPiece) && operation === "add") {
            blackList.blackList.push(urlPiece);
            const filteredBlackList = blackList.blackList.filter(_utilities__WEBPACK_IMPORTED_MODULE_0__.onlyUnique);
            blackList.blackList = filteredBlackList
            chrome.storage.local.set({"blackList" : blackList.blackList});   
        } else if (blackList.blackList.includes(urlPiece) && operation === "remove") {
            for( let i = 0; i < blackList.blackList.length; i++){ 
    
                if ( blackList.blackList[i] === urlPiece) { 
            
                    blackList.blackList.splice(i, 1); 
                }
            
            }
            chrome.storage.local.set({"blackList" : blackList.blackList});   
        }
    }
}   

const getStoredDays = async () => {
    const storedDays = await chrome.storage.local.get("storedDays");

    if (!storedDays || !storedDays.storedDays) {
        chrome.storage.local.set({"storedDays" : []});
    }

    return storedDays || [];
}

const addStoredDays = async (day) => {
    const storedDays = await getStoredDays();
    
    if (storedDays && storedDays.storedDays) {
        if (storedDays.storedDays.length < 31) {
            storedDays.storedDays.push(day);
            chrome.storage.local.set({"storedDays" : storedDays.storedDays})
        } else {
            storedDays.storedDays.shift();
            storedDays.storedDays.push(day);
            chrome.storage.local.set({"storedDays" : storedDays.storedDays})
        }
    } else {
        chrome.storage.local.set({"storedDays" : [storedDays.storedDays]})
    }
}

//#endregion

/***/ }),

/***/ "./src/js/manageOptions.js":
/*!*********************************!*\
  !*** ./src/js/manageOptions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSortingOptions": () => (/* binding */ getSortingOptions),
/* harmony export */   "setSortingOptions": () => (/* binding */ setSortingOptions)
/* harmony export */ });
const getSortingOptions = async () => {
    
    const options = await chrome.storage.local.get("options");
    if (options.options) {

        const sortBy = options.options.sortBy;
        return sortBy || 'sortByName'
    } else {
        return 'sortByName';
    }
}

const setSortingOptions = async (sortValue) => {
    const options = await chrome.storage.local.get("options")

    if (options && options.options) {
        options.options.sortBy = sortValue;
        chrome.storage.local.set({"options" : options.options})
    } else {
        chrome.storage.local.set({"options" : {sortBy : 'sortByName'}})
    }
}

/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openInNewTab": () => (/* binding */ openInNewTab),
/* harmony export */   "scrapeInformationFromUrl": () => (/* binding */ scrapeInformationFromUrl),
/* harmony export */   "onlyUnique": () => (/* binding */ onlyUnique),
/* harmony export */   "exportFormat": () => (/* binding */ exportFormat)
/* harmony export */ });
/* harmony import */ var _manageInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manageInfo */ "./src/js/manageInfo.js");


const openInNewTab = (url) => {
    window.open(url, '_blank').focus();
}

const scrapeInformationFromUrl = (fullUrl) => {
    const url = new URL(fullUrl);
    return [fullUrl, url.protocol, url.hostname, url.pathname, url.search]
};

const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
    // Use with filter to make an array unique

    // var a = ['a', 1, 'a', 2, '1'];
    // var unique = a.filter(onlyUnique);
}

const exportFormat = async (format) => {
    const storedDays = await (0,_manageInfo__WEBPACK_IMPORTED_MODULE_0__.getStoredDays)();


    if (format === "json") {

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
        var a = document.createElement('a');
        a.setAttribute("href",     dataStr     );
        a.setAttribute("download", "scene.json");
        a.click();

    }

    // if (format === "csv") {

    //     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
    //     var a = document.createElement('a');
    //     a.setAttribute("href",     dataStr     );
    //     a.setAttribute("download", "scene.json");
    //     a.click();

    // }

    // if (format === "excel") {

    //     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storedDays));
    //     var a = document.createElement('a');
    //     a.setAttribute("href",     dataStr     );
    //     a.setAttribute("download", "scene.json");
    //     a.click();

    // }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/popup.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_popup_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/popup.scss */ "./src/style/popup.scss");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./src/js/utilities.js");
/* harmony import */ var _manageOptions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manageOptions */ "./src/js/manageOptions.js");
/* harmony import */ var _manageInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manageInfo */ "./src/js/manageInfo.js");







// let tabCountButton = document.getElementById("tab-count-button");
let tabCountDiv = document.getElementById("tab-count");
let listContainer = document.getElementById("list-container");
let totalVisitDisplay = document.getElementById("total-visit");
const optionsPageButton = document.getElementById("options-page-button");
const githubPageButton = document.getElementById("github-page-button");

const dontSaveButton = document.getElementById("dont-save-button");


const getTabCount = async () => {
    return await chrome.storage.local.get("tabCount");
}



const eventHandler = async () => {
    const hostList = await chrome.storage.local.get("hostList");
    const tabCount = await getTabCount();
    const hostList1 = hostList.hostList
    const data = await (0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.prepareData)(hostList1);
    (0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.clearElements)(listContainer);
    const [uniqueHostNameList, hostInformationObject, totalVisit, sortByVisitCount, sortByNameList ] = data
    tabCountDiv.innerHTML = `<p>Tab Count : ${tabCount.tabCount || 0}</p>`;

    const sortingOption = await (0,_manageOptions__WEBPACK_IMPORTED_MODULE_2__.getSortingOptions)();

    if (sortingOption === 'sortByName') {
    
        sortByNameList.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            ;(0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.generateListElement)(listContainer, hostName, visitCount, logo)

        });

    } else {
    
        sortByVisitCount.forEach(hostName => {
            const visitCount = hostInformationObject[hostName].visitCount;
            const logo =  hostInformationObject[hostName].logo
            ;(0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.generateListElement)(listContainer, hostName, visitCount, logo)
    
        });
    
    } 
    totalVisitDisplay.innerHTML = `<p>Total Visit : ${totalVisit}</p>` ;


}

const openOptionsPageEvent = () => {

    
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
}





const prepareDontSaveButton = async () => {
    const currentTab = await chrome.tabs.query({"active" : true, "currentWindow" : true})
    const url  = currentTab[0].url
    const [, , hostName ] = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.scrapeInformationFromUrl)(url);
    const blackList = await (0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.getBlackList)();
    

    if (blackList.blackList && blackList.blackList.includes(hostName)) {
        dontSaveButton.classList.add("this-site-will-not-be-saved")
    }
    

    dontSaveButton.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (dontSaveButton.classList.contains("this-site-will-not-be-saved")) {
            (0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.setBlackList)(hostName, "remove")
        } else {
            (0,_manageInfo__WEBPACK_IMPORTED_MODULE_3__.setBlackList)(hostName)
        }
        
        dontSaveButton.classList.toggle("this-site-will-not-be-saved");
    
        dontSaveButton.removeEventListener('click', async (e) => {
            e.preventDefault();
        });
        
    });
}

eventHandler();
prepareDontSaveButton();

optionsPageButton.addEventListener('click', (e) => {
    e.preventDefault();
    openOptionsPageEvent()
    optionsPageButton.removeEventListener('click', (e) => {
        e.preventDefault();
        openOptionsPageEvent();
    })
});

githubPageButton.addEventListener('click', (e => {
    e.preventDefault();
    (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.openInNewTab)("https://github.com/Ardelon/chrome-extension-url-counter")
}));

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map