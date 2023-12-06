import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import {TickerPriceStorageFixture, tickerPriceStorageFixture} from "./fixtures/tickerPriceStorage.fixture";
import {expect} from "chai";

describe("TickerPriceStorage", () => {
  let fixture: TickerPriceStorageFixture;
  const usdDecimalMultiplier = 10**8;

  beforeEach(async () => {
    fixture = await loadFixture(tickerPriceStorageFixture);
  });

  describe("Updating the ticker price", () => {
    describe("setting the ticker price", () => {
      it("should be able to set a different price using the set function", async () => {
        const { tickerPriceStorage, tokens } = fixture;
        const tokenTicker = tokens[0].tokenTicker

        const oldPrice = await tickerPriceStorage.getCurrentPriceForTicker(tokenTicker);
        const priceToSet = 100 * usdDecimalMultiplier;

        await tickerPriceStorage.set(tokenTicker, priceToSet);
        const newOnchainPrice = await tickerPriceStorage.getCurrentPriceForTicker(tokenTicker);

        expect(newOnchainPrice).to.not.equal(oldPrice);
        expect(newOnchainPrice).to.be.equal(priceToSet);
      });

      it("should revert if no ticker provided", async () => {
        const { tickerPriceStorage } = fixture;
        const emptyTickerSymbol = "";
        const priceToSet = 100 * usdDecimalMultiplier;

        await expect(tickerPriceStorage.set(emptyTickerSymbol, priceToSet))
          .to.be.revertedWith("TickerPriceStorage: Param ticker can't be an empty value")
      });

      it("should revert if trying to set the current on-chain price", async () => {
        const { tickerPriceStorage, tokens } = fixture;
        const tokenTicker = tokens[0].tokenTicker

        const priceToSet = 100 * usdDecimalMultiplier;
        await tickerPriceStorage.set(tokenTicker, priceToSet);

        await expect(tickerPriceStorage.set(tokenTicker, priceToSet))
          .to.be.revertedWith("TickerPriceStorage: New price must not equal the current price")
      })

      it("should revert if trying to set price larger than the min price delta", async () => {
        const { tickerPriceStorage, tokens } = fixture;
        const tokenTicker = tokens[0].tokenTicker

        const priceToSet = 100 * usdDecimalMultiplier;
        await tickerPriceStorage.set(tokenTicker, priceToSet);

        const minPriceDeltaPercentage = 2;
        const minPriceDelta = Math.trunc((priceToSet * minPriceDeltaPercentage) / 100);
        const newPrice = priceToSet + minPriceDelta - 1;

        await expect(tickerPriceStorage.set(tokenTicker, newPrice))
          .to.be.revertedWith("TickerPriceStorage: New price must be larger than the minimum delta")
      })
    })

    describe("Setting the initial price", () => {
      it("should be able to set a price without considering the min price delta", async () => {
        const { tickerPriceStorage, tokens } = fixture;
        const tokenTicker = tokens[0].tokenTicker

        const newPrice = 0.01 * usdDecimalMultiplier;

        let onChainPrice = await tickerPriceStorage.getCurrentPriceForTicker(tokenTicker);
        expect(onChainPrice).to.be.equal(0);

        await tickerPriceStorage.set(tokenTicker, newPrice);

        onChainPrice = await tickerPriceStorage.getCurrentPriceForTicker(tokenTicker);
        expect(onChainPrice).to.be.equal(newPrice);
      });

      it("should emit the TickerPriceUpdated event", async () => {
        const { tickerPriceStorage, tokens } = fixture;
        const tokenTicker = tokens[0].tokenTicker

        const newPrice = 0.01 * usdDecimalMultiplier;

        await expect(tickerPriceStorage.set(tokenTicker, newPrice))
          .to.emit(tickerPriceStorage, "TickerPriceUpdated").withArgs(tokenTicker, newPrice);
      })
    })
  })
})