/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/config.ts":
/*!****************************!*\
  !*** ./src/core/config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Config": () => (/* binding */ Config),
/* harmony export */   "DisplayOriginalCc": () => (/* binding */ DisplayOriginalCc)
/* harmony export */ });
var DisplayOriginalCc;
(function (DisplayOriginalCc) {
    DisplayOriginalCc["OK"] = "1";
    DisplayOriginalCc["NG"] = "2";
})(DisplayOriginalCc || (DisplayOriginalCc = {}));
/**
 * ポップアップ内で入力した設定情報
 */
class Config {
    constructor(callbackFunc) {
        this.config = {
            opacityRate: 0.5,
            displayOriginalCc: DisplayOriginalCc.OK,
        };
        this.getConfig = () => {
            return this.config;
        };
        this.setConfig = (config) => {
            this.config = config;
            this.callbackFuncChangeConfig(this.config);
        };
        this.loadConfig = async () => {
            var _a, _b;
            const storage = await this.getStorage();
            if (storage) {
                this.setConfig({
                    opacityRate: (_a = storage.opacityRate) !== null && _a !== void 0 ? _a : this.config.opacityRate,
                    displayOriginalCc: (_b = storage.displayOriginalCc) !== null && _b !== void 0 ? _b : this.config.displayOriginalCc,
                });
            }
        };
        this.getStorage = () => {
            return new Promise((resolve) => {
                chrome.storage.local.get(["opacityRate", "displayOriginalCc"], (data) => {
                    resolve(data);
                });
            });
        };
        this.observeConfig = () => {
            // ポップアップ側の変更検知
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                console.log("receive: popup → content_scripts");
                const data = JSON.parse(message);
                this.setConfig(data);
            });
        };
        this.callbackFuncChangeConfig = callbackFunc;
    }
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
/******/ 			// no module.id needed
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
/*!****************************!*\
  !*** ./src/popup/popup.ts ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/core/config */ "./src/core/config.ts");

const main = async () => {
    console.log("start: popup");
    const config = new _core_config__WEBPACK_IMPORTED_MODULE_0__.Config((config) => { });
    await config.loadConfig();
    const configData = config.getConfig();
    console.log(`load config: ${JSON.stringify(configData)}`);
    const initElements = () => {
        const opacityRateElement = (document.getElementsByName("opacityRate")[0]);
        const displayOriginalCcElements = (document.getElementsByName("displayOriginalCc"));
        console.log(configData);
        console.log(opacityRateElement.value);
        console.log(displayOriginalCcElements);
        console.log(configData.opacityRate.toString());
        opacityRateElement.value = configData.opacityRate.toString();
        console.log(configData.displayOriginalCc);
        if (configData.displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK) {
            displayOriginalCcElements[0].checked = true;
        }
        if (configData.displayOriginalCc === _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG) {
            displayOriginalCcElements[1].checked = true;
        }
    };
    initElements();
    // 監視処理
    const observe = () => {
        const opacityRateElement = (document.getElementsByName("opacityRate")[0]);
        opacityRateElement.addEventListener("change", (event) => {
            console.log("change opacityRate");
            if (event.target instanceof HTMLInputElement) {
                console.log(event.target.value);
                chrome.storage.local.set({ opacityRate: event.target.value });
                configData.opacityRate = parseInt(event.target.value);
            }
        });
        const displayOriginalCcElements = (document.getElementsByName("displayOriginalCc"));
        displayOriginalCcElements[0].addEventListener("change", (event) => {
            console.log("change displayOriginalCcElements");
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                console.log(event.target.value);
                chrome.storage.local.set({ displayOriginalCc: _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK });
                configData.displayOriginalCc = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.OK;
            }
        });
        displayOriginalCcElements[1].addEventListener("change", (event) => {
            console.log("change displayOriginalCcElements");
            if (event.target instanceof HTMLInputElement) {
                if (!event.target.checked)
                    return;
                console.log(event.target.value);
                chrome.storage.local.set({ displayOriginalCc: _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG });
                configData.displayOriginalCc = _core_config__WEBPACK_IMPORTED_MODULE_0__.DisplayOriginalCc.NG;
            }
        });
        // chromeStorageを監視して変更されたらContents側にメッセージを送る
        chrome.storage.onChanged.addListener((changes, namespace) => {
            console.log("change storage");
            console.log(`send active tab: ${configData}`);
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(configData), function (response) { });
            });
        });
    };
    observe();
};
window.addEventListener("load", main, false);

})();

/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map