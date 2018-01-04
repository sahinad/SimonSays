var random; //Holds the next button that will light up
var circle = document.getElementsByClassName("btn-circle"); //Array of circle buttons
var series = new Array(); //Holds order of buttons that light up
var clicked = new Array(); //Holds the clicked buttons
var clickCount = 0; //Keeps track of click count

/* Button Sounds */
var redSound = new Audio("Audios/red.mp3");
var blueSound = new Audio("Audios/blue.mp3");
var yellowSound = new Audio("Audios/yellow.mp3");
var greenSound = new Audio("Audios/green.mp3");

//Start Button On-Off Function
function startButton() {
    if ($("#start-event").prop("checked")) {
        $("#turn").text("01");
        setTimeout(callButton, 1000);
    }
    else {
        $("#turn").text("--");
        deactivateButtons();
        series = [];
        clickCount = 0;
        clicked = [];
        //Stops lighting up the buttons
        execNewSeries = clearTimeout(execNewSeries);
        exe = clearTimeout(exe);
    }
}

//Reset Button Function
$("#reset").click(function () {
    if ($("#start-event").prop("checked")) {
        deactivateButtons();
        series = [];
        clicked = [];
        clickCount = 0;
        $("#turn").text("01");
        //Stops lighting up the buttons
        exe = clearTimeout(exe);
        execNewSeries = clearTimeout(execNewSeries);
        setTimeout(callButton, 2000); //Starts the game again
    }
});

function randomNumber() {
    random = Math.floor(Math.random() * 4);
    series.push(random);
    return random;
}

function removeLight() {
    $('.btn-circle').removeClass('light');
}

function callButton() {
    switch (randomNumber()) {
        case 0:
            redSound.play();
            $('.btn-red').addClass("light");
            setTimeout(removeLight, 500);
            break;
        case 1:
            blueSound.play();
            $('.btn-blue').addClass("light");
            setTimeout(removeLight, 500);
            break;
        case 2:
            yellowSound.play();
            $('.btn-yellow').addClass("light");
            setTimeout(removeLight, 500);
            break;
        case 3:
            greenSound.play();
            $('.btn-green').addClass("light");
            setTimeout(removeLight, 500);
            break;
    }

    setTimeout(activateButtons, 1000);
}

function activateButtons() {

    $("div .btn-red").click(function () {
        redSound.play();
        $(this).addClass("light");
        clicked.push(0);
        setTimeout(removeLight, 500);
        clickCount++;
        compare(clickCount - 1);
    });

    $("div .btn-blue").click(function () {
        blueSound.play();
        $(this).addClass("light");
        clicked.push(1);
        setTimeout(removeLight, 500);
        clickCount++;
        compare(clickCount - 1);
    });

    $("div .btn-yellow").click(function () {
        yellowSound.play();
        $(this).addClass("light");
        clicked.push(2);
        setTimeout(removeLight, 500);
        clickCount++;
        compare(clickCount - 1);
    });

    $("div .btn-green").click(function () {
        greenSound.play();
        $(this).addClass("light");
        clicked.push(3);
        setTimeout(removeLight, 500);
        clickCount++;
        compare(clickCount - 1);
    });
}

//Buttons lose their click function
function deactivateButtons() {
    $("div .btn-red").unbind("click");
    $("div .btn-blue").unbind("click");
    $("div .btn-yellow").unbind("click");
    $("div .btn-green").unbind("click");
}

//Lights up the buttons in the recorded order
function callSeries() {
    var i = 0, howManyTimes = series.length;
    function f(i) {
        setTimeout(function () {
            switch (series[i]) {
                case 0:
                    redSound.play();
                    $('.btn-red').addClass("light");
                    setTimeout(removeLight, 500);
                    break;
                case 1:
                    blueSound.play();
                    $('.btn-blue').addClass("light");
                    setTimeout(removeLight, 500);
                    break;
                case 2:
                    yellowSound.play();
                    $('.btn-yellow').addClass("light");
                    setTimeout(removeLight, 500);
                    break;
                case 3:
                    greenSound.play();
                    $('.btn-green').addClass("light");
                    setTimeout(removeLight, 500);
                    break;
            }
            i++;
            if (i < howManyTimes) {
                f(i);
            }
        }, 1000);
    }
    f(i);
}

//Lights up the buttons in the recorded order and adds new button randomly to the series
function callSeriesAndNewButton() {

    callSeries();
    exe = setTimeout(callButton, 1000 * series.length + 1000);
}

var turnText;

//Compares the buttons you clicked whether are in the correct order
function compare(x) {
    turnText = $("#turn").text();

    //If strict mode OFF
    if (!$("#strict-event").prop("checked") && series[x] !== clicked[x]) {
        deactivateButtons();
        $("#turn").text("!!");
        clicked = [];
        clickCount = 0;
        setTimeout(function () { $("#turn").text(turnText); }, 2000);
        setTimeout(callSeries, 3000);
        setTimeout(activateButtons, 1000 * series.length + 4000);
    }
    //If strict mode ON
    else if ($("#strict-event").prop("checked") && series[x] !== clicked[x]) {
        deactivateButtons();
        $("#turn").text("!!");
        series = [];
        clicked = [];
        clickCount = 0;
        setTimeout(function () { $("#turn").text("01"); }, 2000);
        execCallButton = setTimeout(callButton, 3000);
    }
    else {
        if (series.length === clickCount && turnText === "20") {
            setTimeout(congrats, 1000);
            $("#start-event").prop("checked", false).change();
            turnText = "--";
        }
        else if (series.length === clickCount) {
            deactivateButtons();
            //Increases the number on the screen
            var a = turnText.split("");
            if (a[1] === 9 && a[0] === 0) {
                a[0] = 1;
                a[1] = 0;
            }
            else if (a[1] === 9 && a[0] === 1) {
                a[0] = 2;
                a[1] = 0;
            }
            else {
                a[1] = parseInt(a[1]) + 1;
            }

            a = a.join('');
            $("#turn").text(a);
            clicked = [];
            clickCount = 0;
            execNewSeries = setTimeout(callSeriesAndNewButton, 2000);
        }
    }
}

/* When the player wins */

var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var win = new Audio("Audios/Woohoo!.wav");

function congrats() {
    modal.style.display = "block";
    win.play();
}

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};