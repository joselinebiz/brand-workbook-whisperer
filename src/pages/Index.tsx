import { WorkbookCard } from "@/components/WorkbookCard";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const workbooks = [
    {
      number: "00",
      title: "FIND YOUR WHITE SPACE",
      subtitle: "Market Validation",
      timeRequired: "45 min",
      description: "Identify your unique positioning in the market with AI-powered competitive analysis and strategic frameworks.",
      path: "/workbook/0",
      productType: "workbook_0",
      price: 2700,
    },
    {
      number: "01",
      title: "BRAND STRATEGY FOUNDATION",
      subtitle: "Brand Identity",
      timeRequired: "2-4 hours",
      description: "Define your brand identity, values, and messaging framework with comprehensive strategic tools.",
      path: "/workbook/1",
      productType: "workbook_1",
      price: 9700,
    },
    {
      number: "02",
      title: "MARKETING STRATEGY EXECUTION",
      subtitle: "Marketing Execution",
      timeRequired: "5-10 hours",
      description: "Create your go-to-market strategy and content plan with proven frameworks.",
      path: "/workbook/2",
      productType: "workbook_2",
      price: 9700,
    },
    {
      number: "03",
      title: "GROWTH & MEASUREMENT SYSTEMS",
      subtitle: "Growth & Analytics",
      timeRequired: "2-4 hours",
      description: "Build measurement systems and growth strategies that drive sustainable results.",
      path: "/workbook/3",
      productType: "workbook_3",
      price: 9700,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-chatone">BlkBld Workbooks</h1>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-chatone mb-4">Strategic Workbooks</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              MBA-level strategy frameworks designed to systematize your success
            </p>
          </div>

          <div className="grid gap-6">
            {workbooks.map((workbook) => (
              <WorkbookCard key={workbook.number} {...workbook} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Questions? <a href="mailto:web@blkbld.co" className="text-primary hover:underline">web@blkbld.co</a>
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Joseline Nyinawabera, MBA | Founder, BlkBld & Co. | @JoselineBiz
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 BLKBLD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
