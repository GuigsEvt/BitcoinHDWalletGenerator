// Libraries
const input = require('./inquire');
const fs = require('fs');
const path = require('path');

// Files imported
const controller = require('./server/controller');

// Set up bitcoin master key
var bitcoinRaw = fs.readFileSync(path.join(__dirname, 'bitcoin/keys.json'));
process.env.bitcoinPriv = JSON.parse(bitcoinRaw).xpriv; // bitcoin master private key
process.env.bitcoinXpub = JSON.parse(bitcoinRaw).xpub; // bitcoin master public key

console.log("Hierarchical wallet to list addresses and sign transactions");
console.log("Provide correctly the bitcoin xpub and xpriv to allow all features.");

// Home function to handle user inputs
var homeFunction = function() {
  input.home(function(choice) {
      if(!process.env.bitcoinPriv) {
        switch (choice['indexChoice']) {
          case 1:
            controller.displayAddresses(function(result, addresses) {
              if(result) {
                fs.writeFile("/bitcoin/addresses.json", JSON.stringify({ "addresses": addresses }), 'utf8', function (err) {
                  if (err) {
                    console.log(err);
                    console.log("Problem writing first 50 addresses to JSON file");
                    homeFunction();
                  } else {
                    console.log(addresses);
                    homeFunction();
                  }
                });
              } else {
                console.log("Problem providing first 10000 addresses");
                homeFunction();
              }
            });
            break;
          case 2:
            console.log('No xpriv have been found. To sign transaction please provide one.');
            process.exit(-1);
            break;
          case -1:
            process.exit(-1);
            break;
        }
      } else {
        switch (choice['indexChoice']) {
          case 1:
          controller.displayAddresses(function(result, addresses) {
            if(result) {
              fs.writeFile(path.join(__dirname, 'bitcoin/addresses.json'), JSON.stringify({ "addresses": addresses }), 'utf8', function (err) {
                if (err) {
                  console.log(err);
                  console.log("Problem writing first 50 addresses to JSON file");
                  homeFunction();
                } else {
                  console.log(addresses);
                  homeFunction();
                }
              });
            } else {
              console.log("Problem providing first 50 addresses");
              homeFunction();
            }
          });
          case 2:
          input.addressToAccess(function(index) {
            controller.getAddress(index, function(address) {
              controller.getBalance(address, function(err, balance) {
                if(err) {
                  console.log('Problem getting balance');
                  homeFunction();
                } else {
                  input.addressToSend(address, balance, function(addressToSend) {
                    if(controller.verifyAddress(addressToSend)) {
                      controller.getSignedTx(addressToSend, index, address, balance, function(err, signedTx) {
                        if(!err) {
                          console.log('Here is the signed tx push to explorer to send it to the network: ' + signedTx);
                          homeFunction();
                        } else {
                          homeFunction();
                        }
                      })
                    } else {
                      console.log('Address to send bitcoin to is not a valid bitcoin address');
                      homeFunction();
                    }
                  });
                }
              });
            });
          });
          break;
          case -1:
            process.exit(-1)
            break;
        }
      }
  });
};

homeFunction();
