// init audio elements
var container = document.getElementById("container");
var tr0NightElm = document.getElementById("tr0_night");
var tr1PlaygroundElm = document.getElementById("tr1_playground");
var tr2FalafelElm = document.getElementById("tr2_falafel");
var tr3CarsElm = document.getElementById("tr3_cars");
var tr4RingElm = document.getElementById("tr4_ringing");
var tr41RingElm = document.getElementById("tr4_ringing");
var tr42RingElm = document.getElementById("tr4_ringing");
var tr43RingElm = document.getElementById("tr4_ringing");
var tr5BeachElm = document.getElementById("tr5_beach");
var tr6SuburbElm = document.getElementById("tr6_suburb");
var audioElms = [tr0NightElm, tr1PlaygroundElm, tr2FalafelElm, tr3CarsElm, tr4RingElm, tr41RingElm, tr42RingElm, tr43RingElm, tr5BeachElm, tr6SuburbElm];

// init scripting variables
var isMuted = true;
var numOfSections = container.getElementsByTagName('section').length;
var numOfFrames = numOfSections - 1;

var pageHeight = numOfSections * container.offsetHeight;
var sectionHeight = pageHeight / numOfSections;
var currFrame = 0;
var currHeight = 0;
var inInit = true;
const LAST_SEC_INDEX = numOfFrames;
const HEIGHT_ACCURACY_FACTOR = 100;


function unmuteAll() {
    for (let elm of audioElms) {
        elm.muted = false;
        elm.volume = 1;
    }
}

function lower_frame3() {
    let currVol = tr31RingElm.volume / 2;
    for (let elm in [tr31RingElm, tr32RingElm, tr33RingElm]) {
        elm.volume = currVol;
        currVol = currVol / 2;
        // doesn't work

    }
}

window.document.addEventListener('click', function () {

    if (inInit) {
        unmuteAll();
        audioElms[currFrame].play();
        inInit = false;
    }

    isMuted = !isMuted;
    if (isMuted) {
        audioElms[currFrame].pause();
    } else {
        audioElms[currFrame].play();
    }
    showSnackBar();
});


container.addEventListener('scroll', function () {
    currHeight = container.scrollTop;
    let newFrame = Math.max(Math.min(Math.floor((currHeight + HEIGHT_ACCURACY_FACTOR) / sectionHeight), LAST_SEC_INDEX) - 1, 0);
    if (!isMuted) {
        if (newFrame !== currFrame) {
            audioElms[currFrame].pause();
            audioElms[newFrame].play();
            console.log("currf: " + currFrame);
        }
    }
    currFrame = newFrame;
});

function showSnackBar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.textContent = isMuted ? "muted" : "unmuted";
    x.className = "show";

    // After 1.5 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000);
}