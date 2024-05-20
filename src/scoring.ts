import { PublicKey } from "@solana/web3.js";
import {
  getTransactionHistory,
  getTokenBalances,
  getAccountInfo,
} from "./solana";
import { ScoreCriteria, WalletScore } from "./types";

const SCORE_MULTIPLIERS = {
  transactionCount: 0.5,
  tokenBalance: 0.3,
  smartContractInteractions: 0.1,
  stakingActivities: 0.1,
};

const analyzeWallet = async (publicKey: PublicKey): Promise<ScoreCriteria> => {
  const transactions = await getTransactionHistory(publicKey);
  const tokenBalances = await getTokenBalances(publicKey);
  const accountInfo = await getAccountInfo(publicKey);

  // Simplified analysis logic
  const transactionCount = transactions.length;
  const tokenBalance = tokenBalances.value.length; // Simplified example
  const smartContractInteractions = transactions.filter(
    (tx) => tx.err === null
  ).length;

  // Example
  const stakingActivities = accountInfo?.value ? 1 : 0; // Simplified example

  return {
    transactionCount,
    tokenBalance,
    smartContractInteractions,
    stakingActivities,
  };
};

const calculateScore = (criteria: ScoreCriteria): number => {
  return (
    criteria.transactionCount * SCORE_MULTIPLIERS.transactionCount +
    criteria.tokenBalance * SCORE_MULTIPLIERS.tokenBalance +
    criteria.smartContractInteractions *
      SCORE_MULTIPLIERS.smartContractInteractions +
    criteria.stakingActivities * SCORE_MULTIPLIERS.stakingActivities
  );
};

export const getWalletScore = async (
  walletAddress: string
): Promise<WalletScore> => {
  const publicKey = new PublicKey(walletAddress);
  const criteria = await analyzeWallet(publicKey);
  const score = calculateScore(criteria);
  return { wallet: walletAddress, score };
};

export const getAggregateWalletScore = async (
  walletAddresses: string[]
): Promise<WalletScore[]> => {
  const scores = await Promise.all(walletAddresses.map(getWalletScore));
  const aggregateScore =
    scores.reduce((acc, { score }) => acc + score, 0) / scores.length;
  return scores.map((walletScore) => ({
    ...walletScore,
    score: aggregateScore,
  }));
};
