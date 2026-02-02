import { render } from "@react-email/render";
import { Resend } from "resend";
import { SignUpEmail } from "./emails/SignUpEmail";

type MailConfig = {
  resendApiKey?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPass?: string;
  fromEmail: string;
  fromName?: string;
};

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
};

class MailService {
  private config: MailConfig;
  private resend?: Resend;

  constructor(config: MailConfig) {
    this.config = config;
    if (config.resendApiKey) {
      this.resend = new Resend(config.resendApiKey);
    }
  }

  private async sendWithResend(options: SendMailOptions): Promise<void> {
    if (!this.resend) {
      throw new Error("Resend not configured");
    }

    await this.resend.emails.send({
      from: this.config.fromName
        ? `${this.config.fromName} <${this.config.fromEmail}>`
        : this.config.fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  private async sendWithSMTP(options: SendMailOptions): Promise<void> {
    // Using nodemailer for SMTP
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: this.config.smtpHost,
      port: this.config.smtpPort,
      secure: false, // Use TLS
      ignoreTLS: true, // For local development
    });

    await transporter.sendMail({
      from: this.config.fromName
        ? `${this.config.fromName} <${this.config.fromEmail}>`
        : this.config.fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    if (this.resend) {
      await this.sendWithResend(options);
    } else if (this.config.smtpHost) {
      await this.sendWithSMTP(options);
    } else {
      throw new Error(
        "No mail transport configured. Set either RESEND_API_KEY or SMTP settings.",
      );
    }
  }

  async sendSignUpEmail(to: string, name: string): Promise<void> {
    const html = await render(SignUpEmail({ name }));
    await this.sendMail({
      to,
      subject: "Welcome to Super Duper Software!",
      html,
    });
  }
}

export { MailService };
export type { MailConfig, SendMailOptions };
