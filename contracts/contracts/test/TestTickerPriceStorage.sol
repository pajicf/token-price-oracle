//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../TickerPriceStorage.sol";

contract TestTickerPriceStorage is TickerPriceStorage {
    function getCurrentPriceForTicker(string calldata ticker) public view returns (uint) {
        return _tickerPriceMap[ticker];
    }
}