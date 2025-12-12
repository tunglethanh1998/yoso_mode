import { env } from "@/libs/constant";
import { fetcher } from "@/libs/fetcher";

export const newsCate = {
  ALL: "all",
  IMPORTANT: "important",
  COLUMN: "column",
  CAMPAIGN: "campaign",
  ANNOUNCEMENT: "announcement",
};

export type NewsCate = keyof typeof newsCate;

export type Thumbnail = {
  id: number;
  alt: string;
  prefix: string;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
};

export type NewsType = {
  id?: number;
  title: string;
  type: NewsCate;
  startDateTime: string;
  endDateTime?: string;
  thumbnail?: Thumbnail;
  content?: string;
  link?: string;
  linkBlank?: boolean;
  isNew: boolean;
  hasContent: boolean;
  updatedAt?: string;
  createdAt?: string;
};

export type GetNewsByCategoryQuery = {
  type?: string;
  selects?: string[];
  isHighlighted?: boolean;
  page?: string;
  limit?: string;
};

export type NewsResponse = {
  docs: NewsType[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  totalDocs: number;
  totalPages: number;
};

type GetNewsByIdParams = {
  id: number;
  selects?: string[];
};

class NewsService {
  private baseUrl?: string;
  public getNewsUrl: string;

  constructor(isInternal = false) {
    this.baseUrl = isInternal ? env?.cmsBaseInternal : env?.cmsBase;
    this.getNewsUrl = `${this.baseUrl}/news`;
  }

  public getNewsById = (queries: GetNewsByIdParams) => {
    const { id, selects } = queries || {};
    const isSelectExist = Array.isArray(selects) && selects.length > 0;

    let url = isSelectExist
      ? `${this.getNewsUrl}/${id}?depth=2`
      : `${this.getNewsUrl}/detail/${id}`;

    if (Array.isArray(selects) && selects.length > 0) {
      const selectParams = selects
        .map((field) => `select[${field}]=true`)
        .join("&");
      url += `&${selectParams}`;
    }

    return fetcher<NewsType>(url, { method: "GET" });
  };

  public getNewsByCategory = (
    queries: GetNewsByCategoryQuery,
    config?: RequestInit,
  ) => {
    const { type, selects, isHighlighted, page, limit } = queries || {};

    const currentDate = new Date().toISOString();
    let url = this.getNewsUrl;
    const params = [];

    if (type) {
      params.push(`where[type][equals]=${type}`);
    }

    if (isHighlighted) {
      params.push("where[isHighlighted][equals]=true");
    }

    params.push(`where[startDateTime][less_than_equal]=${currentDate}`);
    params.push(`where[or][0][endDateTime][greater_than_equal]=${currentDate}`);
    params.push(`where[or][1][endDateTime][exists]=false`);
    params.push(`sort=-startDateTime`);

    if (page !== undefined) params.push(`page=${page}`);
    if (limit !== undefined) params.push(`limit=${limit}`);

    if (Array.isArray(selects) && selects.length > 0) {
      selects.forEach((field) => {
        params.push(`select[${encodeURIComponent(field)}]=true`);
      });
    }

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }
    return fetcher<NewsResponse>(url, { method: "GET", ...config });
  };
}

export const newsService = new NewsService();
export const newsServiceInternal = new NewsService(true);
