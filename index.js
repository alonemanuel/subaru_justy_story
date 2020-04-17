
// init audio elements
var container = document.getElementById("container");
var tr0PlaygroundElm = document.getElementById("tr0_playground");
var tr1FalafelElm = document.getElementById("tr1_falafel");
var tr2CarsElm = document.getElementById("tr2_cars");
var tr3RingElm = document.getElementById("tr3_ring");
var tr4BeachElm = document.getElementById("tr4_beach");
var audioElms = [tr0PlaygroundElm, tr1FalafelElm, tr2CarsElm, tr3RingElm, tr4BeachElm];

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
        elm.volume=1;
    }
}

window.document.addEventListener('click', function () {
    // playfirst();

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
    console.log("Clicked and isMuted is now: " + isMuted);
});


container.addEventListener('scroll', function () {
    currHeight = container.scrollTop;
    let newFrame = Math.max(Math.min(Math.floor((currHeight + HEIGHT_ACCURACY_FACTOR) / sectionHeight), LAST_SEC_INDEX) - 1, 0);
    if (!isMuted) {
        if (newFrame !== currFrame) {
            console.log("Pausing frame " + currFrame + " and playing frame " + newFrame);
            audioElms[currFrame].pause();
            audioElms[newFrame].play();
        }
    }
    console.log("currf: " + currFrame);
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