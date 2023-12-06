// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import { AggregatorV3Interface } from "../interfaces/IAggregatorV3Interface.sol";

contract TestAggregatorV3Mock is AggregatorV3Interface {
    int256 immutable internal MOCK_PRICE;
    uint8 constant internal MOCK_DECIMALS = 8;
    string constant internal MOCK_DESCRIPTION = "";
    uint256 constant internal MOCK_VERSION = 1;

    constructor(int mockPrice) {
        MOCK_PRICE = mockPrice;
    }

    function decimals() external view returns (uint8) {
        return MOCK_DECIMALS;
    }

    function description() external view returns (string memory) {
        return MOCK_DESCRIPTION;
    }

    function version() external view returns (uint256) {
        return MOCK_VERSION;
    }

    function latestRoundData() external view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        uint80 mockRoundId = 1000;

        return (
            mockRoundId,
            MOCK_PRICE,
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
