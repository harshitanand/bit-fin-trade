/* eslint-disable import/no-extraneous-dependencies */

'use strict';

const { PeerRPCServer } = require('grenache-nodejs-ws');
const Link = require('grenache-nodejs-link');
const OrderMatcher = require('./order-matcher');

const link = new Link({
  grape: 'http://127.0.0.1:30001',
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const service = peer.transport('server');
service.listen(1305);

const orderMatcher = new OrderMatcher();

setInterval(function () {
  link.announce('SELL_ORDER', service.port, {});
}, 1000);

setInterval(function () {
  link.announce('BUY_ORDER', service.port, {});
}, 1000);

service.on('request', (rid, key, payload, handler) => {
  if (key === 'BUY_ORDER' || key === 'SELL_ORDER') {
    orderMatcher.addOrder(payload);
    console.log('Order Book post add order: ', JSON.stringify(orderMatcher.orderBook));

    orderMatcher.matchOrders();
    console.log('Order Book post order matching: ', JSON.stringify(orderMatcher.orderBook));
  } else if (key === 'CANCEL_ORDER') {
    orderMatcher.cancelOrder(payload);
    console.log('Order Book post add order: ', JSON.stringify(orderMatcher.orderBook));
  }

  handler.reply(null, JSON.stringify(orderMatcher.orderBook));
});
