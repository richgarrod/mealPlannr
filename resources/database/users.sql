CREATE TABLE users(
   id serial PRIMARY KEY NOT NULL,
   name           TEXT    NOT NULL,
   password       CHAR(50),
   admin bool
)