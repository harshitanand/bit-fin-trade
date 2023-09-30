/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const { PeerRPCClient } = require('grenache-nodejs-ws');
const Link = require('grenache-nodejs-link');

const link = new Link({
  grape: 'http://127.0.0.1:30001',
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

peer.request(
  'SELL_ORDER',
  { side: 'sell', symbol: 'BTCUSDT', price: 26500, quantity: 0.1 },
  { timeout: 10000 },
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(data);
  }
);

peer.request(
  'BUY_ORDER',
  { side: 'buy', symbol: 'BTCUSDT', price: 26500, quantity: 0.1 },
  { timeout: 10000 },
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(data);
  }
);

peer.request(
  'BUY_ORDER',
  { side: 'buy', symbol: 'BTCUSDT', price: 26700, quantity: 0.1 },
  { timeout: 10000 },
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(data);
  }
);

peer.request(
  'BUY_ORDER',
  { side: 'buy', symbol: 'BTCUSDT', price: 31700, quantity: 0.1 },
  { timeout: 10000 },
  (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(data);
  }
);
