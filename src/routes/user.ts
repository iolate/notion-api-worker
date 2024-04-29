import { fetchNotionUsers } from "../api/notion";

export async function userRoute(userId: string, notionToken?: string) {
  const users = await fetchNotionUsers([userId], notionToken);

  return users[0];
}
