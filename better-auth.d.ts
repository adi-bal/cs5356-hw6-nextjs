declare module 'better-auth' {
  export const betterAuth: any;
  export const drizzleAdapter: any;
  // Add other exports as needed
}

declare module 'better-auth/adapters/drizzle' {
  export const drizzleAdapter: any;
}

declare module 'better-auth/next-js' {
  export const nextCookies: any;
  export const toNextJsHandler: any;
}

declare module 'better-auth/react' {
  export const createAuthClient: any;
}
