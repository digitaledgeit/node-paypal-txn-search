var transactions = require('..');

transactions(require('./config.json')).search({STARTDATE: '2014-07-0T14:00:00Z', ENDDATE: '2015-06-30T14:00:00Z'}, function(err, txns) {
  if (err) return console.log(err);

  console.log('Count:', txns.length);
  console.log('Total: $', txns.map(function(txn) {
    if (txn.TYPE === 'Recurring Payment' && txn.STATUS === 'Completed') {
      return parseFloat(txn.AMT);
    } else {
      return 0;
    }
  }).reduce(function(a, b) {
    return a+b;
  }));

});