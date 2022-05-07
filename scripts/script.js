import { suffix } from "../data/suffix.js";
import { prefix } from "../data/prefix.js";

var level = document.querySelector('#level');
var suffixButton = document.querySelector("input[name=suffix-checkbox]");
var prefixButton = document.querySelector("input[name=prefix-checkbox]");
var idolsButton = document.querySelector("input[name=idols-checkbox]");
var equipmentButton = document.querySelector("input[name=equipment-checkbox]");
var levelInput = 100;
var root = document.getElementById("results");
var radio = document.getElementsByName("presets");

var suffixEnable = true;
var prefixEnable = true;
var idolsEnable = true;
var equipmentEnable = true;

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
        suffixEnable = true;
        Result(levelInput);
    } else {
        suffixEnable = false;
        Result(levelInput);
    }
});

prefixButton.addEventListener('change', function () {
    if (this.checked) {
        prefixEnable = true;
        Result(levelInput);
    } else {
        prefixEnable = false;
        Result(levelInput);
    }
});

idolsButton.addEventListener('change', function () {
    if (this.checked) {
        idolsEnable = true;
        Result(levelInput);
    } else {
        idolsEnable = false;
        Result(levelInput);
    }
});

equipmentButton.addEventListener('change', function () {
    if (this.checked) {
        equipmentEnable = true;
        Result(levelInput);
    } else {
        equipmentEnable = false;
        Result(levelInput);
    }
});

if (prefixEnable == false && suffixEnable == false) {
    initCharts(0, 0, 0, 0, 1);
}

/* Radio button event */
for (var i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', function () {
        level.value = ""; // Reset level input value
        if (this.className == "ruined-radio") {
            Result(19);
            levelInput = 19;
        }
        if (this.className == "zerrick-radio") {
            Result(23);
            levelInput = 23;
        }
        if (this.className == "frostroot-radio") {
            Result(34);
            levelInput = 34;
        }
        if (this.className == "majasa-radio") {
            Result(40);
            levelInput = 40;
        }
        if (this.className == "lvl100-radio") {
            Result(100);
            levelInput = 100;
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
    if (levelInput > 0 && (suffixEnable == true || prefixEnable == true) && (idolsEnable == true || equipmentEnable == true)) {

        /* Sort and print results */
        console.log("///////////////////////////////");
        console.log("Area lvl : " + levelInput);
        console.log("///////////////////////////////");

        if (suffixEnable == true) {
            var suffixSort = suffixBuffer.filter(o => o.level <= levelInput);
        }
        if (suffixEnable == false) {
            var suffixSort = "";
        }
        if (prefixEnable == true) {
            var prefixSort = prefixBuffer.filter(o => o.level <= levelInput);
            var sort = prefixSort.concat(suffixSort);
        }
        if (prefixEnable == false) {
            var prefixSort = "";
            var sort = suffixSort.concat(prefixSort);
        }


        if (idolsEnable == true) {
            var idolSort = sort.filter(o => o.type == "Idols");
        }
        if (idolsEnable == false) {
            var idolSort = "";
        }
        if (equipmentEnable == true) {
            var equipmentSort = sort.filter(o => o.type == "Equipment");
            var sort = equipmentSort.concat(idolSort);
        }
        if (equipmentEnable == false) {
            var equipmentSort = "";
            var sort = idolSort.concat(equipmentSort);
        }

        console.log(sort)

        console.log("Idol nbr = " + idolSort.length);
        console.log("Equipment nbr = " + equipmentSort.length);

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
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        
        var data = google.visualization.arrayToDataTable([
            ['Type', 'Affix number'],
            ['Self', self],
            ['Minion', minion],
            ['Minion & Self', minionself],
            ['Totem', totem]
        ]);

        var options = {
            title: '',
            legend: {position: 'right'}
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
}