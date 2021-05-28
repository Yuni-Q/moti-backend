/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ CustomDocument; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"../../node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-helmet */ \"react-helmet\");\n/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_log__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/log */ \"./utils/log.ts\");\n\n\nvar _jsxFileName = \"/Users/yuni/dev/dev/yuni/moti-backend/src/front/pages/_document.tsx\";\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nclass CustomDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n  static async getInitialProps(context) {\n    const sheet = new styled_components__WEBPACK_IMPORTED_MODULE_4__.ServerStyleSheet();\n    const originalRenderPage = context.renderPage;\n\n    try {\n      context.renderPage = () => originalRenderPage({\n        enhanceApp: App => props => sheet.collectStyles( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, _objectSpread({}, props), void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 33,\n          columnNumber: 33\n        }, this))\n      });\n\n      const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(context);\n      const page = context.renderPage(App => props => sheet.collectStyles( /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(App, _objectSpread({}, props), void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 37,\n        columnNumber: 29\n      }, this)));\n\n      const styles = /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n          href: \"/reset.css\",\n          rel: \"stylesheet\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 41,\n          columnNumber: 11\n        }, this), initialProps.styles, sheet.getStyleElement()]\n      }, void 0, true);\n\n      return _objectSpread(_objectSpread(_objectSpread({}, initialProps), page), {}, {\n        styles,\n        helmet: react_helmet__WEBPACK_IMPORTED_MODULE_3___default().renderStatic()\n      });\n    } catch (error) {\n      (0,_utils_log__WEBPACK_IMPORTED_MODULE_5__.consoleError)('CustomDocument Error', error);\n      throw new Error('CustomDocument Error');\n    } finally {\n      sheet.seal();\n    }\n  }\n\n  render() {\n    const _this$props$helmet = this.props.helmet,\n          {\n      htmlAttributes,\n      bodyAttributes\n    } = _this$props$helmet,\n          helmet = _objectWithoutProperties(_this$props$helmet, [\"htmlAttributes\", \"bodyAttributes\"]);\n\n    const htmlAttrs = htmlAttributes.toComponent();\n    const bodyAttrs = bodyAttributes.toComponent();\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, _objectSpread(_objectSpread({\n      lang: \"en\",\n      dir: \"ltr\"\n    }, htmlAttrs), {}, {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n        children: [this.props.styles, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          charSet: \"utf-8\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 70,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          httpEquiv: \"x-ua-compatible\",\n          content: \"ie=edge\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 71,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          name: \"description\",\n          content: \"yuni-q\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 72,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:type\",\n          content: \"website\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 73,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:url\",\n          content: \"http://localhost:8000/\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 74,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:title\",\n          content: \"yuni-q\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 75,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:image\",\n          content: \"/favicon.png\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 76,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:description\",\n          content: \"yuni-q\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 77,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:site_name\",\n          content: \"yuni-q\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 78,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          property: \"og:locale\",\n          content: \"ko-KO\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 79,\n          columnNumber: 11\n        }, this), Object.values(helmet).map(el => el.toComponent()), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n          rel: \"manifest\",\n          href: \"/manifest.json\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 81,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n          rel: \"shorcut icon\",\n          href: \"/favicon.png\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 82,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          name: \"theme-color\",\n          content: \"black\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 83,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          name: \"apple-mobile-web-app-capable\",\n          content: \"yes\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 86,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          name: \"apple-mobile-web-app-status-bar-style\",\n          content: \"black\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 87,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n          name: \"apple-mobile-web-app-title\",\n          content: \"MOTI\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 88,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n          rel: \"apple-touch-icon\",\n          href: \"/favicon.png\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 89,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 67,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", _objectSpread(_objectSpread({}, bodyAttrs), {}, {\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 92,\n          columnNumber: 11\n        }, this),  false && /*#__PURE__*/0, /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 99,\n          columnNumber: 11\n        }, this)]\n      }), void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 9\n      }, this)]\n    }), void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 7\n    }, this);\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fZG9jdW1lbnQudHN4PzYzYjYiXSwibmFtZXMiOlsiQ3VzdG9tRG9jdW1lbnQiLCJEb2N1bWVudCIsImdldEluaXRpYWxQcm9wcyIsImNvbnRleHQiLCJzaGVldCIsIlNlcnZlclN0eWxlU2hlZXQiLCJvcmlnaW5hbFJlbmRlclBhZ2UiLCJyZW5kZXJQYWdlIiwiZW5oYW5jZUFwcCIsIkFwcCIsInByb3BzIiwiY29sbGVjdFN0eWxlcyIsImluaXRpYWxQcm9wcyIsInBhZ2UiLCJzdHlsZXMiLCJnZXRTdHlsZUVsZW1lbnQiLCJoZWxtZXQiLCJIZWxtZXQiLCJlcnJvciIsImNvbnNvbGVFcnJvciIsIkVycm9yIiwic2VhbCIsInJlbmRlciIsImh0bWxBdHRyaWJ1dGVzIiwiYm9keUF0dHJpYnV0ZXMiLCJodG1sQXR0cnMiLCJ0b0NvbXBvbmVudCIsImJvZHlBdHRycyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcCIsImVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFXZSxNQUFNQSxjQUFOLFNBQTZCQyxzREFBN0IsQ0FBNkM7QUFDMUQsZUFBYUMsZUFBYixDQUNFQyxPQURGLEVBRXNDO0FBQ3BDLFVBQU1DLEtBQUssR0FBRyxJQUFJQywrREFBSixFQUFkO0FBQ0EsVUFBTUMsa0JBQWtCLEdBQUdILE9BQU8sQ0FBQ0ksVUFBbkM7O0FBQ0EsUUFBSTtBQUNGSixhQUFPLENBQUNJLFVBQVIsR0FBcUIsTUFDbkJELGtCQUFrQixDQUFDO0FBQ2pCRSxrQkFBVSxFQUFHQyxHQUFELElBQW1CQyxLQUFELElBQzVCTixLQUFLLENBQUNPLGFBQU4sZUFBb0IsOERBQUMsR0FBRCxvQkFBU0QsS0FBVDtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUFwQjtBQUZlLE9BQUQsQ0FEcEI7O0FBS0EsWUFBTUUsWUFBWSxHQUFHLE1BQU1YLG9FQUFBLENBQXlCRSxPQUF6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QVY7QUFBeUIsY0FBSSxFQUFDO0FBQTlCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBZkYsZUFnQkU7QUFBTSxjQUFJLEVBQUMsYUFBWDtBQUF5QixpQkFBTyxFQUFDO0FBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBaEJGLGVBbUJFO0FBQU0sY0FBSSxFQUFDLDhCQUFYO0FBQTBDLGlCQUFPLEVBQUM7QUFBbEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFuQkYsZUFvQkU7QUFBTSxjQUFJLEVBQUMsdUNBQVg7QUFBbUQsaUJBQU8sRUFBQztBQUEzRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQXBCRixlQXFCRTtBQUFNLGNBQUksRUFBQyw0QkFBWDtBQUF3QyxpQkFBTyxFQUFDO0FBQWhEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBckJGLGVBc0JFO0FBQU0sYUFBRyxFQUFDLGtCQUFWO0FBQTZCLGNBQUksRUFBQztBQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQXRCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixlQXlCRSxzR0FBVUMsU0FBVjtBQUFBLGdDQUNFLDhEQUFDLCtDQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREYsRUFFRyx1QkFDQyxDQUhKLGVBUUUsOERBQUMscURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0F6QkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREY7QUFzQ0Q7O0FBaEZ5RCIsImZpbGUiOiIuL3BhZ2VzL19kb2N1bWVudC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBUeXBlLCBSZW5kZXJQYWdlUmVzdWx0IH0gZnJvbSAnbmV4dC9kaXN0L25leHQtc2VydmVyL2xpYi91dGlscyc7XG5pbXBvcnQgRG9jdW1lbnQsIHtcbiAgRG9jdW1lbnRDb250ZXh0LFxuICBIZWFkLFxuICBIdG1sLFxuICBNYWluLFxuICBOZXh0U2NyaXB0LFxufSBmcm9tICduZXh0L2RvY3VtZW50JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVsbWV0LCB7IEhlbG1ldERhdGEgfSBmcm9tICdyZWFjdC1oZWxtZXQnO1xuaW1wb3J0IHsgU2VydmVyU3R5bGVTaGVldCB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IGNvbnNvbGVFcnJvciB9IGZyb20gJy4uL3V0aWxzL2xvZyc7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHN0eWxlczogSlNYLkVsZW1lbnQ7XG4gIGhlbG1ldDogSGVsbWV0RGF0YTtcbiAgaHRtbDogc3RyaW5nO1xuICBoZWFkPzogKEpTWC5FbGVtZW50IHwgbnVsbClbXSB8IHVuZGVmaW5lZDtcbn1cblxudHlwZSBnZXRJbml0aWFsUHJvcHNSdXR1cm5UeXBlID0gUmVuZGVyUGFnZVJlc3VsdCB8IFByb3BzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21Eb2N1bWVudCBleHRlbmRzIERvY3VtZW50PFByb3BzPiB7XG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoXG4gICAgY29udGV4dDogRG9jdW1lbnRDb250ZXh0LFxuICApOiBQcm9taXNlPGdldEluaXRpYWxQcm9wc1J1dHVyblR5cGU+IHtcbiAgICBjb25zdCBzaGVldCA9IG5ldyBTZXJ2ZXJTdHlsZVNoZWV0KCk7XG4gICAgY29uc3Qgb3JpZ2luYWxSZW5kZXJQYWdlID0gY29udGV4dC5yZW5kZXJQYWdlO1xuICAgIHRyeSB7XG4gICAgICBjb250ZXh0LnJlbmRlclBhZ2UgPSAoKSA9PlxuICAgICAgICBvcmlnaW5hbFJlbmRlclBhZ2Uoe1xuICAgICAgICAgIGVuaGFuY2VBcHA6IChBcHA6IEFwcFR5cGUpID0+IChwcm9wcykgPT5cbiAgICAgICAgICAgIHNoZWV0LmNvbGxlY3RTdHlsZXMoPEFwcCB7Li4ucHJvcHN9IC8+KSxcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBpbml0aWFsUHJvcHMgPSBhd2FpdCBEb2N1bWVudC5nZXRJbml0aWFsUHJvcHMoY29udGV4dCk7XG4gICAgICBjb25zdCBwYWdlID0gY29udGV4dC5yZW5kZXJQYWdlKChBcHApID0+IChwcm9wcykgPT5cbiAgICAgICAgc2hlZXQuY29sbGVjdFN0eWxlcyg8QXBwIHsuLi5wcm9wc30gLz4pLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8bGluayBocmVmPVwiL3Jlc2V0LmNzc1wiIHJlbD1cInN0eWxlc2hlZXRcIiAvPlxuICAgICAgICAgIHtpbml0aWFsUHJvcHMuc3R5bGVzfVxuICAgICAgICAgIHtzaGVldC5nZXRTdHlsZUVsZW1lbnQoKX1cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaW5pdGlhbFByb3BzLFxuICAgICAgICAuLi5wYWdlLFxuICAgICAgICBzdHlsZXMsXG4gICAgICAgIGhlbG1ldDogSGVsbWV0LnJlbmRlclN0YXRpYygpLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZUVycm9yKCdDdXN0b21Eb2N1bWVudCBFcnJvcicsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ3VzdG9tRG9jdW1lbnQgRXJyb3InKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2hlZXQuc2VhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBodG1sQXR0cmlidXRlcywgYm9keUF0dHJpYnV0ZXMsIC4uLmhlbG1ldCB9ID0gdGhpcy5wcm9wcy5oZWxtZXQ7XG4gICAgY29uc3QgaHRtbEF0dHJzID0gaHRtbEF0dHJpYnV0ZXMudG9Db21wb25lbnQoKTtcbiAgICBjb25zdCBib2R5QXR0cnMgPSBib2R5QXR0cmlidXRlcy50b0NvbXBvbmVudCgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sIGxhbmc9XCJlblwiIGRpcj1cImx0clwiIHsuLi5odG1sQXR0cnN9PlxuICAgICAgICA8SGVhZD5cbiAgICAgICAgICB7dGhpcy5wcm9wcy5zdHlsZXN9XG4gICAgICAgICAgey8qIDx0aXRsZT5NT1RJPC90aXRsZT4gKi99XG4gICAgICAgICAgPG1ldGEgY2hhclNldD1cInV0Zi04XCIgLz5cbiAgICAgICAgICA8bWV0YSBodHRwRXF1aXY9XCJ4LXVhLWNvbXBhdGlibGVcIiBjb250ZW50PVwiaWU9ZWRnZVwiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cInl1bmktcVwiIC8+XG4gICAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0eXBlXCIgY29udGVudD1cIndlYnNpdGVcIiAvPlxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dXJsXCIgY29udGVudD1cImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9cIiAvPlxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwieXVuaS1xXCIgLz5cbiAgICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOmltYWdlXCIgY29udGVudD1cIi9mYXZpY29uLnBuZ1wiIC8+XG4gICAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJ5dW5pLXFcIiAvPlxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6c2l0ZV9uYW1lXCIgY29udGVudD1cInl1bmktcVwiIC8+XG4gICAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpsb2NhbGVcIiBjb250ZW50PVwia28tS09cIiAvPlxuICAgICAgICAgIHtPYmplY3QudmFsdWVzKGhlbG1ldCkubWFwKChlbCkgPT4gZWwudG9Db21wb25lbnQoKSl9XG4gICAgICAgICAgPGxpbmsgcmVsPVwibWFuaWZlc3RcIiBocmVmPVwiL21hbmlmZXN0Lmpzb25cIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3JjdXQgaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5wbmdcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCJibGFja1wiIC8+XG5cbiAgICAgICAgICB7LyogQ09ERUxBQjogQWRkIGlPUyBtZXRhIHRhZ3MgYW5kIGljb25zICovfVxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlXCIgY29udGVudD1cInllc1wiIC8+XG4gICAgICAgICAgPG1ldGEgbmFtZT1cImFwcGxlLW1vYmlsZS13ZWItYXBwLXN0YXR1cy1iYXItc3R5bGVcIiBjb250ZW50PVwiYmxhY2tcIiAvPlxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJhcHBsZS1tb2JpbGUtd2ViLWFwcC10aXRsZVwiIGNvbnRlbnQ9XCJNT1RJXCIgLz5cbiAgICAgICAgICA8bGluayByZWw9XCJhcHBsZS10b3VjaC1pY29uXCIgaHJlZj1cIi9mYXZpY29uLnBuZ1wiIC8+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHkgey4uLmJvZHlBdHRyc30+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICB7cHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9yZWdpc3QuanNcIiAvPlxuICAgICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vcG9seWZpbGwuaW8vdjMvcG9seWZpbGwubWluLmpzP2ZlYXR1cmVzPWVzNixlczcsZXM4LGVzOSxOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCZmbGFncz1nYXRlZFwiIC8+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvSHRtbD5cbiAgICApO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "../next-server/lib/constants":
/*!*********************************************************!*\
  !*** external "next/dist/next-server/lib/constants.js" ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/constants.js");;

/***/ }),

/***/ "../next-server/lib/document-context":
/*!****************************************************************!*\
  !*** external "next/dist/next-server/lib/document-context.js" ***!
  \****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/document-context.js");;

/***/ }),

/***/ "../next-server/lib/head-manager-context":
/*!********************************************************************!*\
  !*** external "next/dist/next-server/lib/head-manager-context.js" ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/head-manager-context.js");;

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/utils.js");;

/***/ }),

/***/ "../next-server/server/get-page-files":
/*!*****************************************************************!*\
  !*** external "next/dist/next-server/server/get-page-files.js" ***!
  \*****************************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/get-page-files.js");;

/***/ }),

/***/ "../next-server/server/utils":
/*!********************************************************!*\
  !*** external "next/dist/next-server/server/utils.js" ***!
  \********************************************************/
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/server/utils.js");;

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = require("prop-types");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = require("react-helmet");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-components");;

/***/ }),

/***/ "styled-jsx/server":
/*!************************************!*\
  !*** external "styled-jsx/server" ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = require("styled-jsx/server");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, ["vendors-node_modules_next_document_js","utils_log_ts"], function() { return __webpack_exec__("./pages/_document.tsx"); });
module.exports = __webpack_exports__;

})();