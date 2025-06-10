import "@solana/wallet-adapter-react-ui/styles.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "./components/page/home-page";
import "./App.css";
import { SolanaProvider } from "./components/solana-provider";

function App() {
  return (
    <SolanaProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HomePage />
        <Toaster />
      </ThemeProvider>
    </SolanaProvider>
  );
}

export default App;
