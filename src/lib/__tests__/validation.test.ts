import { describe, it, expect } from "vitest";
import { authSchema, emailSchema, passwordSchema } from "@/lib/validation";

describe("Validation Schemas", () => {
  describe("emailSchema", () => {
    it("accepts valid email", () => {
      expect(emailSchema.safeParse("test@example.com").success).toBe(true);
    });

    it("trims whitespace", () => {
      const result = emailSchema.safeParse("  test@example.com  ");
      expect(result.success).toBe(true);
      if (result.success) expect(result.data).toBe("test@example.com");
    });

    it("rejects invalid email", () => {
      expect(emailSchema.safeParse("notanemail").success).toBe(false);
    });

    it("rejects empty string", () => {
      expect(emailSchema.safeParse("").success).toBe(false);
    });
  });

  describe("passwordSchema", () => {
    it("accepts valid password", () => {
      expect(passwordSchema.safeParse("ValidPass1").success).toBe(true);
    });

    it("rejects short password", () => {
      const result = passwordSchema.safeParse("Ab1");
      expect(result.success).toBe(false);
    });

    it("rejects password without uppercase", () => {
      expect(passwordSchema.safeParse("alllower1").success).toBe(false);
    });

    it("rejects password without lowercase", () => {
      expect(passwordSchema.safeParse("ALLUPPER1").success).toBe(false);
    });

    it("rejects password without number", () => {
      expect(passwordSchema.safeParse("NoNumberHere").success).toBe(false);
    });
  });

  describe("authSchema", () => {
    it("accepts valid email + password combo", () => {
      expect(authSchema.safeParse({ email: "a@b.com", password: "ValidPass1" }).success).toBe(true);
    });

    it("rejects invalid combo", () => {
      expect(authSchema.safeParse({ email: "bad", password: "short" }).success).toBe(false);
    });
  });
});
