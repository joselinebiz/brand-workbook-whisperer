import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@/test/test-utils";
import { mockSupabase } from "@/test/test-utils";
import { ProtectedWorkbook } from "@/components/ProtectedWorkbook";
import { AuthProvider } from "@/contexts/AuthContext";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderProtected = (props = {}) => {
  return render(
    <AuthProvider>
      <ProtectedWorkbook
        productType="workbook_0"
        priceId="price_123"
        price={4700}
        workbookTitle="Workbook 0"
        {...props}
      >
        <div data-testid="protected-content">Secret Content</div>
      </ProtectedWorkbook>
    </AuthProvider>
  );
};

describe("ProtectedWorkbook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  describe("Unauthenticated user", () => {
    beforeEach(() => {
      mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        callback("SIGNED_OUT", null);
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      });
    });

    it("redirects to /auth when not logged in", async () => {
      renderProtected();
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/auth");
      });
    });

    it("does not show protected content", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
      });
    });
  });

  describe("Authenticated user without access", () => {
    beforeEach(() => {
      const mockSession = {
        access_token: "test-token",
        user: { id: "user-123", email: "test@test.com" },
      };
      mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession } });
      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        callback("SIGNED_IN", mockSession);
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      });
      // Server says no access
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { hasAccess: false },
        error: null,
      });
    });

    it("shows purchase gate", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.getByText("Access Required")).toBeInTheDocument();
      });
      expect(screen.getByText("$47")).toBeInTheDocument();
      expect(screen.getByText("Purchase Now")).toBeInTheDocument();
    });

    it("does not show protected content", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.getByText("Access Required")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    });

    it("triggers purchase flow on button click", async () => {
      mockSupabase.functions.invoke
        .mockResolvedValueOnce({ data: { hasAccess: false }, error: null })
        .mockResolvedValueOnce({ data: { url: "https://checkout.stripe.com/123" }, error: null });

      renderProtected();
      await waitFor(() => {
        expect(screen.getByText("Purchase Now")).toBeInTheDocument();
      });

      // We can't fully test window.location.href redirect, but we can verify the function was called
      fireEvent.click(screen.getByText("Purchase Now"));
      await waitFor(() => {
        expect(mockSupabase.functions.invoke).toHaveBeenCalledWith("create-payment", {
          body: { productType: "workbook_0" },
        });
      });
    });
  });

  describe("Authenticated user with access", () => {
    beforeEach(() => {
      const mockSession = {
        access_token: "test-token",
        user: { id: "user-123", email: "test@test.com" },
      };
      mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession } });
      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        callback("SIGNED_IN", mockSession);
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      });
      // Server says has access
      mockSupabase.functions.invoke.mockResolvedValue({
        data: { hasAccess: true },
        error: null,
      });
    });

    it("shows protected content when server verifies access", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.getByTestId("protected-content")).toBeInTheDocument();
      });
      expect(screen.getByText("Secret Content")).toBeInTheDocument();
    });

    it("does not show purchase gate", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.getByTestId("protected-content")).toBeInTheDocument();
      });
      expect(screen.queryByText("Access Required")).not.toBeInTheDocument();
    });
  });

  describe("Server verification failure", () => {
    beforeEach(() => {
      const mockSession = {
        access_token: "test-token",
        user: { id: "user-123", email: "test@test.com" },
      };
      mockSupabase.auth.getSession.mockResolvedValue({ data: { session: mockSession } });
      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        callback("SIGNED_IN", mockSession);
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      });
      // Server error
      mockSupabase.functions.invoke.mockResolvedValue({
        data: null,
        error: new Error("Server error"),
      });
    });

    it("denies access on server error (fails closed)", async () => {
      renderProtected();
      await waitFor(() => {
        expect(screen.getByText("Access Required")).toBeInTheDocument();
      });
      expect(screen.queryByTestId("protected-content")).not.toBeInTheDocument();
    });
  });
});
