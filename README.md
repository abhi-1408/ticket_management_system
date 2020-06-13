# ticket_management_system

A ticket management system app to manage the tickets created by users

---

## description: Basic POS application for small scale Business

## Features

- [x] dummy data
- [x] user/admin functionality
- [x] add comments/reply
- [x] create new ticket
- [x] pagination
- [ ] sorting,filtering
- [ ] register page
- [ ] seperation of redux

### FRONTEND:

REACT APP
you need to setup env before running:

cd frontend

npm install react-router-dom
npm install react-redux
npm install bootstrap
npm install jquery
npm install popper.js
npm install redux-thunk

npm start

### BACKEND:

create your database:

- mysql -u root -p 'password'
- > CREATE DATABASE TICKET_DB; >use TICKET_DB; >CREATE TABLE user(user_id int NOT NULL AUTO_INCREMENT,name varchar(255),isAdmin int,phone int,email varchar(50),password varchar(30),PRIMARY KEY(user_id));
- > CREATE TABLE ticket(ticket_id int NOT NULL AUTO_INCREMENT,resolved int,priority varchar(10),user_id int,creation_time datetime,subject varchar(255),PRIMARY KEY(ticket_id),FOREIGN KEY (user_id) REFERENCES user(user_id));
- > CREATE TABLE data(id int NOT NULL AUTO_INCREMENT,ticket_id int,comment_date datetime,commentby int,description varchar(255),PRIMARY KEY(id),FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id),FOREIGN KEY (commentby) REFERENCES user(user_id));

- start your local server:
  clone the repo
- ACTIVATE THE VIRTUAL ENV:
  run in terminal:
  source ticket_env/bin/activate

then
run in terminal :
export FLASK_ENV=dev
export FLASK_APP=server.py
flask run
