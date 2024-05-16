
let currentData;
let position;

function collectEntry() {
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
      position = currentData.slice(-10).map(JSON.stringify).reverse().join(',\n');
    }, interval);
    }  
  isTracking = true;

  postMessage(position);
}  

