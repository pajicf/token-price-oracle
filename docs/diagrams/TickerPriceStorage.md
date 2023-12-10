# Ticker Price Storage

## Setting a price for the ticker
```mermaid
    sequenceDiagram
    box Ticker Price Storage: Setting a new ticker price
    actor Ethereum Account
    participant TickerPriceStorage SC
    participant TickerUSDFeedRegistry SC
    participant AggregatorV3Interface SC
    end

    Ethereum Account ->> TickerPriceStorage SC: set(string ticker, uint price)
    TickerPriceStorage SC ->> TickerUSDFeedRegistry SC: getTickerFeed(ticker)
    TickerUSDFeedRegistry SC ->> TickerPriceStorage SC: returns the feed address
    TickerPriceStorage SC ->> AggregatorV3Interface SC: latestRoundData()
    AggregatorV3Interface SC ->> TickerPriceStorage SC: Chainlink price
  ```