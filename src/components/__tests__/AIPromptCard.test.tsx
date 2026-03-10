import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@/test/test-utils";
import { AIPromptCard } from "@/components/AIPromptCard";

describe("AIPromptCard", () => {
  it("renders title and prompt text", () => {
    render(
      <AIPromptCard
        title="Test Prompt"
        prompt="This is a test prompt with data: Hello World"
      />
    );
    expect(screen.getByText("Test Prompt")).toBeInTheDocument();
    expect(screen.getByText("This is a test prompt with data: Hello World")).toBeInTheDocument();
  });

  it("renders context when provided", () => {
    render(
      <AIPromptCard
        title="Test"
        prompt="prompt text"
        context="Use this after doing X"
      />
    );
    expect(screen.getByText("Use this after doing X")).toBeInTheDocument();
  });

  it("does not render context when not provided", () => {
    const { container } = render(
      <AIPromptCard title="Test" prompt="prompt text" />
    );
    expect(container.querySelector(".italic")).toBeNull();
  });

  it("shows Copy button initially", () => {
    render(<AIPromptCard title="Test" prompt="prompt text" />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("renders prompt with auto-filled user data", () => {
    const customerName = "Sarah";
    const age = "35";
    const prompt = `Act as a psychologist. Profile: ${customerName || '[Name]'}, age ${age || '[Age]'}.`;

    render(<AIPromptCard title="Consumer Psychologist" prompt={prompt} />);
    expect(screen.getByText(/Act as a psychologist. Profile: Sarah, age 35./)).toBeInTheDocument();
  });

  it("renders prompt with fallback placeholders when data is empty", () => {
    const customerName = "";
    const age = "";
    const prompt = `Act as a psychologist. Profile: ${customerName || '[Name]'}, age ${age || '[Age]'}.`;

    render(<AIPromptCard title="Consumer Psychologist" prompt={prompt} />);
    expect(screen.getByText(/\[Name\]/)).toBeInTheDocument();
    expect(screen.getByText(/\[Age\]/)).toBeInTheDocument();
  });
});
