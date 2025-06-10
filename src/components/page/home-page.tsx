import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

function HomePage() {
  return (
    <div>
      <div className="flex gap-2">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      Home page
    </div>
  );
}

export default HomePage;
