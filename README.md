# A Simplified Distributed Exchange 

OrderBook simulation for trading exchanges in which client connects via peer-to-peer network using [Grenache Grape](https://github.com/bitfinexcom/grenache-grape)

- Each client will have its own instance of the orderbook.
- Clients submit orders to their own instance of orderbook. The order is distributed to other instances, too.
- If a client's order matches with another order, any remainer is added to the orderbook, too.

### Setting up project

Please follow the below listed steps in order to setup the project locally and test, for testing please modify the `client.js` file 
`Place Order` `Cancel Order` `Match Order` functionalities can be tested.

`order-matcher.js` is main main file that contains the logic to `add`, `cancel` or `match` the order, It doesn't use any database for storing order data it's intantiated once the server boots up and resets when killed. For scaling the service later we use time series database like `Influx` and `Redis` in conjunction.

##### Prerequisites

```
npm i -g grenache-grape
```

```
# boot two grape servers

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

using `yarn` or `npm` as dependency manager for the project

```
cd BitFin-Trade && yarn

node server.js 

node client.js
```

##### Screenshots
![Client](screenshots/client.png?raw=true)
![Server](screenshots/server.png?raw=true)
![Code](screenshots/code.png?raw=true)


