# CS 5356 - HW 6 Next.js Application

## Deployment Instructions

This application requires the following environment variables to be set up in your Vercel deployment:

- `BETTER_AUTH_SECRET`: A secret key for authentication
- `BETTER_AUTH_URL`: The URL of your deployed application
- `DATABASE_URL`: The connection string for your PostgreSQL database

### Steps to Deploy on Vercel

1. Push your code to GitHub
2. Create a new project in Vercel and link it to your GitHub repository
3. In the Vercel project settings, add the following environment variables:
   - `BETTER_AUTH_SECRET`: Generate a random string (e.g., using `openssl rand -base64 32`)
   - `BETTER_AUTH_URL`: Set to your Vercel deployment URL (e.g., `https://cs5356-hw6-nextjs-olive.vercel.app`)
   - `DATABASE_URL`: Set to your PostgreSQL connection string
4. Deploy the application

### Database Setup

This application uses PostgreSQL. You can use a service like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) to create a PostgreSQL database for your deployment.

### Local Development

1. Copy `.env.example` to `.env` and fill in the required environment variables
2. Run `pnpm install` to install dependencies
3. Run `pnpm db:start` to start the local database using Docker
4. Run `pnpm db:migrate` to run database migrations
5. Run `pnpm dev` to start the development server
