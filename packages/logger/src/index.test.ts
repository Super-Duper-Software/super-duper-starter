import { describe, expect, it } from "vitest";
import { logger } from "./index";

describe("Logger", () => {
  it("should export a logger instance", () => {
    expect(logger).toBeDefined();
  });

  it("should have standard logging methods", () => {
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
    expect(logger.warn).toBeDefined();
    expect(logger.debug).toBeDefined();
  });

  it("should be able to log a message", () => {
    expect(() => {
      logger.info({ test: "value" }, "test message");
    }).not.toThrow();
  });
});
