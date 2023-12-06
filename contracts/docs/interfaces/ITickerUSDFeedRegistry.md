# Solidity API

## ITickerUSDFeedRegistry

### TickerFeedUpdated

```solidity
event TickerFeedUpdated(string ticker, address feedAddress)
```

Emitter when a new ticker and its corresponding feed are added

### getTickerFeed

```solidity
function getTickerFeed(string ticker) external view returns (address feedAddress)
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

