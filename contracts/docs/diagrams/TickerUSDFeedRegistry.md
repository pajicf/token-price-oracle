## Setting a new feed address
```mermaid
    sequenceDiagram
    box Ticker Feed Registry: Setting a new feed address
    actor Owner
    participant TickerUSDFeedRegistry SC
    end

    Owner ->> TickerUSDFeedRegistry SC: setTickerFeed(string ticker, address feedAddress)
```