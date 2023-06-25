// 選取符合 CSS 選擇器的元素\\
var summonNameElement = document.querySelector("#cnt-quest > div.prt-supporter-list.prt-module > div.prt-supporter-attribute.type2.selected > div:nth-child(3) > div.prt-supporter-info > div.prt-supporter-detail > div.prt-supporter-summon.js-prt-supporter-summon > span.js-summon-name");

// 確認元素存在並印出 summon-name 的內容
if (summonNameElement) {
  var summonName = summonNameElement.textContent;
  console.log(summonName);
} else {
  console.log('找不到指定的元素');
}