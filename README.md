# universal-webpack-boilerplate

1. `npm install`

2. Create a file called config.js inside src/config/ with such content

`export default {};`

In this file you can override any variable defined inside src/config/default.js following the same name path

3. Create an empty file called .env inside the root of the project
In this file you can define any PATH variables which you don't want to specify every time you run the server

For more - see https://github.com/motdotla/dotenv

4.
For development:

`npm run build-dll` - Builds the dll modules (speeds up the webpack's build)

`npm run dev`

For production:

`npm run production`


