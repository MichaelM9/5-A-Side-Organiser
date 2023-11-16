DO $$

DECLARE USER_ID integer;
DECLARE ROLE_ID_ADMIN integer;
DECLARE ROLE_ID_ORGANISER integer;
DECLARE ROLE_ID_PLAYER integer;
DECLARE GROUP_ID integer;
DECLARE USER_GROUP_ROLE_ID integer;
DECLARE GAME_ID integer;

BEGIN
	
	-- ?? User password = password1!
	-- Test User password = Password1!
	INSERT INTO app_user (first_name, last_name, email, password) VALUES
		('Michael', 'Mackin', 'michaelmackin@email.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('John', 'Doe', 'johndoe@email.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Jack', 'Doe', 'jackdoe@email.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Jane', 'Doe', 'janedoe@email.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Xavi', 'Hernandez', 'xavi@barcelona.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Luca', 'Modric', 'lmodric@realmadrid.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Antoine', 'Griezmann', 'agriezmann@athletico.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Jesus', 'Navas', 'jnavas@sevilla.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Pep', 'Guardiola', 'pguardiola@mancity.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Mikel', 'Arteta', 'marteta@arsenal.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Mohamad', 'Salah', 'msalah@liverpool.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Marcus', 'Rashford', 'mrashford@manutd.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Harry', 'Kane', 'hkane@spurs.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('Reece', 'James', 'rjames@chelsea.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe'),
		('test', 'user', 'testuser@email.com', '$2b$10$3MFyK8Lsn/UNAfJgugLj/ea7Q71SbGaiYM5RAiuA9yT1JB1HzsrXe');

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