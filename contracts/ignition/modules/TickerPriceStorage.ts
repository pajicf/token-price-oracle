import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import  TickerUSDFeedRegistryModule from "./TickerUSDFeedRegistry";

export default buildModule("TickerPriceStorage", (moduleBuilder) => {
  const { tickerFeedRegistry } = moduleBuilder.useModule(TickerUSDFeedRegistryModule);

  const tickerPriceStorage = moduleBuilder.contract("TickerPriceStorage", [tickerFeedRegistry]);

  return {
    tickerPriceStorage
  };
});