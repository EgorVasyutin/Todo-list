/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
/***/ (() => {

eval("var modal = $.modal();\r\nvar buttonYes = document.querySelector(\".modal__button--yes\");\r\nvar buttonNo = document.querySelector(\".modal__button--no\");\r\nvar buttonClose = document.querySelector(\".modal__close\");\r\nvar closeModalWindow = function () {\r\n    modal.close();\r\n};\r\nbuttonYes.addEventListener(\"click\", closeModalWindow);\r\nbuttonNo.addEventListener(\"click\", closeModalWindow);\r\nbuttonClose.addEventListener(\"click\", closeModalWindow);\r\n\n\n//# sourceURL=webpack:///./main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./main.ts"]();
/******/ 	
/******/ })()
;