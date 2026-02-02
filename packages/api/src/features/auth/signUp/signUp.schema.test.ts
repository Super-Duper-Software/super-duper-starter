import { describe, expect, it } from "vitest";
import { SignUpRequestBodySchema } from "./signUp.schema";

describe("SignUp Schema", () => {
  describe("SignUpRequestBodySchema", () => {
    it("should validate a valid signup request", () => {
      const validData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const result = SignUpRequestBodySchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject empty name", () => {
      const invalidData = {
        name: "",
        email: "test@example.com",
        password: "password123",
      };

      const result = SignUpRequestBodySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject invalid email", () => {
      const invalidData = {
        name: "Test User",
        email: "not-an-email",
        password: "password123",
      };

      const result = SignUpRequestBodySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject short password", () => {
      const invalidData = {
        name: "Test User",
        email: "test@example.com",
        password: "short",
      };

      const result = SignUpRequestBodySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject long password", () => {
      const invalidData = {
        name: "Test User",
        email: "test@example.com",
        password: "a".repeat(101),
      };

      const result = SignUpRequestBodySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("should reject long name", () => {
      const invalidData = {
        name: "a".repeat(101),
        email: "test@example.com",
        password: "password123",
      };

      const result = SignUpRequestBodySchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
