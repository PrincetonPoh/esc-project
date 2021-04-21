# Backend node module
Welcome to the **BACKEND** :) 
# Table of contents
* [Tech stack](#tech-stack)
* [Getting Started](#getting-started)
* [What is the file structure? 🗂](#What-is-the-file-structure?-🗂)
* [Tests](#Tests)
* [Further possible improvements](#Further-possible-improvements)
* [Backend Contributions](#Backend-Contributions)
# General info / Tech stack
The language used is 100% javascript. Sqlite3 is used as our database as it offers a lot of flexibility in just a singular file. We use Knex as our query builder to write the "sql" code. We also enlisted the help of DBbrowser ORM tool that helps us visualise and quickly build the database.
# Getting started
How to run our backend api? 🏃
1. go to the backendPrinceton branch
2. go to the file 'blueprint' and insert the latest postman json file into postman
3. type `npm install` to install all the node dependencies
4. type `npm start`
    - You should see the test "Server is running on port 1337"
5. test the apis on postman :)

# What is the file structure? 🗂
This is our first attempt at trying to modularize our codes by having APIs with similar functions be separated from each other using routes. We also tried to write repeatable code by using our own middleware.
- route_paths
    - Purpose is to route the different files and directory into the main server.js and allow better separation of function for each file.
- routes
    - Contains the api calls for _users_, _posts_, _comments_, _location_ and _authentication_.
- middleware
    - Contains reusable code across the different files in "routes" directory. (e.g uuid generator and jwt auth checker)
- db
    - Contains the querys to the database. This is separated from the API calls to allow for more complex database calls in the future.


# Tests
We use supertest and jest frameworks in our unit testing. We mainly do black box testing to ensure that the api returns what we expect them to. A separate testing database called test.sqlite3 is used.

How to run the test?
1. type the code `npm run test:watch`

# Further possible improvements
1. Create a database schema to check the input types, ensure consistent data types
2. Create unit test for jwt authentication
# Backend Contributions
Most of the work are done primarily by Princeton and Wanghan (backend team). Due to overlapping workscope, the below allocations indicate who is responsible for that section but not necessarily who worked on it.
## Princeton Poh
- Nodejs architecture design
- Setup git workflow(git lens, github desktop)
- Setup postman, knex(query builder), DBbrowser(ORM)
- Email verification server
- JWT authentication
- Unit test for `comments.test.js`
- Unit test for authentication
## Wang Han
- SQLite3 database design
- Fuzzy search implementation
- Setup test database.
- Unit test for `users.test.js`
- Unit test for `posts.test.js`