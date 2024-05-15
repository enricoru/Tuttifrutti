const trackBtn = document.getElementById('track-btn');

trackBtn.onclick = () => {

    console.log('trackBtn pressetd');

    if (window.Worker) {
        console.log('Message posted to worker');
        const myWorker = new Worker("dove.js");
        myWorker.postMessage();
     

    } else {
        console.log('Your browser doesn\'t support web workers.');
    }
}
