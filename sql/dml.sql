INSERT INTO Members (first_name, last_name, email, date_of_birth, gender, phone_number, address, medical_history, emergency_contact_ID, authentication_ID)
VALUES ('Alice', 'Angel', 'aliceangel@joeydrewstudios.com', '1929-06-25', 'Female', '(613)-777-1616', '66 Heaven Rd', 'None', 1, 1),
       ('Bendy', 'Demon', 'bendydemon@joeydrewstudios.com', '1929-03-03', 'Male', '(613)-666-6666', '11 Ink St', 'None', 2, 2),
       ('Casey', 'Jones', 'caseyjones@roosevelt.ca', '1986-11-10', 'Male', '(613)-666-9999', '7 Hockey Way', 'None', 3, 3);

INSERT INTO Trainers (first_name, last_name, employee_ID, email, date_of_birth, gender, phone_number, address, medical_history, emergency_contact_ID, authentication_ID)
VALUES ('Willow', 'Park', 7392, 'willowpark@hexside.ca', '1996-01-25', 'Female', '(613)-246-8044', '66 Boiling Ave', 'None', 4, 4),
       ('Cole', 'Reyes', 5187, 'colereyes@sepulveda.ca', '1997-11-03', 'Male', '(613)-016-1221', '26 Rowland Ct', 'None', 5, 5),
       ('Sasha', 'Waybright', 9174, 'sashawaybright@saint-james.ca', '1989-08-18', 'Female', '(613)-999-5555', '3 Wartwood Rd', 'None', 6, 6);

INSERT INTO Administrators (first_name, last_name, employee_ID, email, date_of_birth, gender, phone_number, address, medical_history, emergency_contact_ID, authentication_ID)
VALUES ('Carmen', 'Sandiego', 3658, 'carmensandiego@codered.com', '1984-07-30', 'Female', '(613)-505-1010', '44 Scarlet Cres', 'None', 7, 7);

INSERT INTO Rooms (room, status)
VALUES ('A', 'Available'),
       ('B', 'Available'),
	   ('C', 'Available'),
	   ('D', 'Available'),
	   ('E', 'Available');

INSERT INTO Equipment (equipment, status)
VALUES ('Spin Bike', 'Available'),
	   ('Spin Bike', 'Available'),
	   ('Spin Bike', 'Available'),
	   ('Spin Bike', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Treadmill', 'Available'),
	   ('Rowing Machine', 'Available'),
	   ('Rowing Machine', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Dumbbell', 'Available'),
	   ('Leg Press Machine', 'Available'),
	   ('Leg Press Machine', 'Available'),
	   ('Chest Press Machine', 'Available'),
	   ('Chest Press Machine', 'Available'),
	   ('Shoulder Press Machine', 'Available'),
	   ('Shoulder Press Machine', 'Available'),
	   ('Medicine Ball', 'Available'),
	   ('Medicine Ball', 'Available');

INSERT INTO Authentication (username, password, member_ID, trainer_ID, admin_ID)
VALUES ('aliceangel@joeydrewstudios.com', 'IMALICEANGEL', 1, NULL, NULL),
	   ('bendydemon@joeydrewstudios.com', 'creator=traitor', 2, NULL, NULL),
	   ('caseyjones@roosevelt.ca', '#purpleDrag0nHater', 3, NULL, NULL),
       ('willowpark@hexside.ca', 'emeraldEntrails', NULL, 1, NULL),
       ('colereyes@sepulveda.ca', 'tennis4life', NULL, 2, NULL),
	   ('sashawaybright@saint-james.ca', 'heartstomper<3', NULL, 3, NULL),
	   ('carmensandiego@codered.com', 'whereintheworld', NULL, NULL, 1);

INSERT INTO Emergency_Contacts (full_name, relationship, phone_number, member_ID, trainer_ID, admin_ID)
VALUES ('Alison Angel', 'Sibling', '(613)-777-1626', 1, NULL, NULL),
	   ('Joey Drew', 'Father', '(613)-666-6066', 2, NULL, NULL),
	   ('April O Neil', 'Friend', '(613)-636-9999', 3, NULL, NULL),
       ('Eda Clawthorne', 'Friend', '(613)-246-8045', NULL, 1, NULL),
       ('Dayton Reyes', 'Sibling', '(613)-016-1231', NULL, 2, NULL),
	   ('Anne Boonchuy', 'Friend', '(613)-999-5655', NULL, 3, NULL),
	   ('Julia Argent', 'Friend', '(613)-505-2010', NULL, NULL, 1);

INSERT INTO Payments (member_ID, type, status, amount, paid_on, deadline)
VALUES (1, 'Annual Membership Plan', 'Unpaid', 300, NULL, '2024-02-16'),
	   (3, 'Drop-In Membership Plan', 'Paid', 10, '2024-03-20', '2024-03-21'),
	   (2, 'Monthly Membership Plan', 'Unpaid', 30, NULL, '2024-03-27'),
	   (3, 'Personal Training Session', 'Paid', 50, '2024-03-28', '2024-04-01'),
	   (3, 'Drop-In Membership Plan', 'Paid', 10, '2024-03-29', '2024-04-02'),
	   (2, 'Group Fitness Class', 'Paid', 15, '2024-04-01', '2024-04-04'),
	   (3, 'Drop-In Membership Plan', 'Paid', 10, '2024-04-04', '2024-04-13'),
	   (1, 'Group Fitness Class', 'Unpaid', 15, NULL, '2024-04-14'),
	   (3, 'Personal Training Session', 'Unpaid', 50, NULL, '2024-04-15');

INSERT INTO Goals (member_ID, target_weight, target_date, description)
VALUES (3, 160, '2024-04-01', '100 Push Ups Per Day'),
	   (2, 100, '2024-04-02', '1K Run Each Morning'),
	   (3, 120, '2024-04-29', '100 Sit Ups Per Day'),
	   (1, 80, '2024-05-03', 'Lift Weights');

INSERT INTO Weight (member_ID, trainer_ID, weight, date)
VALUES (1, NULL, 180, '2024-02-27'),
	   (2, NULL, 110, '2024-03-18'),
	   (3, NULL, 100, '2024-01-21'),
	   (NULL, 1, 120, '2024-03-29'),
	   (NULL, 2, 155, '2024-03-19'),
	   (NULL, 3, 130, '2024-03-08'),
	   (2, NULL, 100, '2024-04-01'),
	   (3, NULL, 160, '2024-04-04');

INSERT INTO Availability (trainer_ID, date, time, duration, purpose)
VALUES (1, '2024-04-01', '8:00:00', 2, 'Group Fitness Class'),
	   (1, '2024-04-08', '8:00:00', 2, 'Group Fitness Class'),
	   (1, '2024-04-15', '8:00:00', 2, 'Group Fitness Class'),
	   (2, '2024-04-02', '20:00:00', 1, 'Personal Training Session'),
	   (2, '2024-04-04', '13:00:00', 2, 'Group Fitness Class'),
	   (2, '2024-04-09', '20:00:00', 1, 'Personal Training Session'),
	   (2, '2024-04-11', '13:00:00', 2, 'Group Fitness Class'),
	   (3, '2024-04-06', '10:00:00', 2, 'Personal Training Session'),
	   (3, '2024-04-13', '10:00:00', 2, 'Personal Training Session'),
	   (3, '2024-04-20', '10:00:00', 2, 'Personal Training Session'),
	   (1, '2024-04-03', '15:00:00', 1, 'Personal Training Session'),
	   (1, '2024-04-10', '15:00:00', 1, 'Personal Training Session');

INSERT INTO Bookings (trainer_name, room, date_of_creation, room_ID, member_ID, trainer_ID, session_by_availability_ID)
VALUES ('Willow Park', 'A', '2024-03-30', 1, 2, 1, 1),
	   ('Willow Park', 'B', '2024-03-31', 2, 1, 1, 1),
	   ('Cole Reyes', 'C', '2024-03-30', 3, 3, 2, 4),
	   ('Sasha Waybright', 'D', '2024-04-01', 4, 3, 3, 8);