# universal-webpack-boilerplate

This is a boilerplate of a project built with react and redux, based on [universal-webpack](https://github.com/halt-hammerzeit/universal-webpack).

This project is a massive rework of [this boilerplate](https://github.com/halt-hammerzeit/webpack-react-redux-isomorphic-render-example) with some ideas taken from [this project](https://github.com/erikras/react-redux-universal-hot-example)

## Feautures

+ Universal (server) rendering
+ Fully immutable state
+ ESLINT
+ react-router 4 (currently beta)
+ react-hot-loader 3
+ Own component for supporting native gettext localization
+ webpack-dll-plugin for faster dev build

## Installation
1. `npm install`

2. Create a file called config.js inside src/config/ with such content

	`export default {};`

	In this file you can override any variable defined inside src/config/default.js following the same name path

3. Create an empty file called .env inside the root of the project.
In this file you can define any PATH variables which you don't want to specify every time you run the server

	For more - see [this](https://github.com/motdotla/dotenv)

4. Two options

	- For development:

	1. `npm run build-dll` - Builds the dll modules (speeds up the webpack's build)

	2. `npm run dev`

	+ For production: `npm run production`


