var i = document.createElement('iframe');
i.style.display = 'none';
document.body.appendChild(i);
window.console = i.contentWindow.console;

const contribution = document.querySelector("#wrapper > div.contents > div.cnt-raid > div.cnt-multi > div.prt-mvp > div > div.txt-point");
const contributionPoints = contribution.textContent;
console.log(contributionPoints);