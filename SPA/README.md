# Book List app

Using Vue.js or AngularJS, implement an SPA that gets information from a server (explained below) and has the following pages:

### Books list
* Display all available books returned from the API.
* Synopsis should be truncated at 200 characters.
Book's title and cover should link to the book's individual page.
Though the upvote functionality is not required, the upvote state should be represented.

### Book page

* Display a single book information, highlighting the cover and displaying the full synopsis.
* The upvote functionality is not required, the UI should only reflect if a book has been upvoted yet or not. For this question, you don't have to replicate the example screens above, feel free to implement any design that you'd like.

### Important notes:

* Add test coverage as you see fit;
* You may use TypeScript instead of plain JS;
* Use a CSS pre-processor;
* Your app must be responsible for all of it's dependencies and they should be installed via yarn or npm install. The app must run by using either yarn start or npm start.

### Bonus

* Implement text search on the books list (for title and synopsis)
* Add pagination on the books list
* Add a comments section on the book page


## Prerequisites for starting app

### 1. Install Node.js and NPM

If Node.js is not already on our machine, Install Node.js from the following site [https://nodejs.org/en](https://nodejs.org/en).

NPM comes along with Node, so installing node will install Node and NPM at once.

You can check the version of Node and NPM by entering the following commads in terminal: `node -v` and `npm -v`.

### 2. Install Angular CLI

To install `angular-cli` enter the following command in terminal:

```
npm -i -g angular-cli
```

## Quick start

### 1. Clone the repo
```
git clone https://github.com/luka-stanisic/Reedsy-engineer-challenge.git
cd reedsy-engineer-challenge/spa/clientApp
```

### 2. Install npm packages
Install the `npm` packages described in the `package.json` and verify that it works:

```
npm install
```

### 3. Run application

Run `npm run start` to start the development server. 
You can shut it down with `Ctrl-C`.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### 3. Run mock server

Navigate to `front-end/q4/server` and install the server dependencies using

```
npm install
```

Then run the server using

```
npm run server
```

The server should be running on port 3000.

#### Available routes: 

[http://localhost:3000/books](http://localhost:3000/books)

Returns a list of books, with their info.

[http://localhost:3000/books/SLUG](http://localhost:3000/books/SLUG)

Returns the book information for the given SLUG (404 otherwise).