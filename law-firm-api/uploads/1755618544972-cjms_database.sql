CREATE DATABASE cjms_db;
USE cjms_db;

CREATE TABLE pdls_info_tbl(
	offender_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(40), m_name VARCHAR(40), l_name VARCHAR(40), inamates_classification VARCHAR(40),
    age VARCHAR(40), gender VARCHAR(20), blood_type VARCHAR(20), idno VARCHAR(40), status_of_cases VARCHAR(40),
    affliation VARCHAR(40), complexion VARCHAR(40), built VARCHAR(40), marks_and_amputation VARCHAR(99),
    height VARCHAR(40), weight VARCHAR(40), hair VARCHAR(40), eyes VARCHAR(40), civil_status VARCHAR(40),
    religion VARCHAR(40), nationality VARCHAR(40), highest_educ_attainment VARCHAR(40), occupation VARCHAR(40),
    remarks VARCHAR(40), arresting_officer VARCHAR(40), arresting_unit VARCHAR(40), records_officer VARCHAR(40)
    
);

CREATE TABLE pdls_pic_tbl (
	offender_pic_id INT AUTO_INCREMENT PRIMARY KEY,
	offender_pic LONGBLOB 
);

CREATE TABLE address_tbl(
	address_id INT AUTO_INCREMENT PRIMARY KEY,
    brgy VARCHAR(40), municipal VARCHAR(40), city VARCHAR(40)
);

CREATE TABLE cell_and_block_tbl (
	cell_no_id INT AUTO_INCREMENT PRIMARY KEY,
    cell_name_or_number VARCHAR(40)
);

CREATE TABLE date_arrested_tbl (
	date_arrested_id INT AUTO_INCREMENT PRIMARY KEY,
    arr_month VARCHAR(40), arr_day VARCHAR(40), arr_year VARCHAR(40)
);

CREATE TABLE commited_tbl (
	commited_id INT AUTO_INCREMENT PRIMARY KEY,
	com_month VARCHAR(40), com_day VARCHAR(40), com_year VARCHAR(40), com_time VARCHAR(40)
);

CREATE TABLE offenses_tbl (
	offenses_id INT AUTO_INCREMENT PRIMARY KEY,
	offenses VARCHAR(50)
);

CREATE TABLE bail_rec_tbl (
	bail_recommended_id INT AUTO_INCREMENT PRIMARY KEY,
	bail_recommended VARCHAR(50)
);

CREATE TABLE criminal_case_tbl (
	criminal_case_no_id INT AUTO_INCREMENT PRIMARY KEY,
	criminal_case_no VARCHAR(40)
);

CREATE TABLE court_branch_tbl (
	court_branch_id INT AUTO_INCREMENT PRIMARY KEY,
	court_branch VARCHAR(60)
);

CREATE TABLE court_jurisdiction_tbl (
	court_jurisdiction_id INT AUTO_INCREMENT PRIMARY KEY,
	court_jurisdiction VARCHAR(60)
);

CREATE TABLE date_of_birth_tbl (
	date_of_birth_id INT AUTO_INCREMENT PRIMARY KEY,
	dob_month VARCHAR(40), dob_day VARCHAR(40), dob_year VARCHAR(40)
);

CREATE TABLE place_of_birth_tbl (
	place_of_birth_id INT AUTO_INCREMENT PRIMARY KEY,
	pob_brgy VARCHAR(40), pob_municipal VARCHAR(40), pob_city VARCHAR(40)
);

CREATE TABLE contact_tbl (
	contact_no_id INT AUTO_INCREMENT PRIMARY KEY,
	contact_no VARCHAR(40)
);

CREATE TABLE emergency_contact_tbl (
	emergency_contact_id INT AUTO_INCREMENT PRIMARY KEY,
	emergency_contact VARCHAR(40)
);

CREATE TABLE blood_related_data_tbl (
	blood_related_data_id INT AUTO_INCREMENT PRIMARY KEY,
	br_fname VARCHAR(40), br_lname VARCHAR(40), br_mname VARCHAR(40), br_relationship VARCHAR(40)
);

CREATE TABLE blood_related_sign_tbl (
	blood_related_signature_id INT AUTO_INCREMENT PRIMARY KEY,
	blood_related_sign LONGBLOB
);

CREATE TABLE blood_related_add_tbl (
	blood_related_address_id INT AUTO_INCREMENT PRIMARY KEY,
	br_brgy VARCHAR(40), br_municipal VARCHAR(40), br_city VARCHAR(40)
);

CREATE TABLE finger_print_tbl (
	finger_print_id INT AUTO_INCREMENT PRIMARY KEY,
	left_thumb LONGBLOB, right_thumb LONGBLOB
);

CREATE TABLE offender_sign_tbl (
	offender_signature_id INT AUTO_INCREMENT PRIMARY KEY,
	offender_signature LONGBLOB
);

CREATE TABLE visitation_tbl (
	visitation_id INT AUTO_INCREMENT PRIMARY KEY,
	visitors_fname VARCHAR(40), visitors_mname VARCHAR(40), visitors_lname VARCHAR(40),
	date_of_visit VARCHAR(40), time_of_visit VARCHAR(40)
);

CREATE TABLE prog_serv_tbl( 
	prog_serv_id INT AUTO_INCREMENT PRIMARY KEY,
	program_and_services VARCHAR(40)
);

CREATE TABLE admin_tbl (
	admin_id INT AUTO_INCREMENT PRIMARY KEY,
	gmail VARCHAR(40), admin_password VARCHAR(40), otp VARCHAR(40),
	admin_fname VARCHAR(40), admin_lname VARCHAR(40), admin_mname VARCHAR(40),
	position VARCHAR(40), admin_description VARCHAR(40)
);

CREATE TABLE admin_pic_tbl (
	admin_picture_id INT AUTO_INCREMENT PRIMARY KEY,
	admin_picture LONGBLOB
);

CREATE TABLE admin_contact_tbl (
	admin_contact_id INT AUTO_INCREMENT PRIMARY KEY,
	admin_contact VARCHAR(40)
);

CREATE TABLE admin_birthdate_tbl (
	admin_birthdate_id INT AUTO_INCREMENT PRIMARY KEY,
	ad_month VARCHAR(20), ad_day VARCHAR(20), ad_year VARCHAR(20)
);

CREATE TABLE admin_address_tbl (
	admin_address_id INT AUTO_INCREMENT PRIMARY KEY,
	admin_address VARCHAR(40)
);

CREATE TABLE supAdmin_tbl (
	supAdmin_id INT AUTO_INCREMENT PRIMARY KEY,
	supAdmin_gmail VARCHAR(40), supAdmin_password VARCHAR(40), supAdmin_otp VARCHAR(40),
	supAdmin_fname VARCHAR(40), supAdmin_lname VARCHAR(40), supAdmin_mname VARCHAR(40),
	supAdmin_description VARCHAR(40)
);

CREATE TABLE supAdmin_pic_tbl (
	supAdmin_picture_id INT AUTO_INCREMENT PRIMARY KEY,
	supAdmin_picture LONGBLOB
);

CREATE TABLE supAdmin_contact_tbl (
	supAdmin_contact_id INT AUTO_INCREMENT PRIMARY KEY,
	supAdmin_contact VARCHAR(40)
);

CREATE TABLE supAdmin_birthdate_tbl (
	supAdmin_birthday_admin INT AUTO_INCREMENT PRIMARY KEY,
	sup_month VARCHAR(40), sup_day VARCHAR(40), sup_year VARCHAR(40)
);

CREATE TABLE supAdmin_address_tbl (
	supAdmin_address_id INT AUTO_INCREMENT PRIMARY KEY,
	supadmin_address VARCHAR(40)
);

/* CONNECTION OF EVERY TABLE*/

ALTER TABLE pdls_info_tbl
ADD COLUMN  offender_pic_id INT,
ADD FOREIGN KEY (offender_pic_id) REFERENCES pdls_pic_tbl(offender_pic_id);

ALTER TABLE pdls_pic_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  address_id INT,
ADD FOREIGN KEY (address_id) REFERENCES address_tbl(address_id);

ALTER TABLE address_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  cell_no_id INT,
ADD FOREIGN KEY (cell_no_id) REFERENCES cell_and_block_tbl(cell_no_id);

ALTER TABLE cell_and_block_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  date_arrested_id INT,
ADD FOREIGN KEY (date_arrested_id) REFERENCES date_arrested_tbl(date_arrested_id);

ALTER TABLE date_arrested_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  commited_id INT,
ADD FOREIGN KEY (commited_id) REFERENCES commited_tbl(commited_id);

ALTER TABLE commited_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  offenses_id INT,
ADD FOREIGN KEY (offenses_id) REFERENCES offenses_tbl(offenses_id);

ALTER TABLE offenses_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  bail_recommended_id INT,
ADD FOREIGN KEY (bail_recommended_id) REFERENCES bail_rec_tbl(bail_recommended_id);

ALTER TABLE bail_rec_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  criminal_case_no_id INT,
ADD FOREIGN KEY (criminal_case_no_id) REFERENCES criminal_case_tbl(criminal_case_no_id);

ALTER TABLE criminal_case_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  court_branch_id INT,
ADD FOREIGN KEY (court_branch_id) REFERENCES court_branch_tbl(court_branch_id);

ALTER TABLE court_branch_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  court_jurisdiction_id INT,
ADD FOREIGN KEY (court_jurisdiction_id) REFERENCES court_jurisdiction_tbl(court_jurisdiction_id);

ALTER TABLE court_jurisdiction_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  date_of_birth_id INT,
ADD FOREIGN KEY (date_of_birth_id) REFERENCES date_of_birth_tbl(date_of_birth_id);

ALTER TABLE date_of_birth_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  contact_no_id INT,
ADD FOREIGN KEY (contact_no_id) REFERENCES contact_tbl(contact_no_id);

ALTER TABLE contact_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  emergency_contact_id INT,
ADD FOREIGN KEY (emergency_contact_id) REFERENCES emergency_contact_tbl(emergency_contact_id);

ALTER TABLE emergency_contact_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


/* BLOOD RELATED CONNECTION*/

ALTER TABLE blood_related_data_tbl 
ADD COLUMN blood_related_signature_id INT, 
ADD FOREIGN KEY (blood_related_signature_id) REFERENCES blood_related_sign_tbl(blood_related_signature_id);

ALTER TABLE blood_related_sign_tbl 
ADD COLUMN blood_related_data_id INT, 
ADD FOREIGN KEY (blood_related_data_id) REFERENCES blood_related_data_tbl(blood_related_data_id);


ALTER TABLE blood_related_data_tbl 
ADD COLUMN blood_related_address_id INT, 
ADD FOREIGN KEY (blood_related_address_id) REFERENCES blood_related_add_tbl(blood_related_address_id);

ALTER TABLE blood_related_add_tbl
ADD COLUMN blood_related_data_id INT,
ADD FOREIGN KEY (blood_related_data_id) REFERENCES blood_related_data_tbl(blood_related_data_id);




/* BLOOD RELATED CONNECTION ENDING*/

ALTER TABLE pdls_info_tbl
ADD COLUMN  blood_related_data_id INT,
ADD FOREIGN KEY (blood_related_data_id) REFERENCES blood_related_data_tbl(blood_related_data_id);

ALTER TABLE blood_related_data_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  finger_print_id INT,
ADD FOREIGN KEY (finger_print_id) REFERENCES finger_print_tbl(finger_print_id);

ALTER TABLE finger_print_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  offender_signature_id INT,
ADD FOREIGN KEY (offender_signature_id) REFERENCES offender_sign_tbl(offender_signature_id);

ALTER TABLE offender_sign_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  visitation_id INT,
ADD FOREIGN KEY (visitation_id) REFERENCES visitation_tbl(visitation_id);

ALTER TABLE visitation_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


ALTER TABLE pdls_info_tbl
ADD COLUMN  prog_serv_id INT,
ADD FOREIGN KEY (prog_serv_id) REFERENCES prog_serv_tbl(prog_serv_id);

ALTER TABLE prog_serv_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);


/*  ADMIN TABLE CONNECTION */

ALTER TABLE admin_tbl
ADD COLUMN  admin_picture_id INT,
ADD FOREIGN KEY (admin_picture_id) REFERENCES admin_pic_tbl(admin_picture_id);

ALTER TABLE admin_pic_tbl
ADD COLUMN  admin_id INT,
ADD FOREIGN KEY (admin_id) REFERENCES admin_tbl(admin_id);


ALTER TABLE admin_tbl
ADD COLUMN  admin_contact_id INT,
ADD FOREIGN KEY (admin_contact_id) REFERENCES admin_contact_tbl(admin_contact_id);

ALTER TABLE admin_contact_tbl
ADD COLUMN  admin_id INT,
ADD FOREIGN KEY (admin_id) REFERENCES admin_tbl(admin_id);


ALTER TABLE admin_tbl
ADD COLUMN  admin_birthdate_id INT,
ADD FOREIGN KEY (admin_birthdate_id) REFERENCES admin_birthdate_tbl(admin_birthdate_id);

ALTER TABLE admin_birthdate_tbl
ADD COLUMN  admin_id INT,
ADD FOREIGN KEY (admin_id) REFERENCES admin_tbl(admin_id);


ALTER TABLE admin_tbl
ADD COLUMN  admin_address_id INT,
ADD FOREIGN KEY (admin_address_id) REFERENCES admin_address_tbl(admin_address_id);

ALTER TABLE admin_address_tbl
ADD COLUMN  admin_id INT,
ADD FOREIGN KEY (admin_id) REFERENCES admin_tbl(admin_id);

/* ADMIN TALBLE CONNECTION ENDING*/



/* SUPER ADMIN TALBLE CONNECTION*/

ALTER TABLE supAdmin_tbl
ADD COLUMN  supAdmin_picture_id INT,
ADD FOREIGN KEY (supAdmin_picture_id) REFERENCES supAdmin_pic_tbl(supAdmin_picture_id);

ALTER TABLE supAdmin_pic_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);


ALTER TABLE supAdmin_tbl
ADD COLUMN  supAdmin_contact_id INT,
ADD FOREIGN KEY (supAdmin_contact_id) REFERENCES supAdmin_contact_tbl(supAdmin_contact_id);

ALTER TABLE supAdmin_contact_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);


ALTER TABLE supAdmin_tbl
ADD COLUMN  supAdmin_birthday_admin INT,
ADD FOREIGN KEY (supAdmin_birthday_admin) REFERENCES supAdmin_birthdate_tbl(supAdmin_birthday_admin);

ALTER TABLE supAdmin_birthdate_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);


ALTER TABLE supAdmin_tbl
ADD COLUMN  supAdmin_address_id INT,
ADD FOREIGN KEY (supAdmin_address_id) REFERENCES supAdmin_address_tbl(supAdmin_address_id);

ALTER TABLE supAdmin_address_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);

/* SUPER ADMIN TALBLE CONNECTION ENDING*/

ALTER TABLE supAdmin_tbl
ADD COLUMN  admin_id INT,
ADD FOREIGN KEY (admin_id) REFERENCES admin_tbl(admin_id);

ALTER TABLE admin_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);


ALTER TABLE supAdmin_tbl
ADD COLUMN  offender_id INT,
ADD FOREIGN KEY (offender_id) REFERENCES pdls_info_tbl(offender_id);

ALTER TABLE pdls_info_tbl
ADD COLUMN  supAdmin_id INT,
ADD FOREIGN KEY (supAdmin_id) REFERENCES supAdmin_tbl(supAdmin_id);