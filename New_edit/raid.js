// ==UserScript==
// @name         sandglass magna
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Granblue Fantasy multi-raid auto script
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
var element = "None";

// ── 工具函式 ─────────────────────────────────────────────────────────────────

/** 等待指定毫秒數 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

// ── 召喚石選擇 ───────────────────────────────────────────────────────────────

// listIndex 對照表：
// 4 = 無屬性（目前不使用）
// 5 = 火
// 6 = 水
// 7 = 土
// 8 = 風
// 9 = 光
// 10 = 闇

const windSummon  = () => selectSummon("type4", 8,  "ゼピュロス",          null,      10);
const fireSummon  = () => selectSummon("type1", 5,  "コロッサス・マグナ",  null,      10);
const waterSummon = () => selectSummon("type2", 6,  "ヴァルナ",            null,      10);
const earthSummon = () => selectSummon("type3", 7,  "ユグドラシル・マグナ", "Lv 250",     15);
const lightSummon = () => selectSummon("type5", 9,  "ルシフェル",          "Lv 250",  15);
const darkSummon  = () => selectSummon("type6", 10, "セレスト・マグナ",    "Lv 250",  15);
// const nullSummon = () => selectSummon("type0", 4, "（無屬性召喚石名）",  null,      10); // 無屬性，目前不使用

// ── 任務搜尋 ─────────────────────────────────────────────────────────────────

function select_quest() {
    const checkRaidBtn       = () => $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").length === 1;
    const checkRaidBtn2      = () => $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div").length === 1;
    const checkMultiBattleBtn = () => $("#prt-assist-search > div.prt-assist-frame > div.btn-search-refresh").length === 1;
    const checkCanGetQuestCnt = () => $("#prt-search-list").length === 1;

    const BUFFER_LOOP = 10;
    let loopCnt = 0;
    element = "earth";

    /**
     * 從清單中找出符合條件的任務索引
     * 條件：HP >= 30% 且 人數 <= 10
     */
    function findQuest(questCnt) {
        for (let idx = questCnt; idx >= 0; idx--) {
            const ele       = document.querySelector(`#prt-search-list > div:nth-child(${idx})`);
            const questInfo = document.querySelector(`#prt-search-list > div:nth-child(${idx}) > div.prt-raid-info > div.prt-raid-status > div.prt-raid-gauge > div`);
            const subInfo   = document.querySelector(`#prt-search-list > div:nth-child(${idx}) > div.prt-raid-info > div.prt-raid-subinfo > div.prt-flees-in`);

            if (!ele || !questInfo || !subInfo) continue;

            const gaugeStyle = questInfo.getAttribute('style') ?? "";
            const hpStr      = gaugeStyle.slice(-4, -2);   // 取百分比數字
            const numPlayer  = parseInt(subInfo.textContent.split('/')[0], 10);
            const hp         = parseInt(hpStr, 10);

            if (hp >= 30 && numPlayer <= 10) {
                return [idx, element];
            }
        }
        return [-1, element];
    }

    const func = () => {
        loopCnt++;
        let questCnt = -1;

        if (checkRaidBtn())        $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").trigger("tap");
        if (checkRaidBtn2())       $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div").trigger("tap");
        if (checkMultiBattleBtn()) $("#prt-assist-search > div.prt-assist-frame > div.btn-search-refresh").trigger("tap");
        if (checkCanGetQuestCnt()) questCnt = $("#prt-search-list").children().length;

        if (questCnt > 0) {
            setTimeout(() => {
                const [questNum] = findQuest(questCnt);
                if (questNum !== -1) {
                    console.log(`[select_quest] 選擇第 ${questNum} 個任務`);
                    setTimeout(() => {
                        $(`#prt-search-list > div:nth-child(${questNum})`).trigger("tap");
                    }, 200);
                }
            }, 200);

            const nextDelay = loopCnt <= BUFFER_LOOP ? 800 : 5000;
            if (loopCnt > BUFFER_LOOP) loopCnt = 0;
            setTimeout(func, nextDelay);
        } else {
            setTimeout(func, 800);
        }
    };

    setTimeout(func, 800);
}

// ── 支援者選擇並開始任務 ─────────────────────────────────────────────────────

function quest() {
    const checkQueBtn = () => $(`#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(1) > div.prt-button-cover`).length === 1;
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
                $("#wrapper > div.contents > div.pop-deck.supporter_raid > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 1000);
        } else if (loopCount < MAX_LOOP) {
            setTimeout(func, 100);
        }
    };

    func();
}

// ── 進入戰鬥 ─────────────────────────────────────────────────────────────────

function raid() {
    const checkBGBtn = () => $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").length === 1;
    const MAX_LOOP = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;
        if (checkBGBtn()) {
            setTimeout(() => {
                $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
            }, 80);
        } else if (loopCount < MAX_LOOP) {
            setTimeout(func, 100);
        }
    };

    func();
}

// ── 快速掃描戰鬥（等待他人打完） ─────────────────────────────────────────────

function quick_raid() {
    const checkStampBTN = () => $("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-chat > div.btn-chat.comment.display-on.sub-left").length > 0;
    const MAX_LOOP = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;
        const HPSelector = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-stage > div.prt-targeting-area.main-tap-area > div.prt-gauge-area > div.btn-enemy-gauge.prt-enemy-percent.alive");
        const currHP = HPSelector ? HPSelector.textContent : null;

        if (checkStampBTN() && window.location.hash.includes("#raid")) {
            setTimeout(() => location.reload(), 1150);
        } else if (currHP === "0%") {
            setTimeout(() => location.reload(), 3000);
        } else if (loopCount < MAX_LOOP) {
            setTimeout(func, 1150);
        }
    };

    setTimeout(func, 1000);
}

// ── 結果畫面處理 ─────────────────────────────────────────────────────────────

function result() {
    const checkTreasure = () => $("#pop > div > div.prt-popup-footer > div.btn-usual-close").length === 1;
    const checkPopBtn   = () => $("#pop > div > div.prt-popup-footer > div").length > 0;

    const func = () => {
        if (checkTreasure()) {
            $("#pop > div > div.prt-popup-footer > div.btn-usual-close").trigger("tap");
            setTimeout(func, 3000);
            return;
        }

        if (checkPopBtn()) {
            $("#pop > div > div.prt-popup-footer > div").trigger("tap");
            setTimeout(func, 3000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-control").trigger("tap");
            }, 5000);
        }
    };

    func();
}

// ── My Page ──────────────────────────────────────────────────────────────────

function mypage() {
    const checkQuestBtn = () => $("#wrapper > div.contents > div.cnt-mypage > div.prt-user-scene > div.prt-link-quest > div.btn-link-quest.se-ok").length === 1;
    const MAX_LOOP = 50;
    let loopCnt = 0;

    const func = () => {
        loopCnt++;
        if (checkQuestBtn()) {
            $("#wrapper > div.contents > div.cnt-mypage > div.prt-user-scene > div.prt-link-quest > div.btn-link-quest.se-ok").trigger("tap");
            setTimeout(() => location.reload(), 2000);
        } else if (loopCnt < MAX_LOOP) {
            setTimeout(func, 1000);
        }
    };

    func();
}

// ── HP 歸零 Bug 偵測 ─────────────────────────────────────────────────────────

function checkHPZeroBug() {
    const HPSelector = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-stage > div.prt-targeting-area.main-tap-area > div.prt-gauge-area > div.btn-enemy-gauge.prt-enemy-percent.alive");
    const MAX_LOOP = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;
        const currHP = HPSelector ? HPSelector.textContent : null;
        if (currHP === "0%") {
            setTimeout(() => location.reload(), 5000);
        } else if (loopCount < MAX_LOOP) {
            setTimeout(func, 5000);
        }
    };

    setTimeout(func, 5000);
}

// ── 通用 popup 工具 ──────────────────────────────────────────────────────────

const checkPopBtn  = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
const popOK        = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
const resultPopOut = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").length > 0;
const resultPopOK  = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").trigger("tap");
const checkNoAutoBtn = () => $("#cnt-raid-information > div.img-diagram.display-on").length > 0;

// ── 主迴圈 ───────────────────────────────────────────────────────────────────

function run(last) {
    let next = null;
    const hash = window.location.hash;

    if (hash.includes("supporter_raid")) {
        if (last !== "quest") quest();
        else if (checkPopBtn()) setTimeout(popOK, 3000);
        next = "quest";

    } else if (hash.includes("#raid_multi")) {
        if (last !== "raid") raid();
        else {
            if (checkPopBtn()) setTimeout(popOK, 2000);
            quick_raid();
            if (checkNoAutoBtn()) setTimeout(() => location.reload(), 5000);
        }
        next = "raid";

    } else if (hash.includes("#result_multi")) {
        if (last !== "result") result();
        else {
            if (checkPopBtn())  setTimeout(popOK,       3000);
            if (resultPopOut()) setTimeout(resultPopOK, 3000);
        }
        next = "result";

    } else if (hash.includes("#quest")) {
        if (last !== "searchQuest") select_quest();
        next = "searchQuest";

    } else if (hash.includes("#mypage")) {
        if (last !== "mypage") mypage();
        next = "mypage";
    }

    setTimeout(() => run(next), 1000);
}

// ── 啟動 ─────────────────────────────────────────────────────────────────────
setTimeout(() => run(null), 1000);

// ── 對外暴露的 API（方便 Console 手動呼叫）───────────────────────────────────
window.hentci = {
    quest,
    raid,
    quick_raid,
    result,
    select_quest,
    mypage,
    checkHPZeroBug,
};