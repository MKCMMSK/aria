## Description

Quick prototype built to use Audius api to stream music, currently supports 1 hard coded track id.
When it comes to the video, it repeats the video played until a certain amount of loops have been looped, then hides the first player and unhides the next player to show a seamless transition as if it's a full video. Rinse and repeats.

## To Do

Testing is required. Seemingly functional but would like to have tests to validate and prevent regression bugs.

## Getting Started

Clone this repo to your local machine:

```bash
git clone git@github.com:MKCMMSK/aria.git
```

Change directories and install dependencies:

```bash
cd aria
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
