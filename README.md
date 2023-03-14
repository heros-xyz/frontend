This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy `development env` with Docker compose

1: Create `.env.development` in the root of project
2: Run command

- Step 1: run command `make build-development`
- Step 2: To start the docker image, run command `make start-development`

The application will be available in port `80` of docker, and port `3000` of http. (See `docker-compose.yml` file in `docker folder`)

If you want to custom port, you can edit port in `docker-compose.yml` and `Dockerfile` in `docker/development` folder

If you want to stop the app, run command `make stop-development`

## Deploy `uat env` with Docker compose

1: Create `.env.uat` in the root of project
2: Run command

- Step 1: run command `make build-uat`
- Step 2: To start the docker image, run command `make start-uat`

The application will be available in port `80` of docker, and port `3000` of http. (See `docker-compose.yml` file in `docker folder`)

If you want to custom port, you can edit port in `docker-compose.yml` and `Dockerfile` in `docker/uat` folder

If you want to stop the app, run command `make stop-uat`

## Deploy `production env` with Docker compose

1: Create `.env.production` in the root of project
2: Run command

- Step 1: run command `make build-production`
- Step 2: To start the docker image, run command `make start-production`

The application will be available in port `80` of docker, and port `3002` of http. (See `docker-compose.yml` file in `docker folder`)

If you want to custom port, you can edit port in `docker-compose.yml` and `Dockerfile` in `docker/production` folder

If you want to stop the app, run command `make stop-production`
