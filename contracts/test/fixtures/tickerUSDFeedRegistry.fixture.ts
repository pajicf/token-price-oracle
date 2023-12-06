import {TickerUSDFeedRegistry} from "../../typechain-types";
import {EthereumAddress} from "../shared/types";
import {ethers} from "hardhat";
import {HardhatEthersSigner} from "@nomicfoundation/hardhat-ethers/signers";

export type TickerUSDFeedRegistryFixture = {
  tickerUSDFeedRegistry: TickerUSDFeedRegistry,
  owner: HardhatEthersSigner;
}

export const tickerUSDFeedRegistryFixture = async (): Promise<TickerUSDFeedRegistryFixture> => {
  const [ owner ] = await ethers.getSigners();

  const tickerUSDFeedRegistryFactory = await ethers.getContractFactory("TickerUSDFeedRegistry");

  const tickerUSDFeedRegistry = await tickerUSDFeedRegistryFactory.connect(owner).deploy();

  return {
    tickerUSDFeedRegistry,
    owner
  }
}