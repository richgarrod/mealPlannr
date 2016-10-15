CREATE TABLE drop_ins(
   id serial PRIMARY KEY NOT NULL,
   user_id int NOT NULL,
   date timestamp NOT NULL,
   box int NOT NULL
)