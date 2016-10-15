CREATE TABLE user_details(
   id serial PRIMARY KEY NOT NULL,
   user_id int NOT NULL,
   address TEXT,
   country TEXT,
   email TEXT
)