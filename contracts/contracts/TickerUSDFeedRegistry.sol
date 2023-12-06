//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./interfaces/ITickerUSDFeedRegistry.sol";

contract TickerUSDFeedRegistry is ITickerUSDFeedRegistry {
    address internal _owner;
    mapping(string => address) internal _tickerFeedMap;

    constructor() {
        _owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "TickerUSDFeedRegistry: Only owner is allowed to call this function");
        _;
    }

    // @inheritdoc ITickerUSDFeedRegistry
    function getTickerFeed(string calldata ticker) public view returns(address) {
        return _tickerFeedMap[ticker];
    }

    // @inheritdoc ITickerUSDFeedRegistry
    function addNewTicker(string calldata ticker, address feedAddress) external onlyOwner {
        _tickerFeedMap[ticker] = feedAddress;

        emit NewTickerAdded(ticker, feedAddress);
    }
}