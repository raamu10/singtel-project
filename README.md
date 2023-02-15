# Getting Started with SingTel App

# Steps to up the application

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Screens

# Home Screen
   Display Two tabls "Breeds" and "Search"

# Breeds
   Display list of Breeds
   Implemented API to get Dog breeds - https://api.thedogapi.com/v1/breeds
   Added Loader before api gets back the response
   Added Pagination
   Sort by 'Breed Name', 'Height', 'Life Span' on clicking the Column Title, and gets sorted in Asc or Desc order
   Click on View under Information column to view the details of Breed
   Used redux to store the response data.
   Displayed Error message in toaster

# Search
  Select a Breed
  Added Debounce for 1 sec to make a api call
  Implemented search API to get the Breed data - https://api.thedogapi.com/v1/images/search?limit=20&mime_types=&order=Random&size=small&page=1&breed_ids=2&sub_id=
  Added Loader before api gets back the response
  Using cards each data got displayed
  Added Shimmer Effect(Image loader) before the complete image gets loaded.
  Displayed Error message in toaster

# Test - Jest
  Used Jest for unit testing

# CodeSandbox Link
  https://codesandbox.io/p/github/raamu10/singtel-project/master?workspaceId=acfa9ac3-184b-41e3-8d3d-75fece965cf7&file=%2Fsrc%2Fcomponents%2Fpaginate%2Findex.tsx

# Review URL - From CodeSandbox
  https://nzv22r-3030.preview.csb.app/

# GitHub
  https://github.com/raamu10/singtel-project






