import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import TokenLaunchPad from "../token-launchpad";


function HomePage() {
  return (
    <div>
      <div className="flex gap-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <TokenLaunchPad />
    </div>
  );
}

export default HomePage;
