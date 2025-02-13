---
marketplace: false
reason: We already have another template for on demand ISR
---

# On demand ISR

This example shows how to use on demand ISR to revalidate content when a user clicks a button or a webhook calls an API route.

## Demo

https://solutions-on-demand-isr.vercel.app

## How to Use

### Fill environment variables

Rename .env.example to .env and fill `SECRET` (the secret protecting your `tweets` API route) and `TWITTER_TOKEN` (your app token from https://developer.twitter.com).

### Deploy

You can choose from one of the following two methods to use this repository:

#### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/examples/tree/main/solutions/on-demand-isr&project-name=on-demand-isr&repository-name=on-demand-isr)

#### Clone and Deploy

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/vercel/examples/tree/main/solutions/on-demand-isr
# or
yarn create next-app --example https://github.com/vercel/examples/tree/main/solutions/on-demand-isr
```

Next, run Next.js in development mode:

```bash
npm install
npm run dev

# or

yarn
yarn dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=edge-middleware-eap) ([Documentation](https://nextjs.org/docs/deployment)).
