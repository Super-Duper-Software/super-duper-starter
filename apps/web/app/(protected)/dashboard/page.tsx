"use client";

import {
  useGetAccount,
  usePostApiAuthSignOut,
} from "@superdupersoftware/api-client/generated/query";
import { Button } from "@superdupersoftware/ui/Button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, isError } = useGetAccount({
    query: {
      retry: false,
    },
  });
  const { mutate } = usePostApiAuthSignOut({
    mutation: {
      onSuccess: () => {
        router.push("/sign-up");
      },
    },
  });

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {data?.data.name}!</h1>
      <Button onClick={() => mutate()}>Sign Out</Button>
    </div>
  );
}
