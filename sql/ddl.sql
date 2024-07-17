CREATE TABLE Members (
	member_ID SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
	gender TEXT NOT NULL,
	phone_number VARCHAR(20),
	address VARCHAR(100),
	medical_history TEXT,
	emergency_contact_ID INT,
	authentication_ID INT
);

CREATE TABLE Trainers (
	trainer_ID SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	employee_ID INT NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
	gender TEXT NOT NULL,
	phone_number VARCHAR(20),
	address VARCHAR(100),
	medical_history TEXT,
	emergency_contact_ID INT,
	authentication_ID INT
);

CREATE TABLE Administrators (
	admin_ID SERIAL PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	employee_ID INT NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	date_of_birth DATE NOT NULL,
	gender TEXT NOT NULL,
	phone_number VARCHAR(20),
	address VARCHAR(100),
	medical_history TEXT,
	emergency_contact_ID INT,
	authentication_ID INT
);

CREATE TABLE Authentication (
	authentication_ID SERIAL PRIMARY KEY,
	username VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	member_ID INT,
	trainer_ID INT,
	admin_ID INT,
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID),
	FOREIGN KEY (trainer_ID) REFERENCES Trainers(trainer_ID),
	FOREIGN KEY (admin_ID) REFERENCES Administrators(admin_ID)
);

CREATE TABLE Emergency_Contacts (
	emergency_contact_ID SERIAL PRIMARY KEY,
	full_name VARCHAR(200) NOT NULL,
	relationship TEXT NOT NULL,
	phone_number VARCHAR(20) NOT NULL,
	member_ID INT,
	trainer_ID INT,
	admin_ID INT,
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID),
	FOREIGN KEY (trainer_ID) REFERENCES Trainers(trainer_ID),
	FOREIGN KEY (admin_ID) REFERENCES Administrators(admin_ID)
);

CREATE TABLE Payments (
	payment_ID SERIAL PRIMARY KEY,
	member_ID INT NOT NULL,
	type TEXT NOT NULL,
	status TEXT NOT NULL,
	amount INT NOT NULL,
	paid_on DATE,
	deadline DATE NOT NULL,
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID)
);

CREATE TABLE Goals (
	goal_ID SERIAL PRIMARY KEY,
	member_ID INT NOT NULL,
	target_weight FLOAT NOT NULL,
	target_date DATE NOT NULL,
	description TEXT,
	completed VARCHAR(5) NOT NULL,
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID)
);

CREATE TABLE Weight (
	weight_ID SERIAL PRIMARY KEY,
	weight FLOAT NOT NULL,
	date DATE NOT NULL,
	member_ID INT,
	trainer_ID INT,
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID),
	FOREIGN KEY (trainer_ID) REFERENCES Trainers(trainer_ID)
);

CREATE TABLE Availability (
	availability_ID SERIAL PRIMARY KEY,
	trainer_ID INT NOT NULL,
	date DATE NOT NULL,
	time TIME NOT NULL,
	duration INT NOT NULL,
	purpose TEXT,
	FOREIGN KEY (trainer_ID) REFERENCES Trainers(trainer_ID)
);

CREATE TABLE Equipment (
	equipment_ID SERIAL PRIMARY KEY,
	equipment TEXT NOT NULL,
	status TEXT NOT NULL
);

CREATE TABLE Rooms (
	room_ID SERIAL PRIMARY KEY,
	room TEXT NOT NULL,
	status TEXT NOT NULL
);

CREATE TABLE Bookings (
	booking_ID SERIAL PRIMARY KEY,
	trainer_name VARCHAR(200) NOT NULL,
	room TEXT NOT NULL,
	date_of_creation DATE NOT NULL,
	room_ID INT,
	member_ID INT,
	trainer_ID INT,
	session_by_availability_ID INT,
	FOREIGN KEY (room_ID) REFERENCES Rooms(room_ID),
	FOREIGN KEY (member_ID) REFERENCES Members(member_ID),
	FOREIGN KEY (trainer_ID) REFERENCES Trainers(trainer_ID),
	FOREIGN KEY (session_by_availability_ID) REFERENCES Availability(availability_ID)
);