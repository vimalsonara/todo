import { Client } from "pg";

export async function getClient() {
  const client = new Client(process.env.DB_URI);
  await client.connect();
  return client;
}
