DO $$

DECLARE USER_ID integer;
DECLARE ROLE_ID integer;
DECLARE GROUP_ID integer;
DECLARE USER_GROUP_ROLE_ID integer;
DECLARE GAME_ID integer;

BEGIN
	
	INSERT INTO app_user ("name", email, password) VALUES ('Michael Mackin', 'michaelmackin@email.com', 'password1') RETURNING id INTO USER_ID;
	INSERT INTO user_role (description) VALUES ('admin') RETURNING id INTO ROLE_ID;
	INSERT INTO user_group ("name") VALUES ('Unosquare Football Group') RETURNING id INTO GROUP_ID;
	INSERT INTO user_group_role (user_id, group_id, role_id) VALUES (USER_ID, GROUP_ID, ROLE_ID) RETURNING id INTO USER_GROUP_ROLE_ID;
	INSERT INTO game (group_id, game_date, game_time, game_location) VALUES (GROUP_ID, CURRENT_DATE, CURRENT_TIME, 'Colin Glen') RETURNING id INTO GAME_ID;
	INSERT INTO game_user_group_role  (game_id, user_group_role_id) VALUES (GAME_ID, USER_GROUP_ROLE_ID);

END $$