import { suffix } from "../data/suffix.js";
import { prefix } from "../data/prefix.js";

var level = document.querySelector('#level');
var suffixButton = document.querySelector("input[name=suffix-checkbox]");
var levelInput = 100;
var root = document.getElementById("results");
var radio = document.getElementsByName("presets");

var suffixEnable = true;

/*Sorting the data by level */
suffix.sort(function (a, b) {
    return a.level - b.level;
});

prefix.sort(function (a, b) {
    return a.level - b.level;
});


var suffixBuffer = suffix;
var prefixBuffer = prefix;

/* Show stats at lvl 100 when loading page */
Result(100);


/* Event listener */
level.addEventListener('input', levelChanged);
suffixButton.addEventListener('change', function () {
    if (this.checked) {
        console.log("checked")
        suffixEnable = true;
        Result(levelInput);
    } else {
        console.log("unchecked")
        suffixEnable = false;
        initCharts(0, 0, 0, 0, 1);
    }
});

/* Radio button event */
for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', function () {
        level.value = ""; // Reset level input value
        if (this.className == "ruined-radio") {
            Result(19);
        }
        if (this.className == "zerrick-radio") {
            Result(23);
        }
        if (this.className == "frostroot-radio") {
            Result(34);
        }
        if (this.className == "majasa-radio") {
            Result(40);
        }
        if (this.className == "lvl100-radio") {
            Result(100);
        }
    });
}

// Manage Values in Area level & reset radio buttons
function levelChanged(e) {
    console.log((/^[0-9]*$/).test(e.target.value));
    if ((/^[0-9]*$/).test(e.target.value) == true) {
        levelInput = parseInt(e.target.value);
    } else {
        levelInput = ""
    }

    for (var i = 0, max = radio.length; i < max; i++) {
        radio[i].checked = false;
    }
    Result(levelInput);
}

// Update the data
function Result(levelInput) {
    if (levelInput > 0 && suffixEnable == true) {

        /* Sort and print results */
        console.log("///////////////////////////////");
        console.log("Area lvl : " + levelInput);
        console.log("///////////////////////////////");
        var suffixSort = suffixBuffer.filter(o => o.level <= levelInput);
        var prefixSort = prefixBuffer.filter(o => o.level <= levelInput);
        console.log("Nbr of prefix = " + prefixSort.length);
        console.log("Nbr of suffix = " + suffixSort.length);
        var sort = suffixSort.concat(prefixSort);
        var self = sort.filter(o => o.tag === "Self").length;
        console.log("Self = " + self);
        var minion = sort.filter(o => o.tag === "Minion").length;
        console.log("Minion = " + minion);
        var minionself = sort.filter(o => o.tag === "Minion & Self").length;
        console.log("Minion & Self = " + minionself);
        var totem = sort.filter(o => o.tag === "Totem").length;
        console.log("Totem = " + totem);

        initCharts(self, minion, minionself, totem, sort.length);

    } else {
        console.log("Nothing in input")
        initCharts(0, 0, 0, 0, 1);
    }
}

// Render Pie Chart
function initCharts(self, minion, minionself, totem, sort) {

    var chart = new CanvasJS.Chart("chartContainer", {
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "#.##%",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: self / sort, label: "Self" },
                { y: minion / sort, label: "Minion" },
                { y: minionself / sort, label: "Minion & Self" },
                { y: totem / sort, label: "Totem" }
            ]
        }]
    });
    chart.render();
}