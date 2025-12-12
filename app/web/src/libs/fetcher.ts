import { notFound } from "next/navigation";
import { ROUTE } from "./enum";

export const errorCode = {
  NotFound: 404,
  InternalServerError: 500,
};

export type ErrorCode = keyof typeof errorCode;

async function fetchData<T = JSON>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  let timezone = undefined;

  // Client timezone only, ignore server timezone
  if (typeof window !== "undefined") {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const headers = {
    ...(init?.headers ?? {
      "Content-Type": "application/json",
      accept: "application/json",
    }),
  };

  const response = await fetch(input, {
    ...init,
    credentials: "include",
    cache: "no-cache",
    headers,
  })
    .then(async (res) => {
      if (res.status === errorCode.NotFound) {
        if (typeof window !== "undefined") {
          window.location.href = ROUTE.NOT_FOUND;
        } else {
          notFound();
        }
      }

      if (!res?.ok && res.status >= 500) {
        const errorText = await res.text();
        console.error(`Request ${input} failed ${res?.status} ${errorText}`);
        throw new Response("Server error", { status: 500 });
      }

      return res.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        return Promise.reject(err);
      }
    });

  return response;
}

export function fetcher<T = JSON>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetchData<T>(input, init);
}
