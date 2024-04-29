import { fetchNotionSearch } from "../api/notion";
import { parsePageId } from "../api/utils";

export async function searchRoute(queryAncestorId: string, query: string, limit: number, notionToken?: string) {
  const ancestorId = parsePageId(queryAncestorId);

  if (!ancestorId) {
    return {
      data: { error: 'missing required "ancestorId"' },
      status: 400,
    };
  }

  const results = await fetchNotionSearch(
    {
      ancestorId,
      query,
      limit,
    },
    notionToken
  );

  return {
    data: results,
    status: 200,
  };
}
