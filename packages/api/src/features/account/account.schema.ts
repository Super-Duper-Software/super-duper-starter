import { UserResultSchema } from "@superdupersoftware/db";

export const AccountResponseBodySchema = UserResultSchema.omit({
  sessions: true,
  accounts: true,
});
