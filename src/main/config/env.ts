export const env = {
  port: process.env.PORT ?? 8000,
  secretkey: process.env.SECRET ?? '!@Ian^vv$%.',
  facebookApi: {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '378192867548072',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '3f21b8e402e95448cf7b84b875d75b7e',
    // this token expires in 3 moths
    accessTokenInTestMode: 'EAAFX9uOG26gBAAkSNqdsbgbCsT2nyogyl7iFvih1cZAElZBxzCZB5pV2n88HIhTgYOBblD9Qd8B0M5U2agGNYsuupeFHl91E9ZCeuVvFvIBnl2S7V0iLzdXJK4bW8Tc2tEhbk6k8Eza4tpXvXTAlm3crZCavfuGHkYNzEdAhZBq6U0uZCLsMf6kHF4qXZAeA0ZCBmjLZBGWuOYwgZDZD'
  }
}
