# ₿scout
### Forge your path to working in Bitcoin

A directory and idea sharing platform built on [Next.js](https://nextjs.org/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database).

![People socialising in a pub](https://www.bscout.io/content/images/size/w960/2024/01/568791_Vibrant-painting-of-young-and-middle-aged-men-and-_xl-1024-v1-0.png)

## Contributing
₿scout is a passion project by and for bitcoiners (initiated by Finsko, Bayani and Crispy). As we are all strapped for time, we would love for anyone who is interested to get involved, whether you're a junior or experienced developer, a designer, project manager.

You can contribute in multiple ways:
- Join the BScout [Alpha chat group](https://t.me/BSCOUTio).
- Submit issues that you see with the alpha version.
- Submit pull requests on code that could be improved or changed.
- ... and there are lots of other ways you could help, you can email us at [hello@bscout.io](mailto:hello@bsout.io)!

## Live Deployments
- Production (alpha) - [https://alpha.bscout.io](https://alpha.bscout.io)
- Development (alpha) - [https://dev.bscout.io](https://dev.bscout.io)

## Local Development Instructions
These instructions are for anyone who would like to solve problems and contribute to the Bscout application.

1. Fork this repository to your own.
2. Download your forked version to your local computer.
3. 

1. Go to https://github.com/settings/developers and create a new OAuth application
2. Name your application **"MongoDB Starter"**
3. Set the homepage URL to **`https://vercel.app`** for now (we'll change this later)
4. Set the authorization callback URL to **`https://vercel.app/api/auth/callback/github`** for now (we'll change this later)
5. Click "Register application".
6. Once the application is created, copy the "Client ID". This will be your **`GITHUB_CLIENT_ID`**.
7. Generate a new client secret and copy that too. This will be your **`GITHUB_CLIENT_SECRET`**.
8. Generate a random secret [here](https://generate-secret.vercel.app/32). This will be your **`NEXTAUTH_SECRET`**.
9. Click on this button below to clone and deploy this template to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fmongodb-starter&project-name=mongodb-nextjs&repository-name=mongodb-nextjs&demo-title=MongoDB%20Developer%20Directory&demo-description=Log%20in%20with%20GitHub%20to%20create%20a%20directory%20of%20contacts.&demo-url=https%3A%2F%2Fmongodb.vercel.app%2F&demo-image=https%3A%2F%2Fmongodb.vercel.app%2Fog.png&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH&env=GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,NEXTAUTH_SECRET&envDescription=Instructions%20on%20how%20to%20configure%20these%20env%20vars:&envLink=https://github.com/vercel/mongodb-starter/blob/main/.env.example)

10. Once your application is deployed, **edit the homepage & callback URLs in your GitHub OAuth App to match your deployment URL**.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Vercel](https://vercel.com/)
