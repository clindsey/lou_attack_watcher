var StepQueue = require('./StepQueue.js').StepQueue;

var queue = new StepQueue();

queue.add('load welcome page', function(page) {
  page.open('http://www.lordofultima.com/en');

  return true;
});

queue.add('load login page', function(page) {
  page.open('http://www.lordofultima.com/en');

  return true;
});

queue.add('logging in', function(page) {
  page.evaluate(function() {
    document.getElementById('login-username').value = ''; // YOUR EMAIL HERE
    document.getElementById('login-password').value = ''; // YOUR PASSWORD HERE
    document.getElementById('top-login-form').submit();
  });

  return true;
});

queue.add('joining game', function(page) {
  page.evaluate(function() {
    document.getElementsByClassName('continuegame')[0].getElementsByClassName('inner')[0].click();
  });

  return true;
});

queue.add('waiting for game load', function(page) {
  var rtn = false;
  page.evaluate(function() {
    var attack_div = document.evaluate('/html/body/div[3]/div/div[1]/div/div[1]/div/div/div/div[2]/div/div[7]/div/div[12]/div', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if(attack_div){
      var attack_count = attack_div.innerHTML;
      console.log('attack count: ' + attack_count);

      rtn = true;
    } else{
      console.log('page still loading');
    }
  });
  page.render('page.png');

  return rtn;
});

queue.start(1000 / 2);