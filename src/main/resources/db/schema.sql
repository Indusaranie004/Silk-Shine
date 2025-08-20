-- Database: silk_shine_db
CREATE DATABASE IF NOT EXISTS silk_shine_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE silk_shine_db;

-- Table: users (for clients, staff, admin)
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role ENUM('CLIENT', 'STAFF', 'ADMIN') NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: staff
CREATE TABLE staff (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       full_name VARCHAR(100) NOT NULL,
                       position VARCHAR(50) NOT NULL,
                       phone VARCHAR(15),
                       hire_date DATE,
                       salary DECIMAL(10, 2),
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: services
CREATE TABLE services (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description TEXT,
                          duration INT NOT NULL, -- in minutes
                          price DECIMAL(8, 2) NOT NULL
);

-- Table: appointments
CREATE TABLE appointments (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              client_id BIGINT NOT NULL,
                              staff_id BIGINT NOT NULL,
                              service_id BIGINT NOT NULL,
                              appointment_date DATETIME NOT NULL,
                              status ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (client_id) REFERENCES users(id),
                              FOREIGN KEY (staff_id) REFERENCES staff(id),
                              FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Table: payments (optional)
CREATE TABLE payments (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          appointment_id BIGINT NOT NULL,
                          amount DECIMAL(10, 2) NOT NULL,
                          payment_method ENUM('CASH', 'CARD', 'ONLINE') NOT NULL,
                          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);