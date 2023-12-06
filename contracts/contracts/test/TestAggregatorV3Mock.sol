// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { AggregatorV3Interface } from "../interfaces/IAggregatorV3Interface.sol";

contract TestAggregatorV3Mock is AggregatorV3Interface {
    int256 immutable internal _mockPrice;
    uint8 internal _mockDecimals = 8;
    string internal _mockDescription = "";
    uint256 internal _mockVersion = 1;

    constructor(int mockPrice) {
        _mockPrice = mockPrice;
    }

    function decimals() external view returns (uint8) {
        return _mockDecimals;
    }

    function description() external view returns (string memory) {
        return _mockDescription;
    }

    function version() external view returns (uint256) {
        return _mockVersion;
    }

    function latestRoundData() external view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        uint80 mockRoundId = 1000;

        return (
            mockRoundId,
            _mockPrice,
            block.timestamp - 1000,
            block.timestamp,
            mockRoundId - 1
        );
    }

    function getRoundData(
        uint80 _roundId
    ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        _roundId;

        return this.latestRoundData();
    }
}
