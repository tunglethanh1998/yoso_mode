import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};


/**
 * Parses and replaces dynamic path segments with provided slug values.
 *
 * This function takes a path template with dynamic segments (e.g., "[id]") and
 * replaces them with actual values from the slug parameter. It handles single
 * values or arrays of values and cleans up the resulting path.
 *
 * @param path - The path template containing dynamic segments in square brackets
 * @param slug - Single value or array of values to replace dynamic segments
 * @returns Cleaned path string with dynamic segments replaced by slug values
 */
export function pathParser(
  path: string,
  slug?: number | number[] | string | string[],
) {
  const slugs = [slug].flat();
  const replacedPath =
    slugs.reduce(
      (obj: string, item) => obj?.replace(/\[\w+\]/, item?.toString() ?? ""),
      path,
    ) ?? "";
  return replacedPath
    ?.toString()
    ?.replace(/\/(\/)+/g, "/")
    .replace(/\/$/g, "");
}

export const removeSpaces = (str?: string) => {
  if (typeof str !== "string") return "";
  return str.replace(/\s+/g, "");
};

export const updateHistory = (newPath: string) => {
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", newPath);
  }
};

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP").format(amount);
};

export const openLinkInNewTab = async (url: string) => {
  if (typeof window !== "undefined") {
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.target = "_blank";

    // Simulate asynchronous behavior
    await new Promise((resolve) => setTimeout(resolve, 0));
    anchor.click();
    anchor.remove();
  }
};

export const postToX = (link: string) => {
  if (typeof window !== "undefined") {
    openLinkInNewTab(`https://x.com/intent/post?text=${link}`);
  }
};

export const extractTweetId = (tweetUrl?: string) => {
  if (!tweetUrl) {
    return { userId: "", tweetId: "" };
  }

  const match = tweetUrl?.match(
    /(?:https?:\/\/)?(?:mobile\.)?(?:twitter|x)\.com\/([^/]+)\/status\/(\d+)/i,
  );

  const userId = match ? match[1] : null;
  const tweetId = match ? match[2] : null;

  return {
    userId: userId || "",
    tweetId: tweetId || "",
  };
};
export async function settleAll<T extends readonly unknown[]>(
  promises: [...{ [K in keyof T]: Promise<T[K]> }],
): Promise<{ [K in keyof T]: T[K] | undefined }> {
  const results = await Promise.allSettled(promises);
  return results.map((r) =>
    r.status === "fulfilled" ? r.value : undefined,
  ) as { [K in keyof T]: T[K] | undefined };
}

export async function maybe<T>(
  cond: boolean,
  fn: () => Promise<T>,
): Promise<T | undefined> {
  return cond ? fn() : Promise.resolve(undefined);
}
