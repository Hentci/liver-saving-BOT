// ==UserScript==
// @name         auto auto water
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
    const checkQueBtn = () => $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child(1) > div.prt-button-cover").length === 1;
    const maxLoop = 50;
    let loopCount = 0;
    const func = () => {
        loopCount++;
        
        // #cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type2.selected > div:nth-child(3) > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name
        if(checkQueBtn()) {
            // $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div:nth-child(1) > div.prt-button-cover").trigger("tap");
            var noSpecifySummon = true;
            for(var i = 1;i <= 15;i++){
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

            setTimeout(() => {
                $("#wrapper > div.contents > div.pop-deck.supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 3000);
        } else if(loopCount < maxLoop){
            setTimeout(func, 100);
        }
    }
    func();
}

function raid() {

    const checkBGBtn = () => $("#wrapper > div.contents > div.cnt-raid > div.prt-start-direction > div.prt-black-bg").length === 1;

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

function result() {
    const popOK = () => $("#pop > div > div.prt-popup-footer > div").trigger("tap");
    const checkPopBtn = () => $("#pop > div > div.prt-popup-footer > div").length > 0;
    const func = () => {
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
    if (window.location.hash.search("#quest") !== -1) {
        if (last !== "quest") {
            quest();
        }
        l = "quest";
    } else if (window.location.hash.search("#raid") !== -1) {
        if (last !== "raid") {
            raid();
        }
        l = "raid";
    } else if (window.location.hash.search("#result") !== -1) {
        if (last !== "result") {
            result();
        }
        l = "result";
    }

    setTimeout(() => run(l), 2000);
}

setTimeout(() => run(null), 2000);

window.hentci = {
    quest, 
    raid,
    result
}