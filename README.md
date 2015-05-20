# paypal-txn-search

Transaction search for the PayPal classic NVP API.

Takes care of pagination for you.

## Installation

    npm install --save @digitaledgeit/paypal-txn-search
    
## Usage

    var transactions = require('@digitaledgeit/paypal-txn-search');
    
    transactions(cfg).search({STARTDATE: '2014-07-0T14:00:00Z', ENDDATE: '2015-06-30T14:00:00Z'}, function(err, res) {
      if (err) return console.log(err);
      
      console.log('Count:', res.length);
      console.log('Total: $', res.map(function(txn) {
        if (txn.STATUS === 'Completed') {
          return parseFloat(txn.AMT);
        } else {
          return 0;
        }
      }).reduce(function(a, b) {
        return a+b;
      }));
      
    });

## API

### Methods

#### new TransactionQuery(paypal|config)

Create a new transaction query.

#### .search(params, callback)

Find all the transactions that meet the criteria.
    
## License

The MIT License (MIT)

Copyright (c) 2015 James Newell
    
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.