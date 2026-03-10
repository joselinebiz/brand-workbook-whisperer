import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@/test/test-utils";
import PaymentSuccess from "../PaymentSuccess";

// Mock useAuth
const mockRefreshPurchases = vi.fn();
vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    refreshPurchases: mockRefreshPurchases,
  }),
}));

// Mock useSearchParams
let mockSearchParams = new URLSearchParams();
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams],
    useNavigate: () => mockNavigate,
  };
});

import { mockSupabase } from "@/test/test-utils";

describe("PaymentSuccess – Verification Flow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("shows loading spinner on mount", () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("product", "workbook_1");
    // Keep invoke pending
    mockSupabase.functions.invoke.mockReturnValue(new Promise(() => {}));

    render(<PaymentSuccess />);
    expect(screen.getByText("Verifying Payment...")).toBeInTheDocument();
  });

  it("shows error when no session_id is provided", async () => {
    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Verification Error")).toBeInTheDocument();
      expect(screen.getByText("No session ID found")).toBeInTheDocument();
    });
  });

  it("shows error when no product type for non-webinar flow", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    // No "product" param
    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("No product type found")).toBeInTheDocument();
    });
  });

  it("shows confirmation on successful workbook verification", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("product", "workbook_1");
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { success: true },
      error: null,
    });

    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Payment Confirmed!")).toBeInTheDocument();
      expect(screen.getByText("Go to Workbooks")).toBeInTheDocument();
    });
    expect(mockRefreshPurchases).toHaveBeenCalled();
  });

  it("shows error on verification failure", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("product", "workbook_1");
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: null,
      error: { message: "Payment not found" },
    });

    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Verification Error")).toBeInTheDocument();
    });
  });

  it("shows 'Return Home' button on error for navigation", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("product", "workbook_1");
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { success: false },
      error: null,
    });

    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Return Home")).toBeInTheDocument();
    });
  });

  // ── Webinar flow ──

  it("shows account creation form for webinar guest purchase", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("type", "webinar");
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { needsAccount: true, email: "guest@example.com", sessionId: "cs_test_123" },
      error: null,
    });

    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Payment Successful!")).toBeInTheDocument();
      expect(screen.getByDisplayValue("guest@example.com")).toBeInTheDocument();
      expect(screen.getByText("Create Account & Access Webinar")).toBeInTheDocument();
    });
  });

  it("shows webinar-specific success message", async () => {
    mockSearchParams.set("session_id", "cs_test_123");
    mockSearchParams.set("type", "webinar");
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { success: true, verified: true },
      error: null,
    });

    render(<PaymentSuccess />);
    await waitFor(() => {
      expect(screen.getByText("Payment Confirmed!")).toBeInTheDocument();
      expect(screen.getByText("Watch Webinar Now")).toBeInTheDocument();
    });
  });
});
