import { HDKey } from "@scure/bip32";
import { Keypair } from "@solana/web3.js";

export const ETHEREUM_DERIVATION_PATH = (walletNumber: number = 0) => {
  return `m/44'/60'/${walletNumber}'/0'/0'`;
};

export const SOLANA_DERIVATION_PATH = (walletNumber: number = 0) => {
  return `m/44'/501'/${walletNumber}'/0'/0'`;
};

export const getDerivedSolanaWallet = (
  walletNumber: number = 0,
  hexSeed: Uint8Array
) => {
  const path = SOLANA_DERIVATION_PATH(walletNumber);
  const derivedPath = HDKey.fromMasterSeed(hexSeed).derive(path);
  const keypair = Keypair.fromSeed(derivedPath.privateKey!.slice(0, 32));
  const { publicKey, secretKey } = keypair;

  const publicKeyString = publicKey.toBase58();
  const secretKeyHex = Array.from(secretKey)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    publicKey: publicKeyString,
    secretKey: secretKeyHex,
  };
};
