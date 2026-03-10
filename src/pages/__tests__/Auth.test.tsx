import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/test-utils";
import { mockSupabase } from "@/test/test-utils";
import Auth from "@/pages/Auth";
import { AuthProvider } from "@/contexts/AuthContext";

// Wrap Auth in AuthProvider for tests
const renderAuth = (searchParams = "") => {
  // Set URL search params
  Object.defineProperty(window, "location", {
    writable: true,
    value: { ...window.location, search: searchParams, origin: "http://localhost:3000", href: "http://localhost:3000/auth" + searchParams },
  });

  return render(
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
};

describe("Auth Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
  });

  describe("Rendering", () => {
    it("renders sign-in form by default", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("toggles to sign-up form", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Don't have an account? Sign up"));
      expect(screen.getByText("Create Account")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });

    it("toggles back to sign-in from sign-up", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Don't have an account? Sign up"));
      fireEvent.click(screen.getByText("Already have an account? Sign in"));
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });

    it("shows forgot password form", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Forgot password?"));
      expect(screen.getByText("Reset Password")).toBeInTheDocument();
      expect(screen.getByText("Send Reset Link")).toBeInTheDocument();
    });

    it("pre-fills email from URL param and defaults to sign-up", async () => {
      renderAuth("?email=test@example.com");
      await waitFor(() => {
        expect(screen.getByText("Create Account")).toBeInTheDocument();
      });
      expect(screen.getByPlaceholderText("Email")).toHaveValue("test@example.com");
    });

    it("shows password reset mode when reset=true", async () => {
      renderAuth("?reset=true");
      await waitFor(() => {
        expect(screen.getByText("Set New Password")).toBeInTheDocument();
      });
      expect(screen.getByText("Update Password")).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("rejects invalid email on sign-in", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "notanemail" } });
      fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "ValidPass1" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      // Should NOT call supabase auth
      await waitFor(() => {
        expect(mockSupabase.auth.signInWithPassword).not.toHaveBeenCalled();
      });
    });

    it("rejects short password on sign-up", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Don't have an account? Sign up"));
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "short" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      await waitFor(() => {
        expect(mockSupabase.auth.signUp).not.toHaveBeenCalled();
      });
    });

    it("rejects password without uppercase on sign-up", async () => {
      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Don't have an account? Sign up"));
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@test.com" } });
      fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "alllowercase1" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      await waitFor(() => {
        expect(mockSupabase.auth.signUp).not.toHaveBeenCalled();
      });
    });
  });

  describe("Sign In Flow", () => {
    it("calls signIn on valid credentials", async () => {
      mockSupabase.auth.signInWithPassword.mockResolvedValue({ data: { session: {} }, error: null });

      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
      fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "ValidPass1" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      await waitFor(() => {
        expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "ValidPass1",
        });
      });
    });
  });

  describe("Sign Up Flow", () => {
    it("calls signUp on valid credentials", async () => {
      mockSupabase.auth.signUp.mockResolvedValue({ data: { user: { id: "123" } }, error: null });

      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Don't have an account? Sign up"));
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "new@example.com" } });
      fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "ValidPass1" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      await waitFor(() => {
        expect(mockSupabase.auth.signUp).toHaveBeenCalled();
      });
    });
  });

  describe("Forgot Password Flow", () => {
    it("sends reset email on valid email", async () => {
      mockSupabase.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

      renderAuth();
      await waitFor(() => {
        expect(screen.getByText("Welcome Back")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText("Forgot password?"));
      fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
      fireEvent.submit(screen.getByPlaceholderText("Email").closest("form")!);

      await waitFor(() => {
        expect(mockSupabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
          "test@example.com",
          expect.objectContaining({ redirectTo: expect.stringContaining("/auth?reset=true") })
        );
      });
    });
  });
});
