// worker.js
function heavyCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += Math.sqrt(i);
    console.log("ww i: ", i, ", sum: ", sum )
  }
  return sum;
}

self.onmessage = function(event) {
  const number = event.data;
  const result = heavyCalculation(number);
  self.postMessage(result);
};