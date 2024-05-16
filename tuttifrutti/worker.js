onmessage = function(e) {
  console.log('Worker: Message received from main script');

  var interval = e * 1000;
  if (interval > 0) {
    currentData = [];
    trackingIntervalId = window.setInterval(() => {
      collectEntry();
      position = currentData.slice(-10).map(JSON.stringify).reverse().join(',\n');
    }, interval);
  
  isTracking = true;

  postMessage(position);
  
  //console.log(e);
 /* const result = e.data[0] * e.data[1];
  if (isNaN(result)) {
    postMessage('Please write two numbers');
  } else {
    const workerResult = 'Result: ' + result;
    console.log('Worker: Posting message back to main script');
    postMessage(workerResult);
  }*/
}
