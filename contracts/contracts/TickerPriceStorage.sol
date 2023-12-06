//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ITickerPriceStorage.sol";
import "./interfaces/ITickerUSDFeedRegistry.sol";
import "./interfaces/IAggregatorV3Interface.sol";

contract TickerPriceStorage is ITickerPriceStorage {
    uint private constant MAX_BPS = 10_000; // 100% or 10k basis points
    uint private constant MIN_PRICE_DELTA_PERCENTAGE = 200; // 2% or 200 basis points
    uint private constant MAX_PRICE_DELTA_PERCENTAGE = 2_000; // 20% or 2k basis points

    mapping(string => uint) internal _tickerPriceMap;
    address immutable internal _tickerFeedRegistry;

    constructor(address tickerFeedRegistry) {
        _tickerFeedRegistry = tickerFeedRegistry;
    }

    // @inheritdoc ITickerPriceStorage
    function set(string calldata ticker, uint price) external {
        require(bytes(ticker).length > 0, "TickerPriceStorage: Param ticker can't be an empty value");

        uint currentPrice = _tickerPriceMap[ticker];

        require(currentPrice != price, "TickerPriceStorage: New price must not equal the current price");

        if (currentPrice != 0) {
            uint priceDelta = 0;
            uint minPriceDelta = _getMinPriceDelta(currentPrice);

            if (currentPrice < price) {
                priceDelta = price - currentPrice;
            } else {
                priceDelta = currentPrice - price;
            }
            
            require(priceDelta >= minPriceDelta, "TickerPriceStorage: New price must be larger than the minimum delta");

            uint maxPriceDelta = _getMaxPriceDelta(ticker);
            require(priceDelta <= maxPriceDelta, "TickerPriceStorage: New price must be lower than the maximum delta");
        }

        _tickerPriceMap[ticker] = price;
        emit TickerPriceUpdated(ticker, price);
    }

    /**
    * @notice Pure function which calculates the minimum price difference needed to update the current price
    * @dev The price is based on the current on-chain price in storage.
    *
    * @param currentPrice - Current on-chain price in the contract storage
    *
    * @return The minimum price delta
    */
    function _getMinPriceDelta(uint currentPrice) private pure returns(uint) {
        return (currentPrice * MIN_PRICE_DELTA_PERCENTAGE) / MAX_BPS;
    }

    /**
    * @notice Function which calculates the maximum price difference allowed to update the current price
    * @dev The price is based on the current Chainlink on-chain price
    *
    * @param ticker - The ticker symbol of the asset for fetching the Chainlink price feed
    *
    * @return The maximum price delta
    */
    function _getMaxPriceDelta(string calldata ticker) private view returns(uint) {
        address priceFeedAddress = ITickerUSDFeedRegistry(_tickerFeedRegistry).getTickerFeed(ticker);

        (,int chainlinkPrice, , , ) = AggregatorV3Interface(priceFeedAddress).latestRoundData();

        // We'll assume the price can't go negative in terms of USD price of a token
        return (uint(chainlinkPrice) * MAX_PRICE_DELTA_PERCENTAGE) / MAX_BPS;
    }
}