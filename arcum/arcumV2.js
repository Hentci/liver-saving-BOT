// ==UserScript==
// @name         arcum_v2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
// 4 fire 5 water 6 7 8 9 dark 3
var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;
function replicard() {
    const checkQueBtn = () => $("#wrapper > div.contents > div.pop-deck.supporter.is-no-supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").length === 1;
    const maxLoop = 50;
    let loopCount = 0;
    const func = () => {
        loopCount++;

        if(checkQueBtn()) {
            console.log('OKOK')
            $("#wrapper > div.contents > div.pop-deck.supporter.is-no-supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");

            // setTimeout(() => {
            //     $("#wrapper > div.contents > div.pop-deck.supporter.is-no-supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            // }, 3000);

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
           // $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
             setTimeout(() => {
                 $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").trigger("tap");
             }, 500);
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
            setTimeout(func, 3000);
        }

        if (checkPopBtn()) {
            popOK();
            setTimeout(func, 2000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-retry.cnt-quest").trigger("tap");
            }, 5000);
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

const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
const checkNoAutoBtn = () => $("#cnt-raid-information > div.img-diagram.display-on").length > 0;

function run(last) {
    let l = null;
    if (window.location.hash.search("#replicard/supporter") !== -1) {
        if (last !== "replicard") {
            replicard();
        }
        l = "replicard";
    } else if (window.location.hash.search("#raid") !== -1) {
        if (last !== "raid") {
            raid();
        } else {

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
        }
        else{
            if (checkPopBtn()){
                console.log('pop BTN');
                setTimeout(popOK, 2000);
            }
        }
        l = "result";
    }

    setTimeout(() => run(l), 1500);
}

setTimeout(() => run(null), 1500);

window.hentci = {
    replicard,
    raid,
    result
}