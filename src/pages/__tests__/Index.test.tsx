import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/test/test-utils";
import Index from "../Index";

const mockSignOut = vi.fn();
const mockNavigate = vi.fn();
let currentUser: any = null;

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: currentUser,
    signOut: mockSignOut,
    checkAccess: vi.fn().mockReturnValue(false),
    purchases: [],
    loading: false,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("Index Page – Workbook Hub", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentUser = null;
  });

  it("renders the hero headline", () => {
    render(<Index />);
    expect(screen.getByText(/BRAND & MARKETING MASTER BLUEPRINT/i)).toBeInTheDocument();
  });

  it("renders 'Sign In' button when unauthenticated", () => {
    render(<Index />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders user email and Sign Out when authenticated", () => {
    currentUser = { id: "u1", email: "test@example.com" };
    render(<Index />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("renders all 7 workbook cards", () => {
    render(<Index />);
    expect(screen.getByText("THE IDEAL CLIENT WORKBOOK")).toBeInTheDocument();
    expect(screen.getByText("FIND YOUR WHITE SPACE")).toBeInTheDocument();
    expect(screen.getByText("BRAND STRATEGY FOUNDATION")).toBeInTheDocument();
    expect(screen.getByText("MARKETING STRATEGY EXECUTION")).toBeInTheDocument();
    expect(screen.getByText("GROWTH & MEASUREMENT SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText("SCALING SYSTEMS")).toBeInTheDocument();
    expect(screen.getByText("COMPLETE SYSTEM")).toBeInTheDocument();
  });

  it("renders value props section", () => {
    render(<Index />);
    expect(screen.getByText("MBA-Level Strategy")).toBeInTheDocument();
    expect(screen.getByText("Battle-Tested")).toBeInTheDocument();
    expect(screen.getByText("Results-Driven")).toBeInTheDocument();
  });

  it("renders the 'Start Your Journey' CTA", () => {
    render(<Index />);
    expect(screen.getByText("Start Your Journey")).toBeInTheDocument();
  });

  it("renders the free workbook with $0 / FREE label", () => {
    render(<Index />);
    // The free ICP workbook should show "Start Free Workbook"
    expect(screen.getByText("Start Free Workbook")).toBeInTheDocument();
  });
});
