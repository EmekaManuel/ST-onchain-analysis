import { getWalletScore, getAggregateWalletScore } from "./scoring";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptWalletAddresses = (): Promise<string[]> => {
  return new Promise((resolve) => {
    rl.question("Enter wallet addresses separated by commas: ", (answer) => {
      const walletAddresses = answer
        .split(",")
        .map((address) => address.trim());
      resolve(walletAddresses);
    });
  });
};

(async () => {
  try {
    // Prompt the user for wallet addresses
    const walletAddresses = await promptWalletAddresses();
    rl.close();

    // Check if only one wallet address was provided
    if (walletAddresses.length === 1) {
      const score = await getWalletScore(walletAddresses[0]);
      console.log(`This score is attributed to a single wallet`);
      console.log(`Wallet Score:`, score);
    } else {
      // Get the aggregate score for multiple wallet addresses
      const aggregateScores = await getAggregateWalletScore(walletAddresses);
      console.log(
        `This score is attributed to ${walletAddresses.length} wallets`
      );
      console.log(`Individual Wallet Scores:`, aggregateScores);
    }
  } catch (error) {
    console.error("Error calculating wallet scores:", error);
    rl.close();
  }
})();
