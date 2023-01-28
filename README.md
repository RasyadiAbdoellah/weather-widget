# Agency Analytics FE Assessment
A small weather widget that consumes data from the OpenWeatherMap API 5 day forecast endpoint. Deployed using Render at https://agencyanalytics-assessment.onrender.com/.

## About
This project is tooled using [Vite](vitejs.dev/) and uses Yarn for the package manageer. Basic unit testing for all components is done using Cypress. Fonts are loaded via fontsource, and icons are provided by Meteocons.

### Running locally

1. Make sure `yarn` is installed locally, more info can be found [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable). `npm` should also work, but hasn't been tested.
2. Clone repo and run `yarn install` to install all the necessary packages.
3. run `yarn dev` to run a local dev server

Use `yarn test` to start the testing environment. This will open up the Cypress app

### Available commands

- `yarn dev`: start a local dev server
- `yarn build`: generate a production build. Files are saved at `./dist`
- `yarn preview`: spin up a local server that uses the build files. note: build files are needed for this command to work properly.
- `yarn test`: spin up Cypress testing environment.

## Tech used
- [React](https://reactjs.org/)
- [Yarn](https://yarnpkg.com/)
- [Vite](vitejs.dev/)
- [LESS](https://lesscss.org/)
- Montserrat and Teko fonts provided by [Fontsource](https://fontsource.org/)
- [Meteocons](https://bas.dev/work/meteocons), animated weather icons by [Bas Milius](https://bas.dev/about)