import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ignition";
import "solidity-docgen";
import "./tasks"
import CONFIG from "./shared/config";

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
  docgen: {
    templates: "./docs-generator-templates",
    outputDir: "./docs",
    pages: "files",
    exclude: ["./test", "./interfaces/IAggregatorV3Interface.sol"]
  },
  etherscan: {
    apiKey: CONFIG.ETHERSCAN_API_KEY
  },
  networks: {
    goerli: {
      url: CONFIG.ETHEREUM_GOERLI_RPC,
      accounts: [CONFIG.DEPLOYER_PRIVATE_KEY]
    },
    sepolia: {
      url: CONFIG.ETHEREUM_SEPOLICA_RPC,
      accounts: [CONFIG.DEPLOYER_PRIVATE_KEY]
    }
  }
};

export default config;
