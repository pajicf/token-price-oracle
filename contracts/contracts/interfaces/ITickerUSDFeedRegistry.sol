//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITickerUSDFeedRegistry {
    /**
    * @notice Emitter when a new ticker and its corresponding feed are added
    */
    event TickerFeedUpdated(string ticker, address feedAddress);

    /**
    * @notice Function for fetching the Chainlink USD Price feed address for a given ticker
    *
    * @param ticker - The ticker symbol
    *
    * @return feedAddress - Address of the Ticker<>USD Chainlink price feed
    */
    function getTickerFeed(string calldata ticker) external view returns(address feedAddress);

    /**
    * @notice Function for adding new ticker and its corresponding feed address to the registry
    *
    * @param ticker - The ticker symbol
    * @param feedAddress - Address of the Ticker<>USD Chainlink price feed
    *
    * @custom:event Emits a `TickerFeedUpdated` event
    * @custom:authorization Only Contract owner
    */
    function setTickerFeed(string calldata ticker, address feedAddress) external;
}