//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ITickerPriceStorage.sol";

contract TickerPriceStorage is ITickerPriceStorage {
    uint private constant MAX_BPS = 10_000; // 100% or 10k basis points
    uint private constant MIN_PRICE_DELTA_PERCENTAGE = 200; // 2% or 200 basis points

    mapping(string => uint) private _tickerPriceMap;

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
        }

        _tickerPriceMap[ticker] = price;
        emit TickerPriceUpdated(ticker, price);
    }

    /*
    * @notice Pure function which calculates the minimum price difference needed to update the current price
    * @dev The price is based on the current on-chain price in storage.
    *
    * @param price - Current on-chain price in the contract storage
    *
    * @return The minimum price delta
    */
    function _getMinPriceDelta(uint price) private pure returns(uint) {
        return (price * MIN_PRICE_DELTA_PERCENTAGE) / MAX_BPS;
    }
}