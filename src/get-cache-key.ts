import { IncomingHttpHeaders } from "http";

export function getCacheKey(url: string, headers: IncomingHttpHeaders): string | null {
  if (headers.pragma === "no-cache") {
    return null;
  }

  const cacheControl = headers["cache-control"];
  if (cacheControl) {
    const directives = new Set(cacheControl.split(",").map((s) => s.trim()));
    if (directives.has("no-store") || directives.has("no-cache")) {
      return null;
    }
  }

  return url;
}

// import { getCacheKey } from "./get-cache-key";
// const cacheKey = getCacheKey(request);
// if (cacheKey) {
//   try {
//     response = await cache.match(cacheKey);
//   } catch (err) {}
// }
//   if (cacheKey) {
//     await cache.put(cacheKey, res.clone());
//   }

// TODO: cache
// getCacheKey(req.url, req.headers)
