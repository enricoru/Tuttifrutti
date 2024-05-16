
let currentData;
let pos;

function collectEntry() {
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition();
  }
  else {
    console.log('geolocation not supported');
  }
  navigator.geolocation.getCurrentPosition(position => {
    currentData.push(toObj(position.coords.latitude + " - " + position.coords.longitude + " - " + Date(position.coords.timestamp).toString()))
  });
  return;
}
onmessage = function(e) {
  console.log('Worker: Message received from main script');
  var interval = e.data;
  if (interval > 0) {
    currentData = [];
    trackingIntervalId = setInterval(() => {
      collectEntry();
      pos = currentData.slice(-10).map(JSON.stringify).reverse().join(',\n');
    }, interval);
    }  
  isTracking = true;

  postMessage(pos);
}  

