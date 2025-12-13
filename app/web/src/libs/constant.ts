export const ENV_NAME =
  process.env.NEXT_PUBLIC_NODE_ENV?.toString() ?? "development";

type EnvBuilder = {
  cmsBase: string;
  apiBase: string;
  cmsBaseInternal: string;
  apiBaseInternal: string;
};

const envBuilder = (props: EnvBuilder) => {
  const { apiBase, apiBaseInternal, cmsBase, cmsBaseInternal } = props || {};

  const envApiBase = process.env.NEXT_PUBLIC_API_BASE;
  const envApiBaseInternal = process.env.NEXT_PUBLIC_API_BASE_INTERNAL;
  const envCmsBase = process.env.NEXT_PUBLIC_CMS_BASE;
  const envCmsBaseInternal = process.env.NEXT_PUBLIC_CMS_BASE_INTERNAL;

  return {
    apiBase: envApiBase || apiBase,
    apiBaseInternal: envApiBaseInternal || apiBaseInternal,
    cmsBase: envCmsBase || cmsBase,
    cmsBaseInternal: envCmsBaseInternal || cmsBaseInternal,
  };
};

export const env = {
  development: envBuilder({
    apiBase: "http://localhost:3001/api",
    apiBaseInternal: "http://localhost:3001/api",
    cmsBase: "http://localhost:3002/api",
    cmsBaseInternal: "http://localhost:3002/api",
  }),
  testing: envBuilder({
    apiBase: "http://localhost:3001/api",
    apiBaseInternal: "http://localhost:3001/api",
    cmsBase: "http://localhost:3002/api",
    cmsBaseInternal: "http://localhost:3002/api",
  }),
  staging: envBuilder({
    apiBase: "http://localhost:3001/api",
    apiBaseInternal: "http://localhost:3001/api",
    cmsBase: "http://localhost:3002/api",
    cmsBaseInternal: "http://localhost:3002/api",
  }),
  production: envBuilder({
    apiBase: "http://host.docker.internal:3001/api",
    apiBaseInternal: "http://host.docker.internal:3001/api",
    cmsBase: "http://localhost:3002/api",
    cmsBaseInternal: "http://host.docker.internal:3002/api",
  }),
}[ENV_NAME];

export const COOKIE_KEYS = {
  SESSION_ID: process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME || "sid",
};
