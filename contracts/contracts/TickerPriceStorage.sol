//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ITickerPriceStorage.sol";

contract TickerPriceStorage is ITickerPriceStorage {
    // @inheritdoc ITickerPriceStorage
    function set(string calldata ticker, uint price) external {
        emit TickerPriceUpdated(ticker, price);
    }
}