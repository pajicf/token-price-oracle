# Solidity API

## TickerUSDFeedRegistry

### _owner

```solidity
address _owner
```

### _tickerFeedMap

```solidity
mapping(string => address) _tickerFeedMap
```

### constructor

```solidity
constructor() public
```

### onlyOwner

```solidity
modifier onlyOwner()
```

### getTickerFeed

```solidity
function getTickerFeed(string ticker) public view returns (address feedAddress)
```

Function for fetching the Chainlink USD Price feed address for a given ticker

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ticker | string | - The ticker symbol |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| feedAddress | address | - Address of the Ticker<>USD Chainlink price feed |

### setTickerFeed

```solidity
function setTickerFeed(string ticker, address feedAddress) external
```

Function for adding new ticker and its corresponding feed address to the registry

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ticker | string | - The ticker symbol |
| feedAddress | address | - Address of the Ticker<>USD Chainlink price feed |

#### 📅 Events
* Emits a `TickerFeedUpdated` event

