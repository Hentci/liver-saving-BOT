// ==UserScript==
// @name         kaguya_quick
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
function quest() {
    const checkQueBtn = () => $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(1) > div.prt-button-cover").length === 1;
    const maxLoop = 50;
    let loopCount = 0;
    const func = () => {
        loopCount++;
        // ハデス ゼウス
        // #cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type2.selected > div:nth-child(3) > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name
        if(checkQueBtn()) {
            // $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
            var noSpecifySummon = true;
            for(var i = 1;i <= 15;i++){
                var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type0.selected > div:nth-child("+i.toString()+") > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");
                // 確認元素存在並印出 summon-name 的內容
                if (summonNameElement) {
                    var summonName = summonNameElement.textContent;
                    // console.log(summonName);
                    if(summonName === "カグヤ"){
                        $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(3) > div:nth-child("+i.toString()+") > div.prt-button-cover").trigger("tap");
                        noSpecifySummon = false;
                        break;
                    }
                } else {
                    console.log('error');
                }
            }

            if(noSpecifySummon){
                $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(3) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
            }


            setTimeout(() => {
                $("#wrapper > div.contents > div.pop-deck.supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 2000);
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
            // $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");

            setTimeout(() => {
                $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
            }, 800);
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
            setTimeout(func, 1000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-retry.cnt-quest").trigger("tap");
            }, 2000);
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
        const HPSelector = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-raid-stage > div.prt-targeting-area.main-tap-area > div.prt-gauge-area > div.btn-enemy-gauge.prt-enemy-percent.alive");
        var currHP = HPSelector.textContent;
        var currHP_num = parseInt(currHP.slice(0, -1));
        const contribution = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-multi > div.prt-mvp > div > div.txt-point");
        const contributionPoints = contribution.textContent;
        const contributionPoints_num = parseInt(contributionPoints.slice(0, -2));
        // console.log(contributionPoints);

        // console.log(currHP_num);
        if (checkStampBTN() && window.location.hash.search("#raid") !== -1) {
            setTimeout(() => {
                location.reload();
            }, 1150);
        } 
        else if (contributionPoints == "86400pt"){
            setTimeout(() => {
                location.reload();
            }, 500);   
        }
        else if (contributionPoints == "256210pt"){
            setTimeout(() => {
                location.reload();
            }, 500);   
        }
        else if (loopCount < maxLoop) {
            setTimeout(func, 1150);
        }
    }

    setTimeout(func, 1000);
}

// #cnt-raid-information > div.btn-revival
function auto_revive() {
    const maxLoop = 50;
    const checkReviveBtn = () => $("#pop > div > div.prt-popup-body > div > div.prt-item-list > div:nth-child(1) > div.btn-event-use").length === 1;
    let loopCount = 0;

    const func = () => {
        loopCount++;

        if (checkReviveBtn()) {
            $("#pop > div > div.prt-popup-body > div > div.prt-item-list > div:nth-child(1) > div.btn-event-use").trigger("tap");
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

            setTimeout(quick_raid(), 3000);

            auto_revive();

            
            if (checkNoAutoBtn()){
                setTimeout(() => {
                    location.reload();
                }, 5000)
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

    setTimeout(() => run(l), 2000);
}

setTimeout(() => run(null), 2000);

window.hentci = {
    quest,
    raid,
    result,
    quick_raid
}