import { env } from "@superdupersoftware/env";
import { Receiver } from "@upstash/qstash";
import type { MessageData } from "./types";

export { MessageDataSchema, type MessageType } from "./types";
export type { MessageData };

type ReceiveOptions = {
  signature: string;
  body: string;
};

export const verify = async ({ body, signature }: ReceiveOptions) => {
  const receiver = new Receiver({
    currentSigningKey: env.QSTASH_CURRENT_SIGNING_KEY,
    nextSigningKey: env.QSTASH_NEXT_SIGNING_KEY,
  });
  return receiver.verify({
    signature,
    body,
  });
};

export const send = (message: MessageData) => {
  return fetch(`${env.QSTASH_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.QSTASH_TOKEN}`,
    },
    body: JSON.stringify(message),
  });
};
