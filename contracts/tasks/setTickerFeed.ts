import {EthereumAddress} from "../shared/types";
import {ActionType} from "hardhat/types";
import {TickerUSDFeedRegistry} from "../typechain-types";

type SetTickerFeedArguments = {
  ticker: string;
  feedAddress: EthereumAddress;
  registryContractAddress: EthereumAddress;
}

const setTickerFeed: ActionType<SetTickerFeedArguments> = async (taskArgs, hre) => {
  const ethers = hre.ethers;

  const { ticker, feedAddress, registryContractAddress } = taskArgs;

  const tickerUSDFeedRegistryFactory = await ethers.getContractFactory("TickerUSDFeedRegistry");
  const tickerFeedRegistry = tickerUSDFeedRegistryFactory.attach(registryContractAddress) as TickerUSDFeedRegistry;

  console.log(`Setting the feed address for ticker: [${ticker}] to: [${feedAddress}]`);
  const tx = await tickerFeedRegistry.setTickerFeed(ticker, feedAddress);

  console.log(`Transaction sent, tx hash: ${tx.hash}`);

  const numberOfConfirmationsToWait = hre.network.name === "hardhat" ? 0 : 3;
  console.log(`Waiting for ${numberOfConfirmationsToWait} confirmations`)
  await tx.wait(numberOfConfirmationsToWait);

  console.log("Transaction successful");
}

export default setTickerFeed;