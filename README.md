# GitHub repository search application

This project has `frontend` and `backend`. 

## Frontend
Frontend will how a search bar along with a selector to select between `users` and `repositories`. Once user starts typing in search bar, the react app will make API calls to backend (if search text length is minimum 3 characters) with debounce of 500 milli seconds.
Once API returns the response the react app will store the data in `redux-persist` and will use it for future use, if user types the same text again for select type (Users/Repositories), the react app will fetch from `localStorage` instead of making an API call.

## Backend

The NodeJs application has 2 APIs. 
1. search
2. clear-cache

Search API will take 2 parameters (type and searchText). type can be either `users` or `repositories`. searchText can be any text with minimum 3 characters.
Once the NodeJs application receives the API request with type and searchText, it will make API call to `api.github.com` to fetch relavent results and stores in `REDIS` for configured `TTL` (set TTL in seconds in .env file).

Clear-cache API will clear all stored results in REDIS.

## Setup

Copy .env.example file to .env and update the redis configuration `host`, `port`, `CACHE_TTL`
```
copy .env.example .env
```
##### Frontend


Implementation:
Below are the list of libraries we are using in react app
* React.js
* TypeScript
* Redux and redux-persist (Stores API results in localStorage, which saves API calls on app reload)
* React Router
* Vanilla CSS, Sass

Install the dependencies and devDependencies and start the server.
```sh
$ cd frontend
$ npm install
$ npm run build
```
It will create the `build` folder inside the frontend. this build folder path is already configured in the .env.example file. So that the react application will be served from the `nodejs` server

To run react app in `development` mode,
```
npm run start
```
react app will start on `localhost:3000`
    

##### Backend

Implementation:
This application fetches data (users, repositories & issues) from `api.github.com` and stores in `REDIS` with configured `TTL` value.

Below are the list of libraries used:
* NodeJs
* TypeScript
* Express
* REDIS
* [routing-countroller](https://github.com/typestack/routing-controllers) - for managing the API routes
* [routing-controllers-openapi](https://www.npmjs.com/package/routing-controllers-openapi) - Runtime OpenAPI v3 schema generation
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - for API documentation UI
* Jest - for Unit testing
* SuperTest - for API testing

To run in `production` mode
goto backend folder
```
npm install
npm run start
```
`npm run start` will transpile the TypeScript code to JavaScript and run the server on the configured port in .env file

to run in `development` mode
```
npm run dev
```
In development mode we use `ts-node-dev` library to watch the changes and restart the server automatically.

### Tests

To run tests

```sh
cd backend
npm install
npm run test
```
this will run unit tests and integration test
