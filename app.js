 // Ici, j'importation  touts les modules nécessaires
const express = require("express");         // j'import du Framework ExpressJS
const url = require("url");                // Module URL pour manipuler les URL
const fs = require("fs");                 // Module FS pour gérer les fichiers
const mysql2 = require("mysql2");        // Module pour se connecter à une base de données MySQL
const myConnection = require("express-myconnection");  // Middleware pour gérer les connexions MySQL dans Express

// Ici,c'est la Configuration des options de connexion à la base de données
const optionConnection = {
    host: "localhost",           // Adresse du serveur MySQL
    user: "root",               // Nom d'utilisateur pour la connexion
    password: "Saindoumy15@e", // Mot de passe pour la connexion
    port: 3306,               // Port MySQL par défaut
    database: "artisans",    // Nom de la base de données
};

// Création de l'application Express
const app = express();

 // Middleware pour gérer la connexion à la base de données
// Ici, je utilise une stratégie de pool pour optimiser les performances
app.use(myConnection(mysql2, optionConnection, "pool"));

// Middleware pour analyser les données envoyées dans le corps des requêtes (format URL-encoded)
app.use(express.urlencoded({ extended: false }));

// Je définir le dossier contenant les vues
app.set("views", "./views");

// Je définir le moteur de template comme étant EJS
app.set("view engine", "ejs");
// Servir les fichiers statiques (CSS, JS, images, etc.)
app.use(express.static('public'));

// Ici, je créer une route en utilisant la méthode get
app.get('/artisans', (req, res) => {

  // la connexion à la base de donneés
  req.getConnection((erreur, connection) => {
    if(erreur) {
// Ici, la console va gère les erreur de la connexion à la base de données.
console.log("Erreur de connexion à la base de données:", erreur);
    } else {
      // la requête SQL pour récuperer tous les artisans
      connection.query("SELECT * FROM artisans", [], (err, resultat) => {
        if (err) {
          // il va gère les erreurs lors de l'exécution de la requête SQL
          console.log("Erreur lors de l'exécution de la requête :", err)
        } else {
          // Affiche les résultats dans la console
          console.log("résultat:", resultat);
          // Rend la vue "artisans.ejs" et passe les données des artisans
          res.render("artisans", { resultat});
        }
      })
    }
  })
  // Exemple de données d'artisans
  const artisans = [
      { nom: 'Ail',  prenom: 'Amina',  email: 'amina@example.com', telephone: '0639567890', specialite: 'Céramique' },
      { nom: 'Kamal',  prenom: 'Marie',  email: 'marie@example.com', telephone: '0639000000', specialite: 'Bijouterie' },
      {nom: 'Assane', prenom: 'Abou', email: 'abou@example.com', telephone: '0639654321', specialite: 'Bijouterie'}
  ];

  // Rendre la vue 'artisans.ejs' et transmettre les artisans
  res.render('artisans', { artisans });
});

// Page d'accueil
app.get("/accueil", (req, res) => {
  res.render("accueil");
});
// je veux créer une route "artisans"
app.post('/artisans', (req, res) => {
  // Récupération des données du formulaire
  const { nom, email, telephone, specialite } = req.body;

  // Ajout dans la base de données ou tableau (exemple statique ici)
  // Normalement, ici j'insérer les données dans une base MySQL
  console.log(`Artisan ajouté : ${nom}, ${email}, ${telephone}, ${specialite}`);

  
    req.getConnection((err, connection) => {
        if (err) {
          // Ici, 
          console.log("Erreur de connexion à la base données :", erreur);
        } else {
          // requête SQL pour réupérer tous les listes
          connection.query("SELECT * FROM artisans", [], (err, resultat) => {
            if (err) {
              console.log("Erreur lors de l'exécution de la requête :", err);
            } else {
              console.log("artisans :", artisans);
              // Rendre la vue artisans.ejs avec les données
            res.render("artisans", { artisans: results });
            }
          });
        } 
            
        });
    });

// Lancer le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000"); // Message pour confirmer que le serveur est démarré
});

// Définir une route GET pour "/liste"
app.get('/liste', (req, res) => {
// Déclaration d'un tableau contenant les données des artisans
const artisans = [
    {
        nom: "Ail", // Nom de l'artisan
        prenom: "Amina", // Prénom de l'artisan
        specialite: "Céramique", // Spécialité de l'artisan
        produits: [ // Liste des produits de l'artisan
            { nom: "Vase en céramique", prix: 30 }, // Un produit avec son nom et son prix
            { nom: "Plat décoratif peint à la main", prix: 25 } // Un autre produit
        ]
    },
    {
        nom: "Marie ", // Nom de l'artisan
        prenom: "Kamal", // Prénom de l'artisan
        specialite: "Bijouterie", // Spécialité de l'artisan
        produits: [ // Liste des produits
            { nom: "Collier en perles naturelles", prix: 40 }, // Produit 1
            { nom: "Bracelet en argent", prix: 50 } // Produit 2
        ]
    },
    {
      nom: "Assane", // Nom de l'artisan
      prenom: "Abou", // Prénom de l'artisan
      specialite: "Bijouterie", // Spécialité de l'artisan
      produits: [ // Liste des produits
          { nom: "Collier en perles naturelles", prix: 40 }, // Produit 1
          { nom: "Bracelet en argent", prix: 50 } // Produit 2
      ]
  },
];

// Rendre la vue 'artisans.ejs' en passant les données des artisans
res.render('artisans', { artisans }); // 'artisans' correspond au fichier artisans.ejs
});

// une route de page de contact
app.get("/contacte", (req, res) => {
  res.render("contacte");
});
