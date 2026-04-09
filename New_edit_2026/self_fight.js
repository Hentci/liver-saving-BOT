// ==UserScript==
// @name         self fight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// ── 隱藏 console（避免被偵測）──────────────────────────────────────────────
var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;

// ── 全域變數 ─────────────────────────────────────────────────────────────────
var element = "water";

// ── 召喚石選擇 ───────────────────────────────────────────────────────────────

/**
 * 通用召喚石選擇函式
 * @param {string} typeClass  - 屬性 CSS class（例如 "type1"）
 * @param {number} listIndex  - 支援者列表的 nth-child 索引
 * @param {string} targetName - 目標召喚石名稱（日文）
 * @param {string} [targetLevel] - 目標等級（例如 "Lv 250"，可選）
 * @param {number} maxSearch  - 最多搜尋幾格
 */
function selectSummon(typeClass, listIndex, targetName, targetLevel = null, maxSearch = 15) {
    let found = false;

    for (let idx = 1; idx <= maxSearch; idx++) {
        const base = `#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.${typeClass}.selected > div:nth-child(${idx})`;
        const nameEl  = document.querySelector(`${base} > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name`);
        const levelEl = document.querySelector(`${base} > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.txt-summon-level`);

        if (!nameEl) {
            console.log(`[selectSummon] 找不到第 ${idx} 格元素`);
            continue;
        }

        const nameMatch  = nameEl.textContent === targetName;
        const levelMatch = targetLevel ? (levelEl && levelEl.textContent === targetLevel) : true;

        if (nameMatch && levelMatch) {
            $(`#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(${listIndex}) > div:nth-child(${idx}) > div.prt-button-cover`).trigger("tap");
            found = true;
            break;
        }
    }

    // 找不到指定石頭時，選第一個
    if (!found) {
        $(`#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(${listIndex}) > div:nth-child(1) > div.prt-button-cover`).trigger("tap");
    }
}

// listIndex 對照表：
// 4 = 無屬性（目前不使用）
// 5 = 火
// 6 = 水
// 7 = 土
// 8 = 風
// 9 = 光
// 10 = 闇

const windSummon  = () => selectSummon("type4", 8,  "ゼピュロス",          null,      15);
const fireSummon  = () => selectSummon("type1", 5,  "コロッサス・マグナ",  null,      15);
const waterSummon = () => selectSummon("type2", 6,  "ヴァルナ",            null,      15);
const earthSummon = () => selectSummon("type3", 7,  "ユグドラシル・マグナ", "Lv 250", 15);
const lightSummon = () => selectSummon("type5", 9,  "ルシフェル",          "Lv 250",  15);
const darkSummon  = () => selectSummon("type6", 10, "セレスト・マグナ",    "Lv 250",  15);

// ── 支援者選擇並開始任務 ─────────────────────────────────────────────────────

function quest() {
    const checkQueBtn = () => $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(1) > div.prt-button-cover").length === 1;
    const MAX_LOOP = 50;
    let loopCount = 0;

    const SUMMON_MAP = {
        wind:  windSummon,
        dark:  darkSummon,
        light: lightSummon,
        fire:  fireSummon,
        earth: earthSummon,
        water: waterSummon,
    };

    const func = () => {
        loopCount++;
        if (checkQueBtn()) {
            const summonFn = SUMMON_MAP[element];
            if (summonFn) {
                summonFn();
            } else {
                console.log("[quest] 未知的 element：" + element);
            }

            setTimeout(() => {
                $("#wrapper > div.contents > div.pop-deck.supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 3000);
        } else if (loopCount < MAX_LOOP) {
            setTimeout(func, 100);
        }
    };

    func();
}

function raid() {

    const checkBGBtn = () => $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").length === 1;
    const checkAttBtn = () => $("#cnt-raid-information > div.btn-attack-start.display-on").length === 1;
    const maxLoop = 500;
    let loopCount = 0;

    const func = () => {
        loopCount++;

        if (checkBGBtn()) {
            console.log('checkBGBtn');

            setTimeout(() => {
                $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
            }, 10);
            console.log('checkBGBtn end');
            // setTimeout(() => {
            //     $("#wrapper > div.contents > div.cnt-raid > div.btn-auto").trigger("tap");
            // }, 1800);
        } else if (loopCount < maxLoop) {
            setTimeout(func, 100);
        }
    }

    func();
}

function result() {
    const checkTresure = () => $("#pop > div > div.prt-popup-footer > div.btn-usual-close").length === 1
    const popClose = () => $("#pop > div > div.prt-popup-footer > div.btn-usual-close").trigger("tap")
    const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
    const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
    const func = () => {
        if (checkTresure()){
            popClose();
            setTimeout(func, 1000);
        }

        if (checkPopBtn()) {
            popOK();
            setTimeout(func, 2000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-retry.cnt-quest").trigger("tap");
            }, 3000);
        }
    }

    func();
}

function quick_raid() {
    const checkAttBtn = () => $("#cnt-raid-information > div.btn-attack-start.display-on").length === 1;
    const checkStampBTN = () => $("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-chat > div.btn-chat.comment.display-on.sub-left").length > 0;
    const maxLoop = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;
        // #pop > div > div.prt-popup-footer > div
        // console.log('hehe');
        // console.log(checkStampBTN());
        if (checkStampBTN() && window.location.hash.search("#raid") !== -1) {
            setTimeout(() => {
                location.reload();
            }, 1150);
        } else if (loopCount < maxLoop) {
            setTimeout(func, 1150);
        }
    }

    setTimeout(func, 1000);
}

const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
const resultPopOut = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").length > 0;
const resultPopOK = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").trigger("tap");
const checkNoAutoBtn = () => $("#cnt-raid-information > div.img-diagram.display-on").length > 0;

function run(last) {
    let l = null;
    if (window.location.hash.search("#quest") !== -1) {
        if (last !== "quest") {
            quest();
        }
        l = "quest";
    } else if (window.location.hash.search("#raid") !== -1) {
        if (last !== "raid") {
            raid();
        } else {
            if (checkPopBtn()){
                console.log('pop BTN');
                setTimeout(popOK, 2000);
            }

            quick_raid();


            if (checkNoAutoBtn()){
                setTimeout(() => {
                    location.reload();
                }, 2000)
            }
        }
        l = "raid";
    } else if (window.location.hash.search("#result") !== -1) {
        if (last !== "result") {
            result();
        } else {
            if (checkPopBtn()){
                console.log('pop BTN');
                setTimeout(popOK, 3000);
            }

            if (resultPopOut()){
                console.log('result pop BTN');
                setTimeout(resultPopOK, 3000);
            }
        }
        l = "result";
    }

    setTimeout(() => run(l), 1200);
}

setTimeout(() => run(null), 1200);

window.hentci = {
    quest,
    raid,
    result,
    quick_raid
}