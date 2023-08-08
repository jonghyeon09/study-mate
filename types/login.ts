export interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  id_token?: string;
  scope?: string;
}

export interface User {
  username: string;
  profileImage: string;
}

export interface LoginUser {
  token: string;
  user: User;
  isNew: boolean;
}
