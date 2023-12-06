# Solidity API

## TickerPriceStorage

### _tickerPriceMap

```solidity
mapping(string => uint256) _tickerPriceMap
```

### _tickerFeedRegistry

```solidity
address _tickerFeedRegistry
```

### constructor

```solidity
constructor(address tickerFeedRegistry) public
```

### set

```solidity
function set(string ticker, uint256 price) external
```

Function for updating the price of a token in the contract's storage represented in USD

_The price delta has to be larger than 2% of the current storage price
and less than 20% of the Chainlink price in order for it to be successfully updated_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ticker | string | - The ticker symbol of the token whose price is being updated |
| price | uint256 | - The new price for the given ticker |

#### 📅 Events
* Emits a `TickerPriceUpdated` event

