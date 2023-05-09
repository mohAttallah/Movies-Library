# Movies-Library - v1.0.0
Author Name: [Mohammad Attallah]

## WRRC
![WRRC Image](https://www.oreilly.com/api/v2/epubs/9781789349863/files/assets/5d678947-2cad-44df-a4a4-5e78fd50fb52.png)


## Overview
Movies-Library is a simple application that provides information about movies.

## Getting Started
To get started with Movies-Library, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies using `npm install`
3. Start the server using `node server.js`
4. Open your web browser and go to http://localhost:3000

## Project Features
- Home Page Endpoint: `/`
  - Returns information about a specific movie.
- Favorite Page Endpoint: `/favorite`
  - Displays a welcome message.
- Error Handling:
  - Handles server errors (status 500) using a custom error handling function.
  - Handles "page not found" errors (status 404) using a custom error handling function.

## Application Structure

### Movies-Library

  - Movie Data
    - data.json
- .eslintrc.json
- .gitignore
- package-lock.json
-  package.json
 - server.js