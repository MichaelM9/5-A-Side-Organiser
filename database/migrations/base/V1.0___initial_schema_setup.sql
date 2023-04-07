CREATE TABLE app_user (
id serial PRIMARY KEY,
name varchar NOT NULL,
email varchar NOT NULL,
password varchar NOT NULL
);

CREATE TABLE player_role (
id serial PRIMARY KEY,
type varchar NOT NULL
);

CREATE TABLE player_group (
id serial PRIMARY KEY,
name varchar NOT NULL
);

CREATE TABLE user_group_role (
id serial PRIMARY KEY,
user_id integer NOT NULL,
group_id integer NOT NULL,
role_id integer NOT NULL,
CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES app_user(id),
CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES player_group(id),
CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES player_role(id)
);

CREATE TABLE game (
id serial PRIMARY KEY,
game_date date NOT NULL,
game_time time NOT NULL,
location varchar NOT NULL
);

CREATE TABLE game_user_group_role (
id serial PRIMARY KEY,
game_id integer NOT NULL,
user_group_role_id integer NOT NULL,
CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES game(id),
CONSTRAINT fk_user_group_role FOREIGN KEY (user_group_role_id) REFERENCES user_group_role(id)
);