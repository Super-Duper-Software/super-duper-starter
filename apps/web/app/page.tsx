import { getApi } from "@superdupersoftware/api-client/generated/fetch";
import { Button } from "@superdupersoftware/ui/Button";
import ClientPage from "./client-page";

export default async function Home() {
  const { data } = await getApi();

  return (
    <div>
      <h1>sup boye</h1>
      <h2>
        {" "}
        <Button>Peep us here</Button>
      </h2>
      <h3>API status (server rendered): {data?.message}</h3>
      <ClientPage />
    </div>
  );
}
