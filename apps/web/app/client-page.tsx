"use client";

import { useGetApi } from "@superdupersoftware/api-client/generated/query";
import useTypedHotKeys from "@superdupersoftware/keyboard-shortcuts";
import { useState } from "react";

export default function ClientPage() {
  const [count, setCount] = useState(0);
  const { data, isLoading } = useGetApi();

  useTypedHotKeys(
    "COUNT",
    (e) => {
      e.preventDefault();
      setCount((c) => c + 1);
    },
    [count],
  );

  return (
    <div>
      <h3>
        API status (client rendered):{" "}
        {isLoading ? "loading..." : data?.data.message}
      </h3>
      <div>
        <p>Count: {count}</p>
        <p>(Press i to increment)</p>
      </div>
    </div>
  );
}
