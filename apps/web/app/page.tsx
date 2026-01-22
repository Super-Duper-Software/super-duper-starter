import { getApi } from "@repo/api-client/generated/fetch";

export default async function Home() {
  const { data } = await getApi();

  return (
    <div>
      <h1>sup boye</h1>
      <h2>
        {" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://superdupersoftware.net"
        >
          Peep us here
        </a>
      </h2>
      <h3>API status: {data?.message}</h3>
    </div>
  );
}
