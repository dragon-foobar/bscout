export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
}
