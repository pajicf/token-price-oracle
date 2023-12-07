import {EthereumAddress} from "../shared/types";
import {ActionType} from "hardhat/types";
import {TickerPriceStorage} from "../typechain-types";
import {isLocalEnvironment} from "../shared/util";

type SetTickerPriceArguments = {
  ticker: string;
  price: number;
  tickerPriceStorageAddress: EthereumAddress;
}

const setTickerPrice: ActionType<SetTickerPriceArguments> = async (taskArgs, hre) => {
  const ethers = hre.ethers;

  const { ticker, price, tickerPriceStorageAddress } = taskArgs;

  const tickerPriceStorageFactory = await ethers.getContractFactory("TickerPriceStorage");
  const tickerPriceStorage = tickerPriceStorageFactory.attach(tickerPriceStorageAddress) as TickerPriceStorage;

  const adjustedTickerPrice = Math.trunc(price * 10**8);
  console.log(`Setting the price: [${price}, (adjusted: ${adjustedTickerPrice})] for ticker: [${ticker}]`);
  const tx = await tickerPriceStorage.set(ticker, adjustedTickerPrice);

  console.log(`Transaction sent, tx hash: ${tx.hash}`);

  const numberOfConfirmationsToWait = isLocalEnvironment(hre.network.name) ? 0 : 3;
  console.log(`Waiting for ${numberOfConfirmationsToWait} confirmations`)
  await tx.wait(numberOfConfirmationsToWait);

  console.log("Transaction successful");
}

export default setTickerPrice;