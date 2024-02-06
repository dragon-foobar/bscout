export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        throw new Error("Unauthorized", error.message);
      });
  });
}

// if (!res.ok && res.status === 401) {
//   throw new Error('Unauthorized');
// }

// return res.json();
