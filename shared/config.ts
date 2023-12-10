import dotenv from "dotenv";
import { EthereumAddress } from "./types";

dotenv.config();

const {
  DEPLOYER_PRIVATE_KEY,
  ETHEREUM_GOERLI_RPC,
  ETHEREUM_SEPOLICA_RPC,
  ETHERSCAN_API_KEY
} = process.env;

if (!DEPLOYER_PRIVATE_KEY) {
  throw new Error("Please provide the DEPLOYER_PRIVATE_KEY in the .env");
}

if (!ETHEREUM_GOERLI_RPC || !ETHEREUM_SEPOLICA_RPC) {
  throw new Error("Please provide the RPC urls in the .env");
}

const CONFIG = {
  DEPLOYER_PRIVATE_KEY: DEPLOYER_PRIVATE_KEY as EthereumAddress,
  ETHEREUM_GOERLI_RPC,
  ETHEREUM_SEPOLICA_RPC,
  ETHERSCAN_API_KEY
};

export default CONFIG;