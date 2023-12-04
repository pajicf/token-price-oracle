//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITickerPriceStorage {
    /*
    * @notice Emitted when a price of a ticker is updated
    */
    event TickerPriceUpdated(string indexed ticker, uint newPrice);

    /**
    * @notice Function for updating the price of a token in the contract's storage represented in USD
    *
    * @dev The price delta has to be larger than 2% of the current storage price
    * and less than 20% of the Chainlink price in order for it to be successfully updated
    *
    * @param ticker - The ticker symbol of the token whose price is being updated
    * @param price  - The new price for the given ticker
    *
    * @custom:event Emits a `TickerPriceUpdated` event
    * @custom:authorization Public
    */
    function set(string calldata ticker, uint price) external;
}