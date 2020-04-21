// init audio elements
var container = document.getElementById("container");
var nightElm = document.getElementById("night");
var playgroundElm = document.getElementById("playground");
var falafelElm = document.getElementById("falafel");
var carsElm = document.getElementById("cars");
var tomerElm = document.getElementById("tomer");
var ringlowestElm = document.getElementById("ringlowest");
var ringlowElm = document.getElementById("ringlow");
var ringmidElm = document.getElementById("ringmid");
var ringhighElm = document.getElementById("ringhigh");
var beachELm = document.getElementById("beach");
var suburbElm = document.getElementById("suburb");

var audioElms = [nightElm, playgroundElm, falafelElm, carsElm, tomerElm, ringlowestElm, ringlowElm, ringmidElm, ringhighElm, beachELm, suburbElm];


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