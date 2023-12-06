import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { TickerUSDFeedRegistryFixture, tickerUSDFeedRegistryFixture } from "./fixtures/tickerUSDFeedRegistry.fixture";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("TickerUSDFeedRegistry", () => {
  let fixture: TickerUSDFeedRegistryFixture;

  beforeEach(async () => {
    fixture = await loadFixture(tickerUSDFeedRegistryFixture);
  });

  describe("Adding a new feed into the registry", () => {
    const exampleTickerSymbol = "ETH";
    const exampleFeedAddress = "0x6Db2485A3BFF699840aDD5c2F9d103a72d4D4dD7";

    it("should revert if not performed by the owner", async () => {
      const { tickerUSDFeedRegistry, owner } = fixture;

      const [, otherAddress] = await ethers.getSigners();
      expect(owner.address).to.not.equal(otherAddress.address);

      await expect(tickerUSDFeedRegistry.connect(otherAddress).setTickerFeed(exampleTickerSymbol, exampleFeedAddress))
        .to.be.revertedWith("TickerUSDFeedRegistry: Only owner is allowed");
    });

    const TickerFeedUpdatedEventName = "TickerFeedUpdated";
    it(`should emit the ${TickerFeedUpdatedEventName} event`, async () => {
      const { tickerUSDFeedRegistry, owner } = fixture;

      await expect(tickerUSDFeedRegistry.connect(owner).setTickerFeed(exampleTickerSymbol, exampleFeedAddress))
        .to.emit(tickerUSDFeedRegistry, TickerFeedUpdatedEventName).withArgs(exampleTickerSymbol, exampleFeedAddress);
    });

    it("should be able to retrieve it afterwards", async () => {
      const { tickerUSDFeedRegistry, owner } = fixture;
      await tickerUSDFeedRegistry.connect(owner).setTickerFeed(exampleTickerSymbol, exampleFeedAddress);

      const onchainFeedAddress = await tickerUSDFeedRegistry.getTickerFeed(exampleTickerSymbol);
      expect(onchainFeedAddress).to.be.equal(exampleFeedAddress);
    });
  });
});