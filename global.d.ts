// types/env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      API_KEY: string;
      // Add other environment variables you have in your .env file here
    }
  }
  
  // Ensure TypeScript recognizes the `process` global variable
  declare var process: {
    env: NodeJS.ProcessEnv;
  };
  