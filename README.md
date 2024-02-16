# ₿scout
### Forge your path to working in Bitcoin

The BScout app is working towards being a directory and idea sharing platform to help bitcoiners get connected and build things together. Built on [Next.js](https://nextjs.org/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database).

![People socialising in a pub](https://www.bscout.io/content/images/size/w960/2024/01/568791_Vibrant-painting-of-young-and-middle-aged-men-and-_xl-1024-v1-0.png)

## Contributing
₿scout is a passion project 🧡 by and for bitcoiners (initiated by Finsko, Bayani and Crispy in Australia 🇦🇺). As we are all strapped for time, we would love for anyone who is interested to get involved, whether you're a junior or experienced developer, a designer, project manager.

You can contribute in multiple ways:
- Join the BScout [Alpha chat group](https://t.me/BSCOUTio).
- Submit issues that you see with the alpha version.
- Submit pull requests on code that could be improved or changed. (here's a [how-to](https://www.youtube.com/watch?v=z8CYDyFqzp0)). ***Hint: if you feel like a beginner in this stack, you can look for the 'good first issue' label in the Issues section***
- Design user experiences or user interfaces for features.
- ... and there are lots of other ways you could help, you can email us at [hello@bscout.io](mailto:hello@bsout.io)!

## Live Deployments
- Production (alpha) - [https://alpha.bscout.io](https://alpha.bscout.io)
- Development (alpha) - [https://dev.bscout.io](https://dev.bscout.io)

## Local Development Instructions
These instructions are for anyone who would like to solve problems and contribute to the Bscout application.

### Requirements
In order to develop locally, you will need the following:
- [nodejs](https://nodejs.org/en/download)
- npm, yarn or pnpm - [read comparison](https://blog.logrocket.com/javascript-package-managers-compared/)
### Steps
1. Fork this repository to your own.
2. Clone/download your forked version to your local computer.

```
git clone https://github.com/dragon-foobar/bscout.git
```

3. On your local machine, navigate to inside the cloned repository.

```
cd bscout
```
4. Install dependencies (replace yarn your package manager)
```
yarn install
```
5. Set up environment variables. Instructions can be found in ```.env.example```. You need to duplicate this file and call it ```.env```. For the MongoDB url, you will need to create your own instance of a MongoDB. You can use the free MongoDB Cloud Atlas version designed for developers. Learn more [here](https://www.mongodb.com/basics/create-database).
6. Now that you've installed dependencies and you have your environment variables set up. You can run the development server. All commands can be found in ```package.json```
``` yarn dev ```
7. Once this is working, next steps are to explore the code, make changes and commit those using git. You'll need to use an code editor such as Visual Studio Code. If you are not sure about how to use git, here's a [tutorial](https://www.youtube.com/watch?v=tRZGeaHPoaw).

## Technology Stack
Below is a list of technologies used to produce and run this app. If you are familiar with using React but not nextjs, you can their docs in the link or follow a tutorial like [this](https://www.youtube.com/watch?v=9P8mASSREYM&list=PLC3y8-rFHvwgC9mj0qv972IO5DmD-H0ZH)

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Vercel](https://vercel.com/)

🤟
