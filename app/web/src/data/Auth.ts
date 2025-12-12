import { env } from "@/libs/constant";
import { fetcher } from "@/libs/fetcher";
import { BaseResponse } from "./type";

export type LoginRequest = {
  account_id: string;
  first_name: string;
  family_name: string;
  remember_me: boolean;
};

export type LoginResponse = {
  token?: string;
  user?: {
    id: string;
    account_id: string;
    first_name: string;
    family_name: string;
  };
  statusCode?: number;
  success?: boolean;
  message?: string;
  path?: string;
};

export type LogoutResponse = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  path?: string;
};

export type GetRememberMeRes = {
  account_id: string;
  first_name: string;
  family_name: string;
};

class AuthService {
  private baseUrl = `${env?.apiBase}`;
  public loginUrl = `${this.baseUrl}/members/login`;
  public logoutUrl = `${this.baseUrl}/members/logout`;

  public login = (credentials: LoginRequest) => {
    return fetcher<BaseResponse<LoginResponse>>(this.loginUrl, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  };

  public logout = () => {
    return fetcher<BaseResponse<LogoutResponse>>(this.logoutUrl, {
      method: "POST",
    });
  };
}

export const authService = new AuthService();
