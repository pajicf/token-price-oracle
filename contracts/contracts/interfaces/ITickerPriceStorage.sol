//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITickerPriceStorage {
    event TickerPriceUpdated(string indexed ticker, uint newPrice);

    /**
    * @dev Function for updating the price of a token in the contract's storage represented in USD
    *
    * Note: The price delta has to be larger than 2% of the current storage price
    * and less than 20% of the Chainlink price in order for it to be successfully updated
    *
    * @param ticker - The ticker symbol of the token whose price is being updated
    * @param price  - The new price for the given ticker, number of decimals following the ISO4217 standard
    *
    * Emits a {TickerPriceUpdated} event
    */
    function set(string calldata ticker, uint price) external;
}