import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  /*
  Some EVM based rollups don't support the PUSH0 opcode yet
  which was introduced in the shanghai fork

  We'll use 0.8.19 and the London fork for a period
  until the majority of networks implement the new opcode
  so that we ensure large network compatibility

  For further reading, see:
  https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md
  https://soliditylang.org/blog/2023/05/10/solidity-0.8.20-release-announcement/
  */
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "london"
    }
  },
};

export default config;
