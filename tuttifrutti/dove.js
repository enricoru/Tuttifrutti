

const trackBtn = document.getElementById('track-btn');
const downloadBtn = document.getElementById('download');
const log = document.getElementById('log');

let isTracking = false;
let trackingIntervalId;
let currentData;
let myWorker;
if (window.Worker) {
  if(typeof(myWorker) == "undefined") {
    myWorker = new Worker("worker.js");
  }

//  [first, second].forEach(input => {
//    input.onchange = function() {
//      myWorker.postMessage([first.value, second.value]);
//      console.log('Message posted to worker');
//    }
//  })

//  myWorker.onmessage = function(e) {
//    result.textContent = e.data;
//    console.log('Message received from worker');
//  }
} else {
  console.log('Your browser doesn\'t support web workers.');
}

trackBtn.onclick = () => {
  downloadBtn.style.display = 'inline-block';

  if (isTracking) {
    stopTrack();
  } else {
    startTrack();
  }
}
downloadBtn.onclick = () => {
  download('tuttifrutti.json', JSON.stringify(currentData));
}

function stopTrack() {
  isTracking = false;
  window.clearInterval(trackingIntervalId)
}

function startTrack() {
  myWorker.postMessage("message_1");
  console.log('Message posted to worker');
  var interval = document.getElementById('interval').value * 1000;
  //  const interval = document.getElementById('interval').getAttribute('value');
  if (interval > 0) {
    currentData = [];
    trackingIntervalId = window.setInterval(() => {
      collectEntry();
      log.innerText = currentData.slice(-10).map(JSON.stringify).reverse().join(',\n');
    }, interval);
  }
  isTracking = true;
}

function collectEntry() {
  navigator.geolocation.getCurrentPosition(position => {
    currentData.push(toObj(position.coords.latitude + " - " + position.coords.longitude + " - " + Date(position.coords.timestamp).toString()))
  });
  return;
}


function toObj(obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  const tmp = (obj instanceof Array) ? [] : {};
  for (const key in obj) {
    tmp[key] = toObj(obj[key]);
  }
  return tmp;
}

function download(filename, stringData) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringData));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
