// ==UserScript==
// @name         arcum_boss
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
            setTimeout(func, 500);
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
            setTimeout(func, 3000);
        } else {
            setTimeout(() => {
                $("#cnt-result > div.prt-result-cnt > div.prt-button-area.upper > div.btn-retry.cnt-quest").trigger("tap");
            }, 5000);
        }
    }
    
    func();
}

function clickArcumBoss() {
    const checkBoss = () => $("#cnt-division > div > div.prt-division-list > div > div.prt-quest-list.btn-quest-list.event-target").length === 1

    const maxLoop = 50;
    let loopCount = 0;

    const func = () => {
        if(checkBoss()){
            $("#cnt-division > div > div.prt-division-list > div > div.prt-quest-list.btn-quest-list.event-target").trigger("tap");
            setTimeout(() => {
                $("#pop > div > div.prt-popup-footer > div.btn-offer").trigger("tap");
            }, 2000);
        } else if (loopCount < maxLoop){
            setTimeout(func, 500);
        }
    }

    func();
}

const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");

function run(last) {
    let l = null;
    if (window.location.hash.search("#replicard/supporter") !== -1) {
        if (last !== "replicard/supporter") {
            replicard();
        }
        l = "replicard/supporter";
    } else if (window.location.hash.search("#raid") !== -1) {
        if (last !== "raid") {
            raid();
        }
        l = "raid";
    } else if (window.location.hash.search("#result") !== -1) {
        if (last !== "result") {
            result();
        }
        else{
            if (checkPopBtn()){
                console.log('pop BTN');
                setTimeout(popOK, 5000);
            }
        }
        l = "result";
    } else if(window.location.hash.search("#replicard/stage") !== -1){
        if(last !== "replicard/stage") {
            clickArcumBoss();
        }
        l = "replicard/stage"
    }

    setTimeout(() => run(l), 1000);
}

setTimeout(() => run(null), 1000);

window.hentci = {
    replicard, 
    raid,
    result,
    clickArcumBoss
}