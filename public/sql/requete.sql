CREATE DATABASE pwedza_festival;

USE pwedza_festival;

-- Table pour les artisans
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    speciality VARCHAR(100)
);

-- Table pour les produits
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2),
    artisan_id INT,
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
);

-- 1. Créer une base de données pour la fête de Pwedza
CREATE DATABASE IF NOT EXISTS pwedza_festival;
USE pwedza_festival;

-- 2. Créer une table pour les artisans
CREATE TABLE artisans (
    artisan_id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    contact VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    adresse VARCHAR(255),
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Créer une table pour les produits
CREATE TABLE produits (
    produit_id INT AUTO_INCREMENT PRIMARY KEY,
    nom_produit VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    artisan_id INT,
    FOREIGN KEY (artisan_id) REFERENCES artisans(artisan_id) ON DELETE CASCADE
);

-- 4. Insérer des données exemple pour les artisans
INSERT INTO artisans (nom, contact, email, adresse)
VALUES 
    ('Jean Dupont', '123456789', 'jean.dupont@example.com', 'Rue Principale, Ville A'),
    ('Marie Curie', '987654321', 'marie.curie@example.com', 'Avenue des Champs, Ville B');

-- 5. Insérer des données exemple pour les produits
INSERT INTO produits (nom_produit, description, prix, artisan_id)
VALUES 
    ('Panier en osier', 'Un panier fait main en osier.', 25.50, 1),
    ('Bijoux en perles', 'Collier et bracelet faits en perles.', 15.00, 2);

-- 6. Afficher la liste des artisans participants
SELECT * FROM artisans;

-- 7. Afficher les produits proposés par chaque artisan
SELECT 
    a.nom AS Nom_Artisan,
    p.nom_produit AS Produit,
    p.description AS Description,
    p.prix AS Prix
FROM artisans a
LEFT JOIN produits p ON a.artisan_id = p.artisan_id
ORDER BY a.nom;









CREATE DATABASE IF NOT EXISTS artisans_db;

USE artisans_db;

-- Table pour les artisans
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    specialite VARCHAR(50) NOT NULL
);

-- Table pour les produits
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artisan_id INT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (artisan_id) REFERENCES artisans(id)
);

INSERT INTO artisans (nom, prenom, specialite)
VALUES 
    ('Ail', 'Amina', 'Céramique'),
    ('Marie', 'Kamal', 'Bijouterie'),
    ('Assane', 'Abou', 'Bijouterie');

INSERT INTO produits (artisan_id, nom, prix)
VALUES 
    (1, 'Vase en céramique', 30.00),
    (1, 'Plat décoratif peint à la main', 25.00),
    (2, 'Collier en perles naturelles', 40.00),
    (2, 'Bracelet en argent', 50.00),
    (3, 'Collier en perles naturelles', 40.00),
    (3, 'Bracelet en argent', 50.00);
