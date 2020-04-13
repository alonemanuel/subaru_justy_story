console.log("etnere");
var container = document.getElementById('container');
var audioElm = document.getElementById("scrollaudio")[0];
container.addEventListener('scroll', function () {
    console.log(audioElm.volume);
    audioElm.volume = 1 - window.scrollTop() / height;
    height = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
});
var height;
window.document.addEventListener('click', function () {
    console.log('here');
});


