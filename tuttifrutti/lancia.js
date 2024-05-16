const trackBtn = document.getElementById('track-btn');
const downloadBtn = document.getElementById('download');

trackBtn.onclick = () => {

    console.log('trackBtn pressetd');

    if (window.Worker) {
        console.log('Message posted to worker');
        const myWorker = new Worker("dove.js");
        myWorker.postMessage("track");
     

    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
}
