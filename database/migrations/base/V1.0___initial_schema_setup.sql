CREATE TABLE app_user (
id serial PRIMARY KEY,
name varchar NOT NULL,
email varchar NOT NULL,
password varchar NOT NULL
);

CREATE TABLE user_role (
id serial PRIMARY KEY,
description varchar NOT NULL
);

CREATE TABLE user_group (
id serial PRIMARY KEY,
name varchar NOT NULL
);

CREATE TABLE user_group_role (
id serial PRIMARY KEY,
user_id integer NOT NULL,
group_id integer NOT NULL,
role_id integer NOT NULL,
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user(id),
CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES user_group(id),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES user_role(id)
);

CREATE TABLE game (
id serial PRIMARY KEY,
group_id integer NOT NULL,
game_date date NOT NULL,
game_time time NOT NULL,
game_location varchar NOT NULL,
CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES user_group(id)
);

CREATE TABLE game_user_group_role (
id serial PRIMARY KEY,
game_id integer NOT NULL,
user_group_role_id integer NOT NULL,
CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game(id),
CONSTRAINT fk_user_group_role FOREIGN KEY (user_group_role_id) REFERENCES user_group_role(id)
);