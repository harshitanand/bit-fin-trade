'use strict';

class OrderMatchingEngine {
  constructor() {
    this.orderbook = {};
  }

  addOrder(order) {
    const { side, symbol } = order;

    if (!this.orderBook) {
      this.orderBook = {};
    }
    if (!this.orderBook || !this.orderBook[symbol]) {
      this.orderBook[symbol] = {};
    }

    if (!this.orderBook[symbol] || !this.orderBook[symbol][side]) {
      this.orderBook[symbol].buy = [];
      this.orderBook[symbol].sell = [];
    }

    this.orderBook[symbol][side].push(order);
    return this.orderbook;
  }

  matchOrders() {
    const symbols = Object.keys(this.orderBook);

    for (const symbol of symbols) {
      const buyOrders = this.orderBook[symbol].buy;
      const sellOrders = this.orderBook[symbol].sell;

      while (buyOrders.length > 0 && sellOrders.length > 0) {
        const buyOrder = buyOrders[0];
        const sellOrder = sellOrders[0];

        if (buyOrder.price >= sellOrder.price) {
          const tradeQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

          buyOrder.quantity -= tradeQuantity;
          sellOrder.quantity -= tradeQuantity;

          if (buyOrder.quantity === 0) {
            buyOrders.shift();
          }

          if (sellOrder.quantity === 0) {
            sellOrders.shift();
          }

          console.log(
            'TradeExecuted Successfully => ',
            JSON.stringify({
              symbol,
              buyPrice: buyOrder.price,
              sellPrice: sellOrder.price,
              quantity: tradeQuantity,
            })
          );
        } else {
          return this.orderbook;
        }
      }
    }

    return this.orderbook;
  }

  cancelOrder(orderId) {
    const order = this.orderBook[orderId];

    if (order) {
      const { side } = order;
      const { symbol } = order;

      this.orderBook[symbol][side] = this.orderBook[symbol][side].filter((ord) => ord.id !== orderId);
    }
    return this.orderbook;
  }
}

module.exports = OrderMatchingEngine;
