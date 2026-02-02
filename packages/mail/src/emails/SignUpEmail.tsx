import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

type SignUpEmailProps = {
  name: string;
};

export const SignUpEmail = ({ name }: SignUpEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Super Duper Software!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Heading style={heading}>Welcome, {name}! 🎉</Heading>
          <Text style={text}>
            Thanks for signing up with Super Duper Software. We're excited to
            have you on board!
          </Text>
          <Text style={text}>
            Your account has been successfully created and you're ready to get
            started.
          </Text>
          <Text style={text}>
            If you have any questions, feel free to reach out to our support
            team.
          </Text>
          <Text style={signature}>
            Best regards,
            <br />
            The Super Duper Software Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

SignUpEmail.PreviewProps = {
  name: "John Doe",
} as SignUpEmailProps;

export default SignUpEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const signature = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
  marginTop: "32px",
};
