# Frontend Node Module

Sup, here's the **~frontend~**

# Table of Contents

- [General Info](#General-Info)
- [Getting Started](#Getting-Started)
- [File Structure](#File-Structure)
- [Tests](#Tests)
- [Further Possible Improvements ](#Further-Possible-Improvements)
- [Contributions](#Contributions)

# General Info

Frontend uses React JS to build our UI and communicates with backend asynchronously using HTTP client Axios. UI elements are styled with CSS. Test files are written in Java.

# Getting Started

1. Type `npm install`
2. Type `npm start`

# File Structure

Our source code found under the `src` folder are separated into these four folders:

- `Pages` - contains the main pages that can be navigated to on our web app. These are imported in `App.js` which routes to the relevant pages.
- `Components` - contains reusable classes that are used in in relevant pages or inside other components, helping us modularize our code.
- `Media` - contains all image files (eg. icons and logos) that are displayed on our web app. These are imported in the relevant pages or components where necessary.
- `Styles` - contains all CSS files used to style different pages and components. Some CSS files have properties applied to multiple JS files for consistency of our UI.

# Tests

Test files can be found under the `frontend` folder. These mostly consist of system tests across the various use cases we have identified.

- `CreatePostTest` uses a fuzzer to generate random inputs to fill in the different fields required when creating a post. Preset inputs are also used to create a few posts.
- `SiteNavigationTest` clicks different links to navigate to different pages on the web app.
- `SigninPopupTest` tests the sign in functionality by logging in with valid credentials and attempting to do so with invalid ones. Field validation is also detected by checking if the relevant error messages appear.
- `CommentTest`
-

# Further Possible Improvements

1. Ability to delete comments
2. Ability to customize user profiles (eg. profile pictures, bio)
3. Better UI when viewing on smaller screens / mobile devices

# Contributions

The frontend team of three worked on different parts of the web app.

## Tan Kewen

- Created navigation bar and sidebar (`Navbar.js`)
- Created pop ups for signing in and confirmation messages (`SigninPopup.js` and `DeletePopup.js`)
- Helped create pages with forms to sign up for an account and create a post (`CreatePost.js` and `Signup.js`)
- Helped with generation of cards and other elements to be displayed on the homepage and user page (`Home.js` and `User.js`)
- Helped retrieve post details and display them on the post page (`Post.js`)
- Added deleting of posts functionality on the user page (`User.js`)
- Style all UI elements with CSS (all files under `styles`)
- Wrote tests `CreatePostTest`, `SiteNavigationTest` and `SigninPopupTest`

## Tan Jianhui

- Created comments (entire `Comment` section in components)
- Added functionality for 'Attend event' (`User.js`)
  - Updated user's profile page (overview) to show all events that said user has signed up for (by pressing the 'Attend' button)
  - Owner of said post can quickly check on the attendees for their event on their user page without clicking on the post
- Implemented initial axios calls for `Signup.js` and `CreatePost.js`
- QoL and other small fixes, such as 'Enter'-ing when signing in, number of attendees for each event shown on respective card, etc.
- Wrote `CommentTest` and `AttendTest`
