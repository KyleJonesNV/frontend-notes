## Frontend markdown notes app

This is a personal project I built to experiment with [Next.js](https://nextjs.org/) and [AWS](https://aws.amazon.com/) services.

## Backend repo

The backend of the application was built in golang and can be found [here](https://github.com/KyleJonesNV/go-service-notes)

## About the app

It is a simple note taking application with support for categorizing notes into topics.
Something unique about the application is its support for markdown and code snippets.

## Test it out

The application is currently hosted [here](http://frontend-notes.s3-website-eu-west-1.amazonaws.com/)
It is setup with a test user so feel free to add new topics and notes if you would like to see how it works.

## Running locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Running locally will connect you to the backend database hosted in AWS.

## Improvements / things I would like to do next

<ol>
  <li>User login support</li>
  <li>Support for editting existing notes</li>
</ol> 

