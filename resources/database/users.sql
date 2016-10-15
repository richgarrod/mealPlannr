CREATE TABLE users (
   id serial PRIMARY KEY NOT NULL,
   name           TEXT    NOT NULL,
   hash       CHAR(200),
   admin bool
)