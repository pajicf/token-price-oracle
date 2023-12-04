import {TestTickerPriceStorage} from "../../typechain-types";
import {ethers} from "hardhat";

export type TickerPriceStorageFixture = {
  tickerPriceStorage: TestTickerPriceStorage
}

export const tickerPriceStorageFixture = async (): Promise<TickerPriceStorageFixture> => {
  const [ owner ] = await ethers.getSigners();
  const tickerPriceStorageFactory = await ethers.getContractFactory("TestTickerPriceStorage");

  const tickerPriceStorage = await tickerPriceStorageFactory.connect(owner).deploy();

  return {
    tickerPriceStorage
  }
}