import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the env module before importing anything that depends on it
vi.mock("@superdupersoftware/env", () => ({
  env: {
    QSTASH_URL: "http://test-url",
    QSTASH_TOKEN: "test-token",
    QSTASH_CURRENT_SIGNING_KEY: "test-current-key",
    QSTASH_NEXT_SIGNING_KEY: "test-next-key",
  },
}));

import { send } from "./index";

// Mock fetch globally
global.fetch = vi.fn();

describe("Messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("send", () => {
    it("should send a message with correct parameters", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

      await send({
        type: "sample",
        jsonString: JSON.stringify({ key: "value" }),
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("http"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            Authorization: expect.stringContaining("Bearer"),
          }),
          body: expect.stringContaining("sample"),
        }),
      );
    });

    it("should include jobType in the request body", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

      await send({
        type: "sample",
        jsonString: JSON.stringify({ data: "test" }),
      });

      const callArgs = mockFetch.mock.calls[0];
      if (callArgs && callArgs[1]?.body) {
        const body = JSON.parse(callArgs[1].body as string);
        expect(body.jobType).toBe("sample");
        expect(body.data).toBe("test");
      }
    });

    it("should handle empty jsonString", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );

      await send({
        type: "sample",
        jsonString: "{}",
      });

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      if (callArgs && callArgs[1]?.body) {
        const body = JSON.parse(callArgs[1].body as string);
        expect(body.jobType).toBe("sample");
      }
    });
  });
});
