import { describe, expect, it, vi } from "vitest";
import { MailService } from "./mailService";

describe("MailService", () => {
  describe("constructor", () => {
    it("should create a MailService instance with Resend", () => {
      const mailService = new MailService({
        resendApiKey: "test-api-key",
        fromEmail: "test@example.com",
      });
      expect(mailService).toBeDefined();
    });

    it("should create a MailService instance with SMTP", () => {
      const mailService = new MailService({
        smtpHost: "localhost",
        smtpPort: 1025,
        fromEmail: "test@example.com",
      });
      expect(mailService).toBeDefined();
    });

    it("should create with fromName", () => {
      const mailService = new MailService({
        resendApiKey: "test-api-key",
        fromEmail: "test@example.com",
        fromName: "Test Sender",
      });
      expect(mailService).toBeDefined();
    });
  });

  describe("sendMail", () => {
    it("should throw error if no transport configured", async () => {
      const mailService = new MailService({
        fromEmail: "test@example.com",
      });

      await expect(
        mailService.sendMail({
          to: "recipient@example.com",
          subject: "Test",
          html: "<p>Test</p>",
        }),
      ).rejects.toThrow("No mail transport configured");
    });
  });
});
