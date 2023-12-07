import dotenv from "dotenv";
import { EthereumAddress } from "./types";

dotenv.config();

const {
  DEPLOYER_PRIVATE_KEY
} = process.env;

if (!DEPLOYER_PRIVATE_KEY) {
  throw new Error("Please provide the DEPLOYER_PRIVATE_KEY in the .env");
}

const CONFIG = {
  DEPLOYER_PRIVATE_KEY: DEPLOYER_PRIVATE_KEY as EthereumAddress
};

export default CONFIG;