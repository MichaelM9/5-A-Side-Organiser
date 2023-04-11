DO $$

BEGIN

    INSERT INTO user_role (description) VALUES ('admin');
	INSERT INTO user_role (description) VALUES ('organiser');
	INSERT INTO user_role (description) VALUES ('player');

END $$