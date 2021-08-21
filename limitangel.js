// ==UserScript==
// @name         limitangel
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

function restoreConsole() {
    var i = document.createElement('iframe');
    i.style.display = 'none';
    document.body.appendChild(i);
    window.console = i.contentWindow.console;
}

function delay(msec) {
    return new Promise((res) => {
        setTimeout(res, msec);
    });
}

function waitUntilTrue(maxLoop, checker) {
    return new Promise((resolve, reject) => {

        let loopCount = 0;

        const func = () => {
            loopCount++;

            if (checker()) {
                resolve();
            } else if (loopCount < maxLoop) {
                setTimeout(func, 100);
            } else {
                reject("timeout");
            }
        }
        func();
    });
}

function waitOpaqueMask() {
    const checker = () => !$("#opaque-mask") || ($("#opaque-mask").attr("style") && $("#opaque-mask").attr("style").search("display: none") !== -1);

    return waitUntilTrue(100, checker)
        .then(() => delay(3000));
}

async function raidend(maxLoop = 70) {
    const checkNextBtn = () => $("#wrapper > div.contents > div.cnt-raid > div.prt-command-end").attr("style") && $("#wrapper > div.contents > div.cnt-raid > div.prt-command-end").attr("style").search("display: block") !== -1;

    try {
        await waitUntilTrue(maxLoop, checkNextBtn);
        $("#wrapper > div.contents > div.cnt-raid > div.prt-command-end > div").trigger("tap");
    } catch (reason) {
        throw `raidend ${reason}`;
    }
}

async function doSkill(maxLoop, characterPath, abilityPath) {
    console.log("doing skill", characterPath, abilityPath);

    const checkCharacter = () => $(characterPath).length === 1;
    const checkAbility = () => $(abilityPath).length === 1;

    try {
        await waitUntilTrue(maxLoop, checkCharacter);
        console.log("click character");
        $(characterPath).trigger("tap");
        await delay(3000);
        await waitUntilTrue(maxLoop, checkAbility);
        console.log("click ability");
        $(abilityPath).trigger("tap");
    } catch (reason) {
        throw `doSkill ${reason}`;
    }
}

function quest() {
    const checkQueBtn = () => $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(8) > div:nth-child(1) > div.prt-button-cover").length === 1;
    const maxLoop = 50;
    let loopCount = 0;
    const func = () => {
        loopCount++;

        if(checkQueBtn()) {
            $("#cnt-quest > div.prt-supporter-list.prt-module > div:nth-child(8) > div:nth-child(1) > div.prt-button-cover").trigger("tap");

            setTimeout(() => {
                $("#cnt-quest > div.pop-deck.supporter > div.prt-btn-deck > div.btn-usual-ok.se-quest-start").trigger("tap");
            }, 3000);
        } else if(loopCount < maxLoop){
            setTimeout(func, 100);
        }
    }
    
    func();
}

// $("#prt-command-top > div > div > div.lis-character0.btn-command-character > img").trigger("tap");
// $("#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara1 > div.prt-ability-list > div.lis-ability.btn-ability-available > div.ico-ability562_3.ability-character-num-1-1 > img").trigger("tap");
// $("#wrapper > div.contents > div.cnt-raid > div.prt-command-end > div").trigger("tap");
// $("#prt-command-top > div > div > div.lis-character1.btn-command-character > img").trigger("tap");
// $("#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara2 > div.prt-ability-list > div.lis-ability.btn-ability-available > div.ico-ability391_1.ability-character-num-2-3 > img").trigger("tap");
// $("#wrapper > div.contents > div.cnt-raid > div.prt-command-end > div").trigger("tap");
// $("").trigger("tap");

function raid() {
    const skill = [
        {
            character: "#prt-command-top > div > div > div.lis-character2.btn-command-character > img",
            ability: "#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara3 > div.prt-ability-list > div:nth-child(1) > div.ability-character-num-3-1 > img",
        },
        // {
        //     character: "#prt-command-top > div > div > div.lis-character1.btn-command-character > img",
        //     ability: "#wrapper > div.contents > div.cnt-raid > div.prt-command > div.prt-command-chara.chara2 > div.prt-ability-list > div:nth-child(3) > div.ability-character-num-2-3 > img",
        // },
    ];

    const func = (skillIdx) => {
        if (skillIdx >= skill.length) return;

        delay(3000)
            .then(() => waitOpaqueMask())
            .then(() => {
                console.log("opaque mask off");
                return Promise.resolve();
            })
            .then(() => doSkill(50, skill[skillIdx].character, skill[skillIdx].ability))
            .then(() => raidend(100))
            .then(() => {
                func(skillIdx + 1);
            }).catch((reason) => {
                console.log("raid", reason);
            });
    }

    func(0);
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
restoreConsole();

window.hentci = {
    quest,
    raid,
    result
}