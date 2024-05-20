export interface ScoreCriteria {
  transactionCount: number;
  tokenBalance: number;
  smartContractInteractions: number;
  stakingActivities: number;
}

export interface WalletScore {
  wallet: string;
  score: number;
}
