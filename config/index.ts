const config = {
  KAKAO_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  KAKAO_AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
  KAKAO_TOKEN_URL: 'https://kauth.kakao.com/oauth/token',
  KAKAO_LOGOUT: 'https://kapi.kakao.com/v1/user/logout',
  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;

export default config;
