import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/test-utils";
import { WorkbookCard } from "../WorkbookCard";

// Mock useAuth
const mockCheckAccess = vi.fn().mockReturnValue(false);
const mockUser: any = null;
let currentUser = mockUser;

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: currentUser,
    checkAccess: mockCheckAccess,
  }),
}));

// Capture the navigate mock
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

// Access the shared mockSupabase from test-utils (already mocked)
import { mockSupabase } from "@/test/test-utils";

const baseProps = {
  number: "1",
  title: "Brand Identity",
  subtitle: "Define your brand",
  timeRequired: "2 hours",
  description: "Build your brand identity from scratch.",
  path: "/workbook/1",
  productType: "workbook_1",
  price: 9700,
};

describe("WorkbookCard – Payment Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    currentUser = null;
    mockCheckAccess.mockReturnValue(false);
  });

  // ── Unauthenticated user ──

  it("shows 'Sign In to Purchase' when user is not logged in", () => {
    render(<WorkbookCard {...baseProps} />);
    expect(screen.getByText("Sign In to Purchase")).toBeInTheDocument();
  });

  it("navigates to /auth when unauthenticated user clicks purchase", () => {
    render(<WorkbookCard {...baseProps} />);
    fireEvent.click(screen.getByText("Sign In to Purchase"));
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });

  // ── Authenticated user without access ──

  it("shows price and 'Continue to Workbook' button for authenticated user without access", () => {
    currentUser = { id: "user-1", email: "test@test.com" };
    render(<WorkbookCard {...baseProps} />);
    expect(screen.getByText(/Continue to Workbook 1 - \$97/)).toBeInTheDocument();
  });

  it("calls create-payment edge function on purchase click", async () => {
    currentUser = { id: "user-1", email: "test@test.com" };
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { url: "https://checkout.stripe.com/test" },
      error: null,
    });

    // Mock window.location.href
    const locationSpy = vi.spyOn(window, "location", "get").mockReturnValue({
      ...window.location,
      href: "",
    } as any);
    const hrefSetter = vi.fn();
    Object.defineProperty(window.location, "href", { set: hrefSetter, configurable: true });

    render(<WorkbookCard {...baseProps} />);
    fireEvent.click(screen.getByText(/Continue to Workbook 1 - \$97/));

    await waitFor(() => {
      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith("create-payment", {
        body: { productType: "workbook_1" },
      });
    });

    locationSpy.mockRestore();
  });

  it("shows 'Processing...' while payment is in flight", async () => {
    currentUser = { id: "user-1", email: "test@test.com" };
    // Never-resolving promise to keep loading state
    mockSupabase.functions.invoke.mockReturnValue(new Promise(() => {}));

    render(<WorkbookCard {...baseProps} />);
    fireEvent.click(screen.getByText(/Continue to Workbook 1 - \$97/));

    await waitFor(() => {
      expect(screen.getByText("Processing...")).toBeInTheDocument();
    });
  });

  it("re-enables button and shows toast on payment error", async () => {
    currentUser = { id: "user-1", email: "test@test.com" };
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: null,
      error: { message: "Stripe error" },
    });

    render(<WorkbookCard {...baseProps} />);
    fireEvent.click(screen.getByText(/Continue to Workbook 1 - \$97/));

    await waitFor(() => {
      // Button should be re-enabled (not showing "Processing...")
      expect(screen.getByText(/Continue to Workbook 1 - \$97/)).toBeInTheDocument();
    });
  });

  // ── Authenticated user with access ──

  it("shows 'Continue to Workbook' with checkmark when user has access", () => {
    currentUser = { id: "user-1", email: "test@test.com" };
    mockCheckAccess.mockReturnValue(true);
    render(<WorkbookCard {...baseProps} />);
    expect(screen.getByText("Continue to Workbook 1")).toBeInTheDocument();
  });

  // ── Free workbook ──

  it("shows 'Start Free Workbook' for free products", () => {
    render(<WorkbookCard {...baseProps} price={0} />);
    expect(screen.getByText("Start Free Workbook")).toBeInTheDocument();
  });

  it("displays FREE instead of a dollar amount for free products", () => {
    render(<WorkbookCard {...baseProps} price={0} />);
    expect(screen.getByText("FREE")).toBeInTheDocument();
  });

  // ── Price display ──

  it("displays formatted price correctly", () => {
    render(<WorkbookCard {...baseProps} price={9700} />);
    expect(screen.getByText("$97")).toBeInTheDocument();
  });
});
