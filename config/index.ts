const config = {
  KAKAO_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  KAKAO_AUTH_URL: 'https://kauth.kakao.com/oauth/authorize',
  KAKAO_TOKEN_URL: 'https://kauth.kakao.com/oauth/token',
  KAKAO_LOGOUT: 'https://kapi.kakao.com/v1/user/logout',
  REDIRECT_URI: process.env.NEXT_PUBLIC_REDIRECT_URI,
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
} as const;

export default config;

export const font = {
  src: [
    {
      path: '../public/fonts/SCDream1.otf',
      weight: '100',
    },
    {
      path: '../public/fonts/SCDream2.otf',
      weight: '200',
    },
    {
      path: '../public/fonts/SCDream3.otf',
      weight: '300',
    },
    {
      path: '../public/fonts/SCDream4.otf',
      weight: '400',
    },
    {
      path: '../public/fonts/SCDream5.otf',
      weight: '500',
    },
    {
      path: '../public/fonts/SCDream6.otf',
      weight: '600',
    },
    {
      path: '../public/fonts/SCDream7.otf',
      weight: '700',
    },
    {
      path: '../public/fonts/SCDream8.otf',
      weight: '800',
    },
    {
      path: '../public/fonts/SCDream9.otf',
      weight: '900',
    },
  ],
};
