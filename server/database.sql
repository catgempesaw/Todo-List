CREATE DATABASE todo;

CREATE TABLE task (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

