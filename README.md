# Blog API

A REST API back-end server

## Description

An API only back-end that supports the <a href="https://github.com/Daze-bot/blog-consumer">Blog</a> and <a href="https://github.com/Daze-bot/blog-author">Blog Author</a> front-ends in order to make CRUD operations on the MongoDB database

### API Calls
- Direct API calls to https://daze-blog-api.fly.dev *Note: this website will display "Not Found" if accessed directly as it is for API calls only*

### Features
- MVC design pattern
- RESTful API
- Security handled with Passport and Bcrypt
- Authorization handled with JSON Web Token
- MongoDB database management

### Built with

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Passport
- JWT
- Bcryptjs
- Fly.io hosting
- Dotenv

## Getting started

### Prerequisites

- Built on Ubuntu 20.04
- Install npm on local machine

### Install

- Clone the github repository
- run ```npm install``` to install all dependencies
- run ```npm run devstart``` to start the server and allow for API calls to localhost

### Configure

- The MongoDB URI and Bcrypt secret codes are hidden using a .env file for security reasons.  In order for a new developer to use this API, they would either need access to those codes, or create their own database and encryption

### Usage

#### Navigating the menu:

<br></br>

- Submitting final score:

