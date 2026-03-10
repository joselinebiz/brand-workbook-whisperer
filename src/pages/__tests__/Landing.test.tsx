import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/test/test-utils";
import Landing from "../Landing";
import { mockSupabase } from "@/test/test-utils";

describe("Landing Page – Conversion Funnel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Hero Section ──

  it("renders the hero headline", () => {
    render(<Landing />);
    expect(screen.getByText(/Stop Building on Hope/i)).toBeInTheDocument();
  });

  it("renders the primary CTA button with price", () => {
    render(<Landing />);
    expect(screen.getByText("START SYSTEMIZING SUCCESS →")).toBeInTheDocument();
  });

  it("displays the $47 price badge", () => {
    render(<Landing />);
    expect(screen.getByText("$47")).toBeInTheDocument();
  });

  // ── Multiple CTAs throughout the page ──

  it("renders multiple purchase CTAs across sections", () => {
    render(<Landing />);
    const ctaButtons = screen.getAllByRole("button", { name: /Processing|START|GET WORKBOOK/i });
    // Hero + Challenge + What You'll Discover + Complete System + Final CTA = 5
    expect(ctaButtons.length).toBeGreaterThanOrEqual(4);
  });

  // ── CTA triggers payment flow ──

  it("calls create-payment when hero CTA is clicked", async () => {
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { url: "https://checkout.stripe.com/test" },
      error: null,
    });

    render(<Landing />);
    const heroButton = screen.getByText("START SYSTEMIZING SUCCESS →");
    fireEvent.click(heroButton);

    await waitFor(() => {
      expect(mockSupabase.functions.invoke).toHaveBeenCalledWith("create-payment", {
        body: { productType: "workbook_0", discounted: false },
      });
    });
  });

  it("shows 'Processing...' on all CTAs while payment is in flight", async () => {
    mockSupabase.functions.invoke.mockReturnValue(new Promise(() => {}));

    render(<Landing />);
    fireEvent.click(screen.getByText("START SYSTEMIZING SUCCESS →"));

    await waitFor(() => {
      const processingButtons = screen.getAllByText("Processing...");
      expect(processingButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("re-enables CTAs on payment error", async () => {
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: null,
      error: { message: "Stripe error" },
    });

    render(<Landing />);
    fireEvent.click(screen.getByText("START SYSTEMIZING SUCCESS →"));

    await waitFor(() => {
      expect(screen.getByText("START SYSTEMIZING SUCCESS →")).toBeInTheDocument();
    });
  });

  it("re-enables CTAs when no checkout URL is returned", async () => {
    mockSupabase.functions.invoke.mockResolvedValueOnce({
      data: { url: null },
      error: null,
    });

    render(<Landing />);
    fireEvent.click(screen.getByText("START SYSTEMIZING SUCCESS →"));

    await waitFor(() => {
      expect(screen.getByText("START SYSTEMIZING SUCCESS →")).toBeInTheDocument();
    });
  });

  // ── Key content sections ──

  it("renders the 'How It Works' steps", () => {
    render(<Landing />);
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText(/Purchase Workbook 0/)).toBeInTheDocument();
    expect(screen.getByText(/Access interactive app instantly/)).toBeInTheDocument();
  });

  it("renders the FAQ section", () => {
    render(<Landing />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
    expect(screen.getByText(/Is this really just \$47/)).toBeInTheDocument();
  });

  it("renders the bonus webinar announcement", () => {
    render(<Landing />);
    expect(screen.getByText(/BONUS: FREE Live AI Masterclass/)).toBeInTheDocument();
  });

  it("renders trust signals in the final CTA", () => {
    render(<Landing />);
    expect(screen.getByText(/Instant access/)).toBeInTheDocument();
    expect(screen.getByText(/30-day money-back guarantee/)).toBeInTheDocument();
  });

  // ── Footer / Contact ──

  it("renders the support email link", () => {
    render(<Landing />);
    const emailLink = screen.getByText("web@blkbld.co");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest("a")).toHaveAttribute("href", "mailto:web@blkbld.co");
  });
});
