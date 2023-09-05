DO $$

DECLARE USER_ID integer;
DECLARE ROLE_ID_ADMIN integer;
DECLARE ROLE_ID_ORGANISER integer;
DECLARE ROLE_ID_PLAYER integer;
DECLARE GROUP_ID integer;
DECLARE USER_GROUP_ROLE_ID integer;
DECLARE GAME_ID integer;

BEGIN
	
	INSERT INTO app_user (first_name, last_name, email, password) VALUES
		('Michael', 'Mackin', 'michaelmackin@email.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('John', 'Doe', 'johndoe@email.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Jack', 'Doe', 'jackdoe@email.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Jane', 'Doe', 'janedoe@email.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Xavi', 'Hernandez', 'xavi@barcelona.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Luca', 'Modric', 'lmodric@realmadrid.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Antoine', 'Griezmann', 'agriezmann@athletico.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Jesus', 'Navas', 'jnavas@sevilla.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Pep', 'Guardiola', 'pguardiola@mancity.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Mikel', 'Arteta', 'marteta@arsenal.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Mohamad', 'Salah', 'msalah@liverpool.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Marcus', 'Rashford', 'mrashford@manutd.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Harry', 'Kane', 'hkane@spurs.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G'),
		('Reece', 'James', 'rjames@chelsea.com', '$2b$10$kUy1k9kft.OikBnS95bU/.eLLlyAY.hZbYZB2RkGVWjeEzF4mYQ0G');

	INSERT INTO user_group ("name") VALUES
		('Unosquare Football Group'),
		('La Liga'),
		('Premier League');

	INSERT INTO user_group_role (user_id, group_id, role_id) VALUES
		(1, 1, 1),
		(2, 1, 3),
		(3, 1, 3),
		(4, 1, 3),
		(5, 2, 1),
		(6, 2, 3),
		(7, 2, 3),
		(8, 2, 3),
		(9, 3, 1),
		(10, 3, 2),
		(11, 3, 3),
		(12, 3, 3),
		(13, 3, 3),
		(14, 3, 3);

    INSERT INTO game (group_id, kickoff_date, kickoff_time, venue) VALUES
		(3, CURRENT_DATE, CURRENT_TIME, 'Old Trafford');

	INSERT INTO game_user_group_role  (game_id, user_group_role_id) VALUES
		(1, 9),
		(1, 10),
		(1, 11),
		(1, 12),
		(1, 13),
		(1, 14);

END $$