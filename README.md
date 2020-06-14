# ticket_management_system

## A ticket management system app to manage the tickets created by users

---

## Features

- [x] db schema and db configured
- [x] user/admin functionality
- [x] add comments/reply
- [x] create new ticket
- [x] close/open a existing ticket
- [x] pagination
- [x] register page
- [x] visualization
- [x] add company functionality
- [x] categorize according to it
- [x] user details add to ticket thread
- [x] sorting,
- [ ] filtering
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
- > CREATE DATABASE TICKET_DB;
- > use TICKET_DB;
- > CREATE TABLE user(user_id int NOT NULL AUTO_INCREMENT,name varchar(255),isAdmin int,phone int,email varchar(50),password varchar(30),PRIMARY KEY(user_id));
- > CREATE TABLE company(company_id int NOT NULL AUTO_INCREMENT,name varchar(255),PRIMARY KEY (company_id));
- > CREATE TABLE ticket(ticket_id int NOT NULL AUTO_INCREMENT,resolved int,priority varchar(10),user_id int,company_id int,creation_time datetime,subject varchar(255),PRIMARY KEY(ticket_id),FOREIGN KEY (user_id) REFERENCES user(user_id),FOREIGN KEY (company_id) REFERENCES company(company_id));
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

## login and password:

### for admin :

- username: test@gmail.com password: 1234

### for client :

- username : user@gmail.com password: 1111
