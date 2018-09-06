const fs = require('fs');
const path = require('path');

const bitcoinLib = require('./bitcoin');
const bitcoin = require('bitcoinjs-lib');

// Bitcoin set up
let neuteredNode;

/***************************************************/
/* functions to handle bitcoins related bunctions  */
/***************************************************/

function displayAddresses(callback) {
  var addresses = [];
  if(!neuteredNode) {
    neuteredNode = bitcoin.HDNode.fromBase58(process.env.bitcoinXpub);
    for(var i = 0; i < 50; i++) {
      var newAddress = bitcoinLib.deriveNode(neuteredNode, i);
      addresses.push([newAddress, i]);
    }
    callback(true, addresses);
  } else {
    callback(true, addresses);
  }
}

function getAddress(index, callback) {
  if(!neuteredNode) {
    neuteredNode = bitcoin.HDNode.fromBase58(process.env.bitcoinXpub);
    var address = bitcoinLib.deriveNode(neuteredNode, index);
    callback(address);
  } else {
    var address = bitcoinLib.deriveNode(neuteredNode, index);
    callback(address);
  }
}

function getBalance(address, callback) {
  bitcoinLib.getBalance(address, function(err, result) {
    if(err) return callback(err);
    callback(err, result.balance);
  });
}

function verifyAddress(address) {
  return bitcoinLib.checkBitcoinAddress(address);
}

function getSignedTx(addressToSend, indexAddress, addressFrom, amountToSend, callback) {
  bitcoinLib.getWif(indexAddress, function(wif, address) {
    if(address != addressFrom) {
      console.log('Problem private key and public key not matching');
      callback(true);
    } else {
      bitcoinLib.createUnsignedTxHex(addressFrom, addressToSend, amountToSend, function(err, tx) {
        if(err) return callback(true);
        bitcoinLib.signTx(tx, wif, function(signedTx) {
          callback(false, signedTx);
        });
      });
    }
  });
}

module.exports = {
  displayAddresses,
  getAddress,
  getBalance,
  verifyAddress,
  getSignedTx
}
