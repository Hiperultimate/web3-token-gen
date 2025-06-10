import { generateMnemonic, mnemonicToSeedSync } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

// Takes in hash and generates mnemonic

export default () => {
  const mnemonic = generateMnemonic(wordlist, 128);
  const seedBuffer = mnemonicToSeedSync(mnemonic);
  const seedHex = Array.from(seedBuffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    mnemonic,
    seedBuffer,
    seedHex,
  };
};
