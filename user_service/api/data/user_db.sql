/* Création de la table roles */
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

/* Création de la table users */
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);


/* Insertion dans la table roles */
INSERT INTO roles (name, description) VALUES
('admin', 'Administrateur avec accès complet au système'),
('client', 'Utilisateur qui passe des commandes'),
('livreur', 'Utilisateur responsable de la livraison des commandes');

/* Insertion dans la table users */
INSERT INTO users (email, password, role_id, created_at, updated_at) VALUES
('admin@example.com', '$2y$10$hashedpassword1', 1, NOW(), NOW()),
('client@example.com', '$2y$10$hashedpassword2', 2, NOW(), NOW()),
('livreur@example.com', '$2y$10$hashedpassword3', 3, NOW(), NOW());

