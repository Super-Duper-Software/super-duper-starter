import { z } from "zod";

export const MessageDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("sample"),
    payload: z.object({
      message: z.string(),
    }),
  }),
  z.object({
    type: z.literal("notification"),
    payload: z.object({
      title: z.string(),
      body: z.string(),
    }),
  }),
]);

export type MessageData = z.infer<typeof MessageDataSchema>;

export type MessageType = MessageData["type"];
