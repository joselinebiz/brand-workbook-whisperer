import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Workbook0 from "./pages/workbooks/Workbook0";
import Workbook1 from "./pages/workbooks/Workbook1";
import Workbook2 from "./pages/workbooks/Workbook2";
import Workbook3 from "./pages/workbooks/Workbook3";
import Workbook4 from "./pages/workbooks/Workbook4";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workbook/0" element={<Workbook0 />} />
          <Route path="/workbook/1" element={<Workbook1 />} />
          <Route path="/workbook/2" element={<Workbook2 />} />
          <Route path="/workbook/3" element={<Workbook3 />} />
          <Route path="/workbook/4" element={<Workbook4 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
