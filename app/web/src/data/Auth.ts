import { env } from "@/libs/constant";
import { fetcher } from "@/libs/fetcher";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type LogoutResponse = {
  accessToken: string;
};

class AuthService {
  private baseUrl = `${env?.apiBase}`;
  public loginUrl = `${this.baseUrl}/members/login`;
  public logoutUrl = `${this.baseUrl}/members/logout`;

  public login = (credentials: LoginRequest) => {
    return fetcher<LoginResponse>(this.loginUrl, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  };

  public logout = () => {
    return fetcher<LogoutResponse>(this.logoutUrl, {
      method: "POST",
    });
  };
}

export const authService = new AuthService();
