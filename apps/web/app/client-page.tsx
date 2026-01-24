"use client";

import { useGetApi } from "@superdupersoftware/api-client/generated/query";

export default function ClientPage() {
  const { data, isLoading } = useGetApi();

  return (
    <h3>
      API status (client rendered):{" "}
      {isLoading ? "loading..." : data?.data.message}
    </h3>
  );
}
