// ==UserScript==
// @name         dark team (for angel or light)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
// 4 fire 5 water 6 7 8 9 dark 3
// $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(5) > div.btn-supporter.lis-supporter.on > div.prt-button-cover").trigger("tap"); // water
// $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(4) > div.btn-supporter.lis-supporter.on > div.prt-button-cover").trigger("tap"); // fire

// $("#prt-type > div.icon-supporter-type-6.btn-type.selected.on > div").trigger("tap");
// $("#prt-type > div.icon-supporter-type-7.btn-type.selected.on > div").trigger("tap");
// $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div:nth-child(3) > div.prt-button-cover").trigger("tap");
// $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(7) > div.btn-supporter.lis-supporter.on > div.prt-button-cover").trigger("tap");
// $("").trigger("tap");
function quest() {
    $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(3) > div:nth-child(5) > div.prt-button-cover").trigger("tap");

    setTimeout(() => {
        $("#wrapper > div.contents > div.pop-deck.supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
    }, 3000);
}
$("#prt-command-top > div > div > div.lis-character0.btn-command-character.on > img").trigger("tap");
$("#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara1 > div.prt-ability-list > div.lis-ability.btn-ability-available.on > div.ico-ability562_3.ability-character-num-1-1 > img").trigger("tap");
$("#wrapper > div.contents > div.cnt-raid > div.prt-command-end > div").trigger("tap");
$("#prt-command-top > div > div > div.lis-character1.btn-command-character.on > img").trigger("tap");
$("#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara2 > div.prt-ability-list > div.lis-ability.btn-ability-available.on > div.ico-ability391_1.ability-character-num-2-3 > img").trigger("tap");
$("#wrapper > div.contents > div.cnt-raid > div.prt-command-end > div").trigger("tap");
$("").trigger("tap");
$("").trigger("tap");

function raid() {
    const checkAttBtn = () => $("#cnt-raid-information > div.btn-attack-start.display-on").length === 1;

    const maxLoop = 50;
    let loopCount = 0;

    const func = () => {
        loopCount++;

        if (checkAttBtn()) {
            $("#cnt-raid-information > div.btn-attack-start.display-on").trigger("tap");

            setTimeout(() => {
                $("#wrapper > div.contents > div.cnt-raid > div.btn-auto").trigger("tap");
            }, 1800);
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
    if (last !== "quest" && window.location.hash.search("#quest") !== -1) {
        quest();
        l = "quest";
    } else if (last !== "raid" && window.location.hash.search("#raid") !== -1) {
        raid();
        l = "raid";
    } else if (last !== "result" && window.location.hash.search("#result") !== -1) {
        result();
        l = "result";
    }

    setTimeout(() => run(l), 2000);
}

setTimeout(() => run(null), 2000);