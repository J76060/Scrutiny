// ==UserScript==
// @name        Scrutiny - TM UI Fix
// @homepageURL https://github.com/J76060/Scrutiny/blob/main/Scrutiny_TM_UI_Fix.js
// @match       http://192.168.11.11:8082/web/dashboard
// @description null
// @version     null
// ==/UserScript==
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function getSummary() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch('/api/summary')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getDetails(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/device/".concat(id, "/details"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    throw new Error(error_2.message);
                case 4: return [2 /*return*/];
            }
        });
    });
}
function humanizeBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    var k = 1024;
    var dm = 2 < 0 ? 0 : 2;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
function humanizeTime(hours) {
    var days = Math.floor(hours / 24);
    var years = Math.floor(days / 365);
    if (years > 0) {
        return years + ' years';
    }
    if (days > 0) {
        return days + ' days';
    }
    return hours + ' hours';
}
function createTable(details) {
    function getFailureRate(smarts, id) {
        var attr = smarts[String(id)];
        if (attr === undefined || attr.failure_rate === undefined) {
            return "";
        }
        return Math.round(attr.failure_rate * 100) + "%";
    }
    var table = document.createElement('table');
    table.classList.add('mat-table', 'cdk-table', 'w-full', 'bg-transparent');
    var thead = document.createElement('thead');
    thead.role = 'rowgroup';
    // const tr1 = document.createElement('tr');
    // const th1 = document.createElement('th');
    // th1.setAttribute('colspan', '5');
    // th1.textContent = 'Disk';
    // const th2 = document.createElement('th');
    // th2.setAttribute('colspan', '5');
    // th2.textContent = 'SMART Failure Rate';
    // tr1.append(th1, th2);
    var tr2 = document.createElement('tr');
    var th3 = document.createElement('th');
    th3.textContent = 'Disk';
    th3.style.textAlign = "left";
    var th4 = document.createElement('th');
    th4.textContent = 'Status';
    th4.style.textAlign = "left";
    var th5 = document.createElement('th');
    th5.textContent = 'Temperature';
    th5.style.textAlign = "left";
    var th6 = document.createElement('th');
    th6.textContent = 'Capacity';
    th6.style.textAlign = "left";
    var th7 = document.createElement('th');
    th7.textContent = 'Powered On';
    th7.style.textAlign = "left";
    var th8 = document.createElement('th');
    th8.textContent = 'Reallocated Sectors';
    th8.style.textAlign = "left";
    var th9 = document.createElement('th');
    th9.textContent = 'Spin Retry';
    th9.style.textAlign = "left";
    var th10 = document.createElement('th');
    th10.textContent = 'Reallocated Event';
    th10.style.textAlign = "left";
    var th11 = document.createElement('th');
    th11.textContent = 'Current Pending Sector';
    th11.style.textAlign = "left";
    var th12 = document.createElement('th');
    th12.textContent = 'Offline Uncorrectable';
    th12.style.textAlign = "left";
    tr2.append(th3, th4, th5, th6, th7, th8, th9, th10, th11, th12);
    thead.append(tr2);
    var tbody = document.createElement('tbody');
    details.forEach(function (detail) {
        var smart_attributes = detail.data.smart_results[0].attrs;
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.textContent = detail.data.device.device_name;
        var td2 = document.createElement('td');
        td2.textContent = detail.data.device.device_status === 0 ? 'Passed' : 'Failed';
        var td3 = document.createElement('td');
        td3.textContent = Math.round(detail.data.smart_results[0].temp * 5 / 9 + 32) + "°F";
        var td4 = document.createElement('td');
        td4.textContent = humanizeBytes(detail.data.device.capacity);
        var td5 = document.createElement('td');
        td5.textContent = humanizeTime(detail.data.smart_results[0].power_on_hours);
        var td6 = document.createElement('td');
        td6.textContent = getFailureRate(smart_attributes, 5);
        var td7 = document.createElement('td');
        td7.textContent = getFailureRate(smart_attributes, 10);
        var td8 = document.createElement('td');
        td8.textContent = getFailureRate(smart_attributes, 196);
        var td9 = document.createElement('td');
        td9.textContent = getFailureRate(smart_attributes, 197);
        var td10 = document.createElement('td');
        td10.textContent = getFailureRate(smart_attributes, 198);
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8, td9, td10);
        tbody.append(tr);
    });
    table.append(thead, tbody);
    return table;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var summary, deviceIds, details, table, tableDiv, htmlElements, referenceNode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSummary()];
                case 1:
                    summary = _a.sent();
                    deviceIds = Object.keys(summary.data.summary);
                    return [4 /*yield*/, Promise.all(deviceIds.map(function (id) { return getDetails(id); }))];
                case 2:
                    details = _a.sent();
                    details = details.sort(function (a, b) {
                        var aName = a.data.device.device_name;
                        var bName = b.data.device.device_name;
                        if (aName < bName) {
                            return -1;
                        }
                        if (aName > bName) {
                            return 1;
                        }
                        return 0;
                    });
                    table = createTable(details);
                    tableDiv = document.createElement('div');
                    tableDiv.classList.add('flex', 'flex-wrap', 'w-full');
                    tableDiv.append(table);
                    htmlElements = document.getElementsByClassName('flex flex-wrap w-full ng-star-inserted');
                    referenceNode = htmlElements[0] ? htmlElements[0] : document.body.firstChild;
                    referenceNode === null || referenceNode === void 0 ? void 0 : referenceNode.before(tableDiv);
                    return [2 /*return*/];
            }
        });
    });
}
setTimeout(main, 2000);
