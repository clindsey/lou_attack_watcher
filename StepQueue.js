var Webpage = require('webpage');

var StepQueue = function() {
  this.steps = [];
  
  var page_settings = {
      width: 1024,
      height: 768,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    };

  this.page = new WebPage(page_settings);

  var self = this;

  this.page.onConsoleMessage = function(msg) {
    console.log(msg);
  };

  this.page.onLoadStarted = function() {
    self.load_in_progress = true;
    console.log("page load started");
  };

  this.page.onLoadFinished = function() {
    self.load_in_progress = false;
    console.log("page load finished");
  };
};

StepQueue.prototype.start = function(freq) {
  this.load_in_progress = false;
  this.index = 0;

  var self = this;

  this.interval = setInterval(function() {
    self.step();
  }, freq);
};

StepQueue.prototype.step = function() {
  if(this.index > this.steps.length - 1){
    console.log("steps complete!");
    clearInterval(this.interval);
    phantom.exit();
  } else if(this.load_in_progress === false){
    console.log("step " + (this.index + 1) + " : " + this.steps[this.index].desc);
    var cont = this.steps[this.index].step(this.page);
    if(cont){
      this.index += 1;
    }
  }
};

StepQueue.prototype.add = function(desc, step) {
  this.steps.push({'desc': desc, 'step': step});
};

exports.StepQueue = StepQueue;