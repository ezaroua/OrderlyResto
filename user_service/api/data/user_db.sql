/* Création de la table roles */

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
);


/* Création de la table users */

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,  -- Prénom de l'utilisateur
    last_name VARCHAR(50) NOT NULL,   -- Nom de l'utilisateur
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);


/* Création de la table addresses */


CREATE TABLE addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



/* insertion dans la table roles */

INSERT INTO roles (name, description) VALUES
('admin', 'Administrateur avec accès complet au système'),
('client', 'Utilisateur qui passe des commandes'),
('livreur', 'Utilisateur responsable de la livraison des commandes');

/* insertion dans la table users */


INSERT INTO users (first_name, last_name, username, email, password, phone, role_id, created_at, updated_at) VALUES
('Admin', 'User', 'admin_user', 'admin@example.com', '$2y$10$hashedpassword1', '1234567890', 1, NOW(), NOW()),  -- Role admin
('Client', 'User', 'client_user', 'client@example.com', '$2y$10$hashedpassword2', '0987654321', 2, NOW(), NOW()), -- Role client
('Livreur', 'User', 'livreur_user', 'livreur@example.com', '$2y$10$hashedpassword3', '1122334455', 3, NOW(), NOW()); -- Role livreur


/* insertion dans la table addresses */

INSERT INTO addresses (user_id, address_line1, address_line2, city, state, postal_code, country, is_primary, created_at, updated_at) VALUES
(2, '123 Main Street', 'Apt 4B', 'Paris', 'Île-de-France', '75001', 'France', TRUE, NOW(), NOW()),  -- Adresse principale pour le client
(3, '456 Delivery Lane', NULL, 'Lyon', 'Auvergne-Rhône-Alpes', '69001', 'France', TRUE, NOW(), NOW());  -- Adresse principale pour le livreur
