import { task } from "hardhat/config";
import setTickerFeed from "./setTickerFeed";
import setTickerPrice from "./setTickerPrice";

/* Set Ticker Feed Hardhat task */
/*------------------------------------------*/
task("setTickerFeed", "Sets the new feed address for the given ticker")
  .addParam("ticker", "The ticker symbol")
  .addParam("feedAddress", "Address of the Ticker<>USD Chainlink price feed")
  .addParam("registryContractAddress", "Address of the deployed registry contract")
  .setAction(setTickerFeed);

/* Set Ticker Price Hardhat task */
/*------------------------------------------*/
task("setTickerPrice", "Sets the new price for the given ticker")
  .addParam("ticker", "The ticker symbol")
  .addParam("price", "The new price for the given ticker")
  .addParam("tickerPriceStorageAddress", "Address of the deployed ticker storage contracts")
  .setAction(setTickerPrice);