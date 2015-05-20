var debug   = require('debug')('paypal-txn-search');
var PayPal  = require('@digitaledgeit/paypal');

/**
 * PayPal transaction gateway
 * @constructor
 * @param   {PayPal|Object} client
 */
function TransactionSearch(client) {

  if (!(this instanceof TransactionSearch)) {
    return new TransactionSearch(client);
  }

  //create a new instance of the PayPal client with the config
  if (!(client instanceof PayPal)) {
    client = new PayPal(client);
  }

  /**
   * The PayPal client
   * @type {PayPal}
   */
  this.client = client;

}

/**
 * Search transactions
 * @param   {Object}                    params
 * @param   {function(Error, Object)}   callback
 * @returns {TransactionSearch}
 */
TransactionSearch.prototype.search = function(params, callback) {
  var self = this;

  debug('STARTDATE: %s ENDDATE: %s', params.STARTDATE, params.ENDDATE);

  this.client.exec('TransactionSearch', params, function(err, list) {
    if (err) return callback(err);

    //PayPal gives us the most recent 100 transactions so check if we need to fetch again, for older transactions
    if (list.ACK !== 'Success') {

      params.ENDDATE = list[list.length-1].TIMESTAMP; //TODO: add a second so we don't get dupes

      self.search(params, function(err, otherList) {
        if (err) return callback(err);
        callback(null, list.concat(otherList));
      });

    } else {
      callback(null, list);
    }

  });

  return this;
};

module.exports = TransactionSearch;