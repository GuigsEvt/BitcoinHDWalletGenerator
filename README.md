#Bitcoin manager HD Wallet

This software provide all the bitcoin related functions in order to handle the issuance of bitcoin addresses. It also ensure the signing and sending of bitcoin transaction for all the addresses.

#Getting started

Provide correct xpriv and xpub in bitcoin/keys.json.

Launch the software.
`npm install`
`node index.js`

#Docs

Derivation Path -- choose correct one
Electrum derivation path -- https://bitcoin.stackexchange.com/questions/36955/what-bip32-derivation-path-does-electrum-use
Basic derivation path Bitcoinjs-lib -- https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/bip32.js#L15
To decode tx afterwards - https://blockchain.info/decode-tx
To send tx afterwards - https://blockchain.info/pushtx

#License

The MIT License (MIT)

Copyright (c) Guigs

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
