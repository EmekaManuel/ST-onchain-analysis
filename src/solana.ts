import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

// Create a connection to the Solana mainnet-beta cluster
const connection = new Connection(clusterApiUrl("mainnet-beta"));

export const getTransactionHistory = async (publicKey: PublicKey) => {
  const transactions = await connection.getConfirmedSignaturesForAddress2(
    publicKey
  );
  return transactions;
};

export const getTokenBalances = async (publicKey: PublicKey) => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });
  return tokenAccounts;
};

export const getAccountInfo = async (publicKey: PublicKey) => {
  const accountInfo = await connection.getParsedAccountInfo(publicKey);
  return accountInfo;
};
