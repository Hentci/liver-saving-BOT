// ==UserScript==
// @name         gold_rush
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
// 4 fire 5 water 6 7 8 9 dark 3
// $("").trigger("tap");
var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;

function select_quest() {
    const checkRaidBtn = () => $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").length === 1;
    const checkMultiBattleBtn = () => $("#prt-assist-multi > div.prt-switch-list > div.btn-switch-list.multi").length === 1;
    const checkCanGetQuestCnt = () => $("#prt-multi-list").length === 1;
    const bufferLoop = 10;
    let loopCnt = 0;
    var questCnt = $("#prt-multi-list").children().length

    const findQuest = (questCnt) => {
        for(var idx = questCnt - 1;idx > 0;idx--){
            const ele = document.querySelector("#prt-multi-list > div:nth-child(" + idx.toString() + ")");
            const questName = ele.getAttribute('data-chapter-name');
            console.log(questName);
            if(questName === "神撃、究極の竜ＨＬ"){
                return idx;
            }
            else if(questName === "邂逅、黒銀の翼ＨＬ" || questName === "崩天、虚空の兆"){
                return idx;
            }
            else if(questName === "フロネシスＨＬ" || questName === "ガレヲンＨＬ"){
                return idx;
            }
            else if(questName === "リンドヴルムＨＬ"){
                return idx;
            }

        }
        // #prt-multi-list > div:nth-child(2)
        return -1;
    }

    const func = () => {
        loopCnt++;
        questCnt = -1;
        if (checkRaidBtn){
            $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").trigger("tap");
        }

        if (checkMultiBattleBtn){
            $("#prt-assist-multi > div.prt-switch-list > div.btn-switch-list.multi").trigger("tap");
        }

        if (checkCanGetQuestCnt){
            questCnt = $("#prt-multi-list").children().length;
            // console.log("Quest Count is: " + questCnt);
        }

        if (questCnt != -1){
            const questNum = findQuest(questCnt);
            if(questNum !== -1){
                console.log(questNum);
                setTimeout(() => {
                    $("#prt-multi-list > div:nth-child(" + questNum.toString() + ")").trigger("tap");
                }, 100);
            }
            else if(loopCnt <= bufferLoop){
                setTimeout(func, 3000);
            }
            else{
                loopCnt = 0;
                setTimeout(func, 30000);
            }
        }
        else setTimeout(func, 5000);
    }

    func();
}

function quest() {
    const checkQueBtn = () => $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(1) > div.prt-button-cover").length === 1;
    const maxLoop = 50;
    let loopCount = 0;
    const func = () => {
        loopCount++;
        // #cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type2.selected > div:nth-child(3) > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name
        if(checkQueBtn()) {
            // $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
            var noSpecifySummon = true;
            for(var idx = 1;idx <= 10;idx++){
                var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type4.selected > div:nth-child("+idx.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
                // 確認元素存在並印出 summon-name 的內容
                if (summonNameElement) {
                    var summonName = summonNameElement.textContent;
                    if(summonName === "ゼピュロス"){
                        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child("+idx.toString()+") > div.prt-button-cover").trigger("tap");
                        noSpecifySummon = false;
                        break;
                    }
                }
            }

            if(noSpecifySummon){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
            }

            setTimeout(() => {
                $("#wrapper > div.contents > div.pop-deck.supporter_raid > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 3000);
        } else if(loopCount < maxLoop){
            setTimeout(func, 100);
        }
    }
    func();
}

function raid() {

    const checkBGBtn = () => $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").length === 1;
    const checkAttBtn = () => $("#cnt-raid-information > div.btn-attack-start.display-on").length === 1;
    const maxLoop = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;

        if (checkBGBtn()) {
            $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");

            // setTimeout(() => {
            //     $("#wrapper > div.contents > div.cnt-raid > div.btn-auto").trigger("tap");
            // }, 1800);
        } else if (loopCount < maxLoop) {
            setTimeout(func, 100);
        }
    }

    func();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function result() {
    const checkTresure = () => $("#pop > div > div.prt-popup-footer > div.btn-usual-close").length === 1
    const popClose = () => $("#pop > div > div.prt-popup-footer > div.btn-usual-close").trigger("tap")
    const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
    const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
    const func = () => {
        if (checkTresure()){
            popClose();
            setTimeout(func, 3000);
        }

        if (checkPopBtn()) {
            popOK();
            setTimeout(func, 3000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-retry.cnt-quest").trigger("tap");
            }, 5000);
        }
    }

    func();
}

function run(last) {
    let l = null;
    console.log(last);
    if (window.location.hash.search("supporter_raid") !== -1) {
        if (last !== "quest") {
            quest();
        }
        l = "quest";
    } else if (window.location.hash.search("#raid_multi") !== -1) {
        if (last !== "raid") {
            raid();
        }
        l = "raid";
    } else if (window.location.hash.search("#result_multi") !== -1) {
        if (last !== "result") {
            result();
        }
        l = "result";
    } else if (window.location.hash.search("#quest") !== -1){
        if (last !== "searchQuest"){
            select_quest();
        }
        l = "searchQuest";
    }

    setTimeout(() => run(l), 2000);
}

setTimeout(() => run(null), 2000);

window.hentci = {
    quest, 
    raid,
    result,
    select_quest,
}