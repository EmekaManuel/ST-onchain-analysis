import { getWalletScore } from "./scoring";

const walletAddress = "YOUR_WALLET_ADDRESS_HERE";

(async () => {
  try {
    const score = await getWalletScore(walletAddress);
    console.log(`Wallet Score:`, score);
  } catch (error) {
    console.error("Error calculating wallet score:", error);
  }
})();

// to handle multiple wallets, use this instead:
import { getAggregateWalletScore } from "./scoring";

const walletAddresses = ["WALLET_ADDRESS_1", "WALLET_ADDRESS_2"];

(async () => {
  try {
    const aggregateScores = await getAggregateWalletScore(walletAddresses);
    console.log(`Aggregate Wallet Scores:`, aggregateScores);
  } catch (error) {
    console.error("Error calculating aggregate wallet scores:", error);
  }
})();
