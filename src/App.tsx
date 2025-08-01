
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CreateContract from "./pages/CreateContract";
import CoinMagic from "./pages/CoinMagic";
import EmotionAchievements from "./pages/EmotionAchievements";
import CoinBattle from "./pages/CoinBattle";
import Leaderboard from "./pages/Leaderboard";
import Rules from "./pages/Rules";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create-contract" element={<CreateContract />} />
            <Route path="/coin-magic" element={<CoinMagic />} />
            <Route path="/emotion-achievements" element={<EmotionAchievements />} />
            <Route path="/coin-battle" element={<CoinBattle />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rules" element={<Rules />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;