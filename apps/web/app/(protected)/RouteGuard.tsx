"use client";

import { useGetAccount } from "@superdupersoftware/api-client/generated/query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useGetAccount({
    query: {
      retry: false,
    },
  });
  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case "error":
        router.push("/sign-up");
        break;
      case "pending":
        break;
      case "success":
        break;
    }
  }, [status, router]);

  if (status === "pending") {
    // TODO sup-28: replace with loading spinner
    <div>loading...</div>;
  }

  return <>{children}</>;
}
