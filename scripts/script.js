import { suffix } from "../data/suffix.js";


var level = document.querySelector('#level');
var suffixButton = document.getElementById("suffix-checkbox");
var levelInput = null;

var root = document.getElementById("results");


level.addEventListener('input', updateLevel);


initialResults()

/* initial result */
function initialResults() {
    var self = suffix.filter(o => o.tag === "Self").length;
    var minion = suffix.filter(o => o.tag === "Minion").length;
    var minionself = suffix.filter(o => o.tag === "Minion & Self").length;

    var selfDiv = document.createElement("div");
    selfDiv.classList.add("affixResult");
    var selfContent = document.createTextNode('Number of affixes for self : ' + self);
    selfDiv.appendChild(selfContent);
    root.parentNode.insertBefore(selfDiv, root);

    var minionDiv = document.createElement("div");
    minionDiv.classList.add("affixResult");
    var minionContent = document.createTextNode('Number of affixes for minions : ' + minion);
    minionDiv.appendChild(minionContent);
    root.parentNode.insertBefore(minionDiv, root);

    var minionselfDiv = document.createElement("div");
    minionselfDiv.classList.add("affixResult");
    var minionselfContent = document.createTextNode('Number of affixes for minions & self : ' + minionself);
    minionselfDiv.appendChild(minionselfContent);
    root.parentNode.insertBefore(minionselfDiv, root);

}





/*Sorting the data by level */
suffix.sort(function (a, b) {
    return a.level - b.level;
});

function updateLevel(e) {
    console.log(document.querySelector('#level').value)
    levelInput = parseInt(e.target.value);
    Result();
}

function Result() {
    if (levelInput > 0) {
        /* Clear affix result */
        clear()

        /* Sort and print results */
        console.log("///////////////////////////////");
        console.log("Area lvl : " + levelInput);
        console.log("///////////////////////////////");
        var sort = suffix.filter(o => o.level <= levelInput);
        var self = sort.filter(o => o.tag === "Self").length;
        console.log("Self = " + self);
        var minion = sort.filter(o => o.tag === "Minion").length;
        console.log("Minion = " + minion);
        var minionself = sort.filter(o => o.tag === "Minion & Self").length;
        console.log("Minion & Self = " + minionself);

        /* insert results */
        var selfDiv = document.createElement("div");
        selfDiv.classList.add("affixResult");
        var selfContent = document.createTextNode('Number of affixes for self : ' + self);
        selfDiv.appendChild(selfContent);
        root.parentNode.insertBefore(selfDiv, root);

        var minionDiv = document.createElement("div");
        minionDiv.classList.add("affixResult");
        var minionContent = document.createTextNode('Number of affixes for minions : ' + minion);
        minionDiv.appendChild(minionContent);
        root.parentNode.insertBefore(minionDiv, root);

        var minionselfDiv = document.createElement("div");
        minionselfDiv.classList.add("affixResult");
        var minionselfContent = document.createTextNode('Number of affixes for minions & self : ' + minionself);
        minionselfDiv.appendChild(minionselfContent);
        root.parentNode.insertBefore(minionselfDiv, root);

        /*for (let x = 0 ; x < sort.length ; x++) {
            console.log(sort[x].level);
        }*/
        //var result = suffix;

    } else {
        console.log("Nothing in input")
        clear()
        initialResults();
    }
}

function clear() {
    const elements = document.getElementsByClassName("affixResult");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}