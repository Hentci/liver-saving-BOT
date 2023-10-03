// ==UserScript==
// @name         baha_dark
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

var element = "None";
function select_quest() {
    const checkRaidBtn = () => $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").length === 1;
    const checkRaidBtn2 = () => $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div").length === 1;
    const checkMultiBattleBtn = () => $("#prt-assist-search > div.prt-module > div.btn-search-refresh").length === 1;
    const checkCanGetQuestCnt = () => $("#prt-search-list").length === 1;
    const bufferLoop = 10;
    let loopCnt = 0;
    var questCnt = $("#prt-search-list").children().length

    element = "dark";

    const findQuest = (questCnt) => {

        // // get fp first
        // for(var idx = questCnt - 1;idx >= 1;idx--){
        //     const checkFPQuest = document.querySelector("#prt-search-list > div:nth-child(" + idx.toString() + ") > div.prt-raid-info > div.prt-raid-status > div.prt-use-ap.decreased");
        //     if(checkFPQuest != null){
        //         console.log(checkFPQuest);
        //         return [idx, element];
        //     }
        // }

        for(var idx = questCnt - 1;idx >= 1;idx--){
            const ele = document.querySelector("#prt-search-list > div:nth-child(" + idx.toString() + ")");
            const questName = ele.getAttribute('data-chapter-name');
            const questInfo = document.querySelector("#prt-search-list > div:nth-child(" + idx.toString() + ") > div.prt-raid-info > div.prt-raid-status > div.prt-raid-gauge > div");
            const raidSubInfo = document.querySelector("#prt-search-list > div:nth-child(" + idx.toString() + ") > div.prt-raid-info > div.prt-raid-subinfo > div.prt-flees-in");
            const checkFPQuest = document.querySelector("#prt-search-list > div:nth-child(" + idx.toString() + ") > div.prt-raid-info > div.prt-raid-status > div.prt-use-ap.decreased");
            const gauge = questInfo.getAttribute('style');
            const gauge_2 = gauge.slice(-4);
            const gauge_3 = gauge_2.slice(0, 2);
            var num_player = raidSubInfo.textContent.split('/')[0];
            // console.log("num_player: " + num_player);
            // console.log(gauge_3);

            // current HP and num player
            if(parseInt(gauge_3) >= 50 && parseInt(num_player) <= 5){
                return [idx, element];
            }
            
            // get FP
            // if (checkFPQuest != null && parseInt(gauge_3) >= 30){
            //     return [idx, element];
            // }


            // else if((questName === "アバターＨＬ") && parseInt(gauge_3) > 35 && parseInt(gauge_3) <= 50){
            //     element = 'light';
            //     return [idx, element];
            // }

        }
        // #prt-search-list > div:nth-child(2)
        return [-1, element];
    }

    const func = () => {
        loopCnt++;
        questCnt = -1;
        if (checkRaidBtn){
            $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div > div").trigger("tap");
        }

        if (checkRaidBtn2){
            $("#cnt-quest > div.prt-quest-index > div.prt-quest-base > div.prt-other-quest > div.prt-lead-button > div.prt-multi-button > div").trigger("tap");
        }

        if (checkMultiBattleBtn){
            $("#prt-assist-search > div.prt-module > div.btn-search-refresh").trigger("tap");
        }

        if (checkCanGetQuestCnt){
            questCnt = $("#prt-search-list").children().length;
            // console.log("Quest Count is: " + questCnt);
        }
        // console.log(questCnt);
        if (questCnt > 1){
            setTimeout(() => {
                const [questNum, element] = findQuest(questCnt);
                // Rest of your code that uses questNum and element goes here
                if(questNum !== -1){
                    console.log(questNum);
                    setTimeout(() => {
                        $("#prt-search-list > div:nth-child(" + questNum.toString() + ")").trigger("tap");
                    }, 200);
                }
            }, 200);

            if(loopCnt <= bufferLoop){
                setTimeout(func, 800);
            }
            else{
                loopCnt = 0;
                setTimeout(func, 5000);
            }
        }
        else setTimeout(func, 800);
    }

    setTimeout(func, 800);
}

function windSummon() {
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
}

function lightSummon(){
    var noSpecifySummon = true;
    for(var i = 1;i <= 10;i++){
        var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type5.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
        // 確認元素存在並印出 summon-name 的內容
        if (summonNameElement) {
            var summonName = summonNameElement.textContent;
            // console.log(summonName);
            if(summonName === "ゼウス"){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(8) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                noSpecifySummon = false;
                break;
            }
        } else {
            console.log('error');
        }
    }

    if(noSpecifySummon){
        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(8) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
    }
}

function darkSummon(){
    var noSpecifySummon = true;
    for(var i = 1;i <= 10;i++){
        var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type6.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
        // 確認元素存在並印出 summon-name 的內容
        if (summonNameElement) {
            var summonName = summonNameElement.textContent;
            // console.log(summonName);
            if(summonName === "ハデス"){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(9) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                noSpecifySummon = false;
                break;
            }
        } else {
            console.log('error');
        }
    }

    if(noSpecifySummon){
        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(9) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
    }
}

function fireSummon(){
    var noSpecifySummon = true;
    for(var i = 1;i <= 10;i++){
        var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type1.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
        // 確認元素存在並印出 summon-name 的內容
        if (summonNameElement) {
            var summonName = summonNameElement.textContent;
            // console.log(summonName);
            if(summonName === "コロッサス・マグナ"){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(4) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                noSpecifySummon = false;
                break;
            }
        } else {
            console.log('error');
        }
    }

    if(noSpecifySummon){
        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(4) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
    }
}

function earthSummon(){
    var noSpecifySummon = true;
    for(var i = 1;i <= 10;i++){
        var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type3.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
        // 確認元素存在並印出 summon-name 的內容
        if (summonNameElement) {
            var summonName = summonNameElement.textContent;
            // console.log(summonName);
            if(summonName === "ユグドラシル・マグナ"){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(6) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                noSpecifySummon = false;
                break;
            }
        } else {
            console.log('error');
        }
    }

    if(noSpecifySummon){
        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(6) > div:nth-child(2) > div.prt-button-cover").trigger("tap");
    }
}

function waterSummon(){
    var noSpecifySummon = true;
    for(var i = 1;i <= 10;i++){
        var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type2.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
        // 確認元素存在並印出 summon-name 的內容
        if (summonNameElement) {
            var summonName = summonNameElement.textContent;
            // console.log(summonName);
            if(summonName === "ヴァルナ"){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                noSpecifySummon = false;
                break;
            }
        } else {
            console.log('error');
        }
    }

    if(noSpecifySummon){
        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
    }
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

            if(element == "wind")
                windSummon();
            else if(element == "dark")
                darkSummon();
            else if(element == "light")
                lightSummon();
            else if(element == "fire")
                fireSummon();
            else if(element == "earth")
                earthSummon();
            else if(element == "water")
                waterSummon();
            else if(element == "None")
                console.log("error");

            setTimeout(() => {
                $("#wrapper > div.contents > div.pop-deck.supporter_raid > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 500);
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
        // #pop > div > div.prt-popup-footer > div
        if (checkBGBtn()) {
            $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
            // setTimeout(() => {
            //     $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
            // }, 300);

            // setTimeout(() => {
            //     $("#wrapper > div.contents > div.cnt-raid > div.btn-auto").trigger("tap");
            // }, 1800);

        } else if (loopCount < maxLoop) {
            setTimeout(func, 100);
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
        const HPSelector = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-stage > div.prt-targeting-area.main-tap-area > div.prt-gauge-area > div.btn-enemy-gauge.prt-enemy-percent.alive");
        var currHP = HPSelector.textContent;
        loopCount++;
        // #pop > div > div.prt-popup-footer > div
        // console.log('hehe');
        // console.log(checkStampBTN());
        if (checkStampBTN() && window.location.hash.search("#raid") !== -1) {
            setTimeout(() => {
                location.reload();
            }, 1150);
        } else if (currHP == "0%"){
            setTimeout(() => {
                location.reload();
            }, 3000);   
        } else if (loopCount < maxLoop) {
            setTimeout(func, 1150);
        }
    }

    setTimeout(func, 1000);
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

function mypage() {
    const checkQuestBtn = () => $("#wrapper > div.contents > div.cnt-mypage > div.prt-user-scene > div.prt-link-quest > div.btn-link-quest.se-ok").length === 1;
    let loopCnt = 0;
    const maxLoop = 50;
    const func = () => {
        loopCnt++;
        if (checkQuestBtn()){
            $("#wrapper > div.contents > div.cnt-mypage > div.prt-user-scene > div.prt-link-quest > div.btn-link-quest.se-ok").trigger("tap");
            setTimeout(() =>{
                location.reload();
            }, 2000);
        } else if (loopCnt < maxLoop){
            setTimeout(func, 1000);
        }
    }

    func();
}


function checkHPZeroBug () {
    const HPSelector = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-stage > div.prt-targeting-area.main-tap-area > div.prt-gauge-area > div.btn-enemy-gauge.prt-enemy-percent.alive");
    var currHP = HPSelector.textContent;
    const maxLoop = 50;
    let loopCount = 0;

    console.log(currHP);

    const func = () => {
        loopCount++;

        if (currHP == "0%") {
            setTimeout(() => {
                location.reload();
            }, 5000);
        } else if (loopCount < maxLoop) {
            setTimeout(func, 5000);
        }
    }

    setTimeout(func, 5000);
}

const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
const resultPopOut = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").length > 0;
const resultPopOK = () => $("#wrapper > div.contents > div.cnt-result > div.prt-button-area > a").trigger("tap");
const checkNoAutoBtn = () => $("#cnt-raid-information > div.img-diagram.display-on").length > 0;

// TODO

const clickMyPageBtn = () => $("#treasure-footer > div > div.btn-treasure-footer-mypage").trigger("tap");

function run(last) {
    let l = null;
    // console.log(last);
    if (window.location.hash.search("supporter_raid") !== -1) {
        if (last !== "quest") {
            quest();
        } else {
            if (checkPopBtn()) {
                console.log('pop BTN');
                setTimeout(popOK, 3000);
            }
        }
        l = "quest";
    } else if (window.location.hash.search("#raid_multi") !== -1) {
        if (last !== "raid") {
            raid();
        }
        else{
            if (checkPopBtn()){
                console.log('pop BTN');
                setTimeout(popOK, 2000);
            }
            // setTimeout(quick_raid(), 5000);
            quick_raid();
            // checkHPZeroBug();

            if (checkNoAutoBtn()){
                setTimeout(() => {
                    location.reload();
                }, 5000)
            }

            // const checkDiedBtn = document.querySelector("#cnt-raid-information > div.btn-revival").outerHTML;
            // console.log(checkDiedBtn);
            // if (checkDiedBtn == '<div class="btn-revival" style="display: block;"></div>'){
            //     setTimeout(() => {
            //         clickMyPageBtn();
            //     }, 1500);
            // }
        }
        l = "raid";
    } else if (window.location.hash.search("#result_multi") !== -1) {
        if (last !== "result") {
            result();
        }
        else{
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
    } else if (window.location.hash.search("#quest") !== -1){
        if (last !== "searchQuest"){
            select_quest();
        } 

        l = "searchQuest";
    } else if(window.location.hash.search("#mypage") !== -1){
        if (last !== "mypage") {
            mypage();
        }

        l = "mypage";
    }

    setTimeout(() => run(l), 1000);
}

setTimeout(() => run(null), 1000);

window.hentci = {
    quest,
    raid,
    quick_raid,
    result,
    select_quest,
    mypage,
    checkHPZeroBug
}



