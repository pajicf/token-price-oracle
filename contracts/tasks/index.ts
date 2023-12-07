import { task } from "hardhat/config";
import setTickerFeed from "./setTickerFeed";

task("setTickerFeed", "Sets the new feed address for the given ticker")
  .addParam("ticker", "The ticker symbol")
  .addParam("feedAddress", "Address of the Ticker<>USD Chainlink price feed")
  .addParam("registryContractAddress", "Address of the deployed registry contract")
  .setAction(setTickerFeed);