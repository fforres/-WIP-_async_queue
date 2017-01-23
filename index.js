var data = require('./data.json');
var worker = function(el, _cb) {
  var randomTime =  Math.floor(Math.random() * 1000) * Math.random() * Math.random();
  var _el = el;
  setTimeout(function() {
    console.log(_el)
    _cb();
  }.bind(this), randomTime);
}

function asyncQueue(data) {
  this.queue = data;
  this.amountOfWorkers = 2;
  this.workers = [];
  this.worker = null;
  this.index = 0;
}

asyncQueue.prototype.createWorker = function(cb) {
  this.worker = cb.bind(this);
  return this;
}
asyncQueue.prototype.addWorker = function() {
  this.amountOfWorkers += 1;
  return this;
}
asyncQueue.prototype.ensureWorkers = function() {
  while(this.workers.length < this.amountOfWorkers) {
    if(typeof worker === 'function') {
      this.workers.push(worker);
    } else {
      throw new Error('Worker is not a function')
    }
  }
  return this;
}
asyncQueue.prototype.processQueue = function() {
  this.ensureWorkers();
  this.workers.forEach(function(worker) {
    this.runWorker(worker)
  }.bind(this))
  return this;
}

asyncQueue.prototype.runWorker = function(worker) {
  var data = this.queue.shift();
  if (data) {
    worker(data, function() {
      this.runWorker(worker)
    }.bind(this))
  }
}

var Q = new asyncQueue(data);
Q.createWorker(worker).processQueue()
