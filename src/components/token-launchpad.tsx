import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { toast } from "sonner";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { Button } from "./ui/button";
import { useState } from "react";

function TokenLaunchPad() {
  const currentWallet = useWallet();
  const { connection } = useConnection();
  const [genTokenAddress, setGenTokenAddress] = useState('');

  console.log("Checking : ", currentWallet.publicKey?.toString());

  const launchToken = async () => {
    if (!currentWallet.publicKey) {
      toast("Please link your choice of wallet first.");
      return;
    }

    const newTokenKeyPair = Keypair.generate();
    const minBalance = await getMinimumBalanceForRentExemptMint(connection);

    const tx = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: currentWallet.publicKey,
        newAccountPubkey: newTokenKeyPair.publicKey,
        lamports: minBalance,
        space: MINT_SIZE, // <--- Where is this coming from
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(newTokenKeyPair.publicKey, 8, currentWallet.publicKey, currentWallet.publicKey, TOKEN_PROGRAM_ID),
    );

    const recentBlockHash = await connection.getLatestBlockhash();
    tx.recentBlockhash = recentBlockHash.blockhash;
    tx.feePayer = currentWallet.publicKey;

    // Sign tx
    tx.partialSign(newTokenKeyPair);
    const transactionId = await currentWallet.sendTransaction(tx, connection);

    console.log("Transaction completed : ", transactionId);
    setGenTokenAddress(transactionId)
  };

  return (
    <div>
      <h2>Create your Token</h2>
      <Button onClick={launchToken}>Create Token</Button>
      {genTokenAddress && <div>Token Address : {genTokenAddress}</div>}
    </div>
  );
}

export default TokenLaunchPad;
