import { TestTickerPriceStorage } from "../../typechain-types";
import { ethers } from "hardhat";

export type TickerPriceStorageFixture = {
  tickerPriceStorage: TestTickerPriceStorage,
  tokens: {
    tokenTicker: string;
    tokenPrice: number;
  }[]
};

export const tickerPriceStorageFixture = async (): Promise<TickerPriceStorageFixture> => {
  const [ owner ] = await ethers.getSigners();

  const tickerPriceStorageFactory = await ethers.getContractFactory("TestTickerPriceStorage");
  const tickerUSDFeedRegistryFactory = await ethers.getContractFactory("TickerUSDFeedRegistry");
  const chainlinkPriceFeedFactory = await ethers.getContractFactory("TestAggregatorV3Mock");

  const usdDecimals = 8;
  const usdDecimalMultiplier = 10**usdDecimals;

  const btcTickerSymbol = "BTC";
  const ethTickerSymbol = "ETH";
  const btcFeedMockUSDPrice = 50_000 * usdDecimalMultiplier;
  const ethFeedMockUSDPrice = 3_000 * usdDecimalMultiplier;

  const btcChainlinkFeed = await chainlinkPriceFeedFactory.deploy(btcFeedMockUSDPrice);
  const ethChainlinkFeed = await chainlinkPriceFeedFactory.deploy(ethFeedMockUSDPrice);

  const tickerUSDFeedRegistry = await tickerUSDFeedRegistryFactory.connect(owner).deploy();
  tickerUSDFeedRegistry.connect(owner).setTickerFeed(btcTickerSymbol, await btcChainlinkFeed.getAddress());
  tickerUSDFeedRegistry.connect(owner).setTickerFeed(ethTickerSymbol, await ethChainlinkFeed.getAddress());

  const tickerPriceStorage =
    await tickerPriceStorageFactory.connect(owner).deploy(await tickerUSDFeedRegistry.getAddress());

  return {
    tickerPriceStorage,
    tokens: [
      { tokenTicker: btcTickerSymbol, tokenPrice: btcFeedMockUSDPrice },
      { tokenTicker: ethTickerSymbol, tokenPrice: ethFeedMockUSDPrice }
    ]
  };
};