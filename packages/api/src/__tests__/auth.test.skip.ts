import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../app";
import { setupTestDatabase, teardownTestDatabase } from "./db-setup";

describe("Auth API", () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  describe("POST /api/sign-up", () => {
    it("should create a new user", async () => {
      const res = await app.request("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        }),
      });

      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe("test@example.com");
      expect(data.user.name).toBe("Test User");
    });

    it("should return 422 for invalid email", async () => {
      const res = await app.request("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "invalid-email",
          password: "password123",
        }),
      });

      expect(res.status).toBe(400);
    });

    it("should return 422 for short password", async () => {
      const res = await app.request("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test2@example.com",
          password: "short",
        }),
      });

      expect(res.status).toBe(400);
    });

    it("should return 422 for duplicate email", async () => {
      // First signup
      await app.request("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "First User",
          email: "duplicate@example.com",
          password: "password123",
        }),
      });

      // Duplicate signup
      const res = await app.request("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Second User",
          email: "duplicate@example.com",
          password: "password123",
        }),
      });

      expect(res.status).toBe(422);
    });
  });

  describe("GET /api", () => {
    it("should return ping response", async () => {
      const res = await app.request("/api");
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe("Up and running!");
    });
  });

  describe("GET /api/users", () => {
    it("should return list of users", async () => {
      const res = await app.request("/api/users");
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });
});
