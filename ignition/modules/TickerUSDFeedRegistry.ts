import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TickerUSDFeedRegistry", (moduleBuilder) => {
  const tickerFeedRegistry = moduleBuilder.contract("TickerUSDFeedRegistry");

  return { tickerFeedRegistry };
});