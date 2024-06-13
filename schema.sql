CREATE DATABASE students;
USE students;

CREATE TABLE users(
  id integer PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL
);

CREATE TABLE studentInfo(
--رقم المسلسل
studentno integer 
);
CREATE TABLE studentInfoDetails(

);
INSERT INTO users (email, password) VALUES ('example@example.com', 'password123');
