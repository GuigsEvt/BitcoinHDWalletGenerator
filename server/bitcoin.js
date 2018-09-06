const validator = require('wallet-address-validator');
const bitcoin = require('bitcoinjs-lib');
const async = require('async');
const blockCypher = require('blockcypher');
const util = require('util');

//Block cypher object
const bcapi = new blockCypher('btc','main','1ebe95fa2ef04389aa5434f5362ad3ec');
let nodeTpriv;

module.exports = {
  checkBitcoinAddress: function(address) {
    return validator.validate(address, 'BTC');
  },
  deriveNode: function(neuteredNode, indexAddress) {
    let path = "m/0/" + indexAddress;
    let rawAddress = neuteredNode.derivePath(path);
    let address = rawAddress.getAddress();

    let isCorrectAddress = module.exports.checkBitcoinAddress(address);
    if(!isCorrectAddress) return undefined;
    return address;
  },
  getBalance: function(address, callback) {
    var amount = 0;
    bcapi.getAddrBal(address, {}, function(err, result) {
      //console.log(err);
      //console.log(result);
      callback(err, result);
    });
  },
  getWif: function(index, callback) {
    if(!nodeTpriv) {
      nodeTpriv = bitcoin.HDNode.fromBase58(process.env.bitcoinPriv);
      var path = 'm/0/' + index;
      var node = nodeTpriv.derivePath(path);
      return callback(node.keyPair.toWIF(), node.getAddress());
    } else {
      var path = 'm/0/' + index;
      var node = nodeTpriv.derivePath(path);
      return callback(node.keyPair.toWIF(), node.getAddress());
    }
  },
  createUnsignedTxHex: function (addressFrom, addressTo, amountAvailable, cb) {
    var tx = new bitcoin.TransactionBuilder();
    bcapi.getAddr(addressFrom, { unspentOnly : true }, function(err, utxos) {
      if(utxos.total_received == 0) {
        console.log('You cannot send funds from this address. The address is empty.');
        callback(true);
      } else {
        async.forEach(utxos.txrefs, function (item, callback) {
          tx.addInput(item.tx_hash, item.tx_output_n)
          callback();
        }, function (err) {
          // fees set up to 5000
          tx.addOutput(addressTo, amountAvailable - 50000);
          return cb(err, tx);
        });
      }
    });
  },
  signTx: function (tx, wif, callback) {
    var privKey = bitcoin.ECPair.fromWIF(wif)
    tx.sign(0, privKey);
    callback(tx.build().toHex());
  }
}
